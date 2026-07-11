// STEP 1 — What JSX actually is.
// <h1 className="title">Hello</h1> is not markup. Babel compiles it to a
// function call: createElement("h1", { className: "title" }, "Hello").
// That call returns a plain object. Nothing touches the browser yet.
function createElement(type, props, ...children) {
  return { type, props: props || {}, children: children.flat() };
}

// STEP 2 — A component is just a function returning those objects.
// Calling <App /> === calling App(). The result is the "virtual DOM":
// a tree of {type, props, children} objects describing what the UI SHOULD look like.
function App() {
  return createElement(
    "div",
    { id: "app" },
    createElement("h1", { className: "title" }, "JS Playground Of Frontend Master 🚀"),
    createElement(
      "button",
      {
        className: "btn",
        onClick: () => console.log("clicked from vdom button 🔥"),
      },
      "Click me"
    )
  );
}

// STEP 3 — The renderer. This is the only place the real DOM is touched.
// It walks the vdom tree and produces real DOM nodes, depth-first.
function render(vnode) {
  // 3a. Leaf case: strings/numbers become text nodes. Recursion stops here.
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  // 3b. Element case: create the real element from the `type` field.
  const el = document.createElement(vnode.type);

  // 3c. Props → attributes and event listeners.
  // React's naming convention: keys starting with "on" are events, everything
  // else is an attribute. That's why it's `className`, not `class` — the vdom
  // maps to the DOM property, not the HTML attribute.
  for (const [key, value] of Object.entries(vnode.props)) {
    if (key.startsWith("on")) {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "className") {
      el.setAttribute("class", value);
    } else {
      el.setAttribute(key, value);
    }
  }

  // 3d. Recurse into children, appending each rendered node.
  // A child vnode's DOM node is built fully before it gets attached to its parent.
  for (const child of vnode.children) {
    el.appendChild(render(child));
  }

  return el;
}

// STEP 4 — Mount. App() builds the object tree; render() turns it into DOM;
// appendChild puts it on screen. This single append is the only reflow.
const vdom = App();
console.log("virtual DOM (plain object):", vdom);

document.getElementById("root").appendChild(render(vdom));
