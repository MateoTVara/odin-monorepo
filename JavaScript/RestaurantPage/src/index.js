// index.js

import "./styles.css";
import { renderHome } from "./modules/home/home";
import { renderMenu } from "./modules/menu/menu";
import { renderAbout } from "./modules/about/about";

const mainDiv = document.querySelector("#content");
const navHeader = document.querySelector("header>nav");

const routes = {
  "home-btn" : renderHome,
  "menu-btn" : renderMenu,
  "about-btn" : renderAbout,
}

renderHome(mainDiv);

navHeader.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    mainDiv.replaceChildren();
    const renderModule = routes[e.target.id];
    if (renderModule) renderModule(mainDiv);
  }
})