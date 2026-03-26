import { Prisma } from "../../generated/prisma/client";

const characters: Prisma.CharacterCreateManyInput[] = [
  {
    name: "Waldo",
    imgUrl: "https://whereiswaldo.com/assets/icons/waldo.png",
  },
  {
    name: "Odlaw",
    imgUrl: "https://whereiswaldo.com/assets/icons/odlaw.png",
  },
  {
    name: "Wizard",
    imgUrl: "https://whereiswaldo.com/assets/icons/wizard.png",
  }
];

export default characters;