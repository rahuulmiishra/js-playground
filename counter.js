let count = 0;

const root = document.getElementById("root");

// Throws away the whole div and rebuilds it, h1 included, even though only
// the count changed. This is the naive re-render a vdom exists to avoid.
function render() {
  root.innerHTML = `
    <h1>JS Playground</h1>
    <span id="count">${count}</span>
  `;
}

document.getElementById("add").addEventListener("click", () => {
  count += 10;
  render();
});
