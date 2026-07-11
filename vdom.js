// STEP 1 — THIS is the object. This is what <App /> gives you.
//
// You write JSX:
//
//   function App() {
//     return (
//       <div id="app">
//         <h1 className="title">JS Playground Of Frontend Master 🚀</h1>
//         <button className="btn" onClick={handleClick}>Click me</button>
//       </div>
//     );
//   }
//
// Babel compiles that to createElement(...) calls, and those calls return
// exactly the plain object below. No markup, no DOM — just data describing
// what the UI should look like. That's the whole idea of a "virtual DOM".
const APP_VDOM = {
  type: "div",
  props: { id: "app" },
  children: [
    {
      type: "h1",
      props: { className: "title" },
      children: ["JS Playground Of Frontend Master 🚀"],
    },
    {
      type: "button",
      props: {
        className: "btn",
        onClick: () => console.log("clicked from vdom button 🔥"),
      },
      children: ["Click me"],
    },
  ],
};

// STEP 2 — A component is a function that returns that object.
// Calling <App /> === calling App(). Nothing has touched the browser yet.
function App() {
  return APP_VDOM;
}

// STEP 3 — The renderer. The only place the real DOM is touched.
// It walks the object tree depth-first and builds real nodes.
function render(vnode) {
  // 3a. Leaf case: strings/numbers become text nodes. Recursion stops here.
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  // 3b. Element case: `type` is the tag name.
  const el = document.createElement(vnode.type);

  // 3c. Props split into two kinds: events and attributes.
  // Keys starting with "on" become listeners; everything else an attribute.
  // This split is why React says `className` and `onClick` — the object maps
  // to DOM properties, not to HTML attribute names.
  for (const [key, value] of Object.entries(vnode.props)) {
    if (key.startsWith("on")) {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "className") {
      el.setAttribute("class", value);
    } else {
      el.setAttribute(key, value);
    }
  }

  // 3d. Recurse into children. Each child is fully built before being attached.
  for (const child of vnode.children) {
    el.appendChild(render(child));
  }

  return el;
}

// STEP 4 — Mount. App() hands over the object, render() turns it into DOM,
// one appendChild puts it on screen. That single append is the only DOM write.
const vdom = App();
console.log("the object we are converting:", vdom);

document.getElementById("root").appendChild(render(vdom));
