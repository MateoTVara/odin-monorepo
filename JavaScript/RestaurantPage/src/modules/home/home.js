// home.js

import "./home.css";
import cafeImg from "../../assets/imgs/cafe.jpg";
import { renderMenu } from "../menu/menu";

const LOREM = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum unde non harum, adipisci a sapiente dolor dicta ipsam autem, modi nobis itaque iste optio quo fugiat distinctio quae vero. Blanditiis!";

export function renderHome(parent){
  parent.style.alignItems = "center";

  const homeContainer = document.createElement("section");
  homeContainer.classList.add("home-container");

  // Hero Intro Div

  const heroIntroContainer = document.createElement("div");
  heroIntroContainer.classList.add("hero-intro");

  const titleH1 = document.createElement("h1");
  titleH1.textContent = "Voynich Cafe";

  const introP = document.createElement("p");
  introP.textContent = LOREM;

  const navMenuButton = document.createElement("button");
  navMenuButton.textContent = "See Menu";
  navMenuButton.addEventListener("click", () => {
    parent.replaceChildren();
    renderMenu(parent);
  })

  heroIntroContainer.append(titleH1, introP, navMenuButton);

  // Hero Image Div

  const heroImageContainer = document.createElement("div");
  heroImageContainer.classList.add("hero-img")

  const heroImg = document.createElement("img");
  heroImg.src = cafeImg
  heroImg.alt = "cafe"

  heroImageContainer.appendChild(heroImg)

  // Append Containers

  homeContainer.append(heroIntroContainer, heroImageContainer);
  parent.append(homeContainer);
}