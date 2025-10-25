// main.js

import './style.css'
import Helper from './modules/helper';
import githubIcon from './assets/icons/github.svg';
import openInNewIcon from './assets/icons/open-in-new.svg';

const projectsDivs = document.querySelector(".projects");

for (let i = 0; i < 6; i++) {
  const projectImage = Helper.createElement("div", {
    text: "screenshot of project",
    classes: ["project-image"],
    styles: {backgroundColor: Helper.randomColor()},
  })



  const projectName = Helper.createElement("p", {
    text: "Project name",
  });

  const githubImg = Helper.createElement("img", {
    attrs: {src: githubIcon, alt: "GitHub icon"},
  })
  const openInNewImg = Helper.createElement("img", {
    attrs: {src: openInNewIcon, alt: "Open in new icon"},
  })
  const iconsDiv = Helper.createElement("div", {
    classes: ["project-icons"],
    children: [githubImg, openInNewImg],
  });

  const header = Helper.createElement("div", {
    classes: ["project-header"],
    children: [projectName, iconsDiv],
  });


  
  const descriptionP = Helper.createElement("p", {
    text: "Short description of the project. Just a couple of sentences will do."
  });





  const projectCard = Helper.createElement("div", {
    classes: ["project-card"],
    children: [projectImage, header, descriptionP],
  });

  projectsDivs.appendChild(projectCard);
}