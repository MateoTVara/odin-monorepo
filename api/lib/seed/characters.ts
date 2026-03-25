import { Character } from "../../generated/prisma/client";

const characters: Omit<Character, "id">[] = [
  {
    name: "Waldo",
    img_url: "https://whereiswaldo.com/assets/icons/waldo.png",
  },
  {
    name: "Odlaw",
    img_url: "https://whereiswaldo.com/assets/icons/odlaw.png",
  },
  {
    name: "Wizard",
    img_url: "https://whereiswaldo.com/assets/icons/wizard.png",
  }
];

export default characters;