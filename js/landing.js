const loader = document.getElementById("loader");
const buttons = document.querySelectorAll("#getStarted, [data-start]");

buttons.forEach((btn) =>
  btn.addEventListener("click", () => {
    loader.classList.add("show");
    document.body.style.overflow = "hidden";
    // ang loading animation = 2.2s, tapos punta sa login/register
    setTimeout(() => (window.location.href = "auth.html"), 2300);
  })
);