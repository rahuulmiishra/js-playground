let count = 0;

const span = document.getElementById("count");

document.getElementById("add").addEventListener("click", () => {
  count += 10;
  span.textContent = count;
});
