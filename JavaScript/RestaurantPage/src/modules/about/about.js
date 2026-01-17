// about.js

import aboutImg from "../../assets/imgs/about-image.jpg";
import "./about.css";

export function renderAbout(parent) {
  parent.style.justifyContent = "center"

  const aboutContainer = document.createElement("section");
  aboutContainer.classList.add("about-container");

  const heroDiv = document.createElement("div");
  heroDiv.classList.add("hero-div");

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("img-div");
  const image = document.createElement("img");
  image.src = aboutImg;
  image.alt = "aboutImg";
  imageDiv.appendChild(image);

  const conceptDiv = document.createElement("div");
  conceptDiv.classList.add("concept-div")
  const conceptH1 = document.createElement("h1");
  conceptH1.textContent = "Concept"
  const conceptP = document.createElement("p");
  conceptP.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit."
  conceptDiv.append(conceptH1, conceptP);

  heroDiv.append(imageDiv, conceptDiv);

  // 

  function createFormElement(name, type) {
  const elementDiv = document.createElement("div");
  elementDiv.classList.add("form-element")
  const elementLabel = document.createElement("label");
  elementLabel.textContent = name;
  elementLabel.setAttribute("for", name.toLowerCase());
  
  let elementInput;
  if (type === "textarea") {
    elementInput = document.createElement("textarea");
    elementInput.rows = 8;
  } else {
    elementInput = document.createElement("input");
    elementInput.type = type;
  }
  
  elementInput.id = name.toLowerCase();
  elementInput.name = name.toLowerCase();
  elementDiv.append(elementLabel, elementInput);
  return elementDiv;
}

  const form =  document.createElement("form");

  const formH2 = document.createElement("h2");
  formH2.textContent = "Contact Us"

  const divNameEmail = document.createElement("div");
  divNameEmail.classList.add("name-email-div");
  const nameElement = createFormElement("Name", "text");
  const emailElement = createFormElement("Email", "email");
  divNameEmail.append(nameElement, emailElement)
  const messageElement = createFormElement("Message", "textarea");
  const submitButton = document.createElement("button");
  submitButton.textContent = "Send";
  submitButton.addEventListener("click", (e) => e.preventDefault())

  form.append(formH2, divNameEmail, messageElement, submitButton);

  //

  aboutContainer.append(heroDiv, form)

  parent.appendChild(aboutContainer);
}