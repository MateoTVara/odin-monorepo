const searchInput = document.querySelector('input[type="text"]');
const projectsDiv = document.querySelector('.projects');

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const childrenDiv = projectsDiv.querySelectorAll(":scope > div")

  for (let i = 0; i < childrenDiv.length; i++){
    const text = childrenDiv[i].querySelector("p").textContent.toLowerCase();

    if (text.includes(term)){
      childrenDiv[i].style.display = "";
    } else {
      childrenDiv[i].style.display = "none";
    }
  }
})