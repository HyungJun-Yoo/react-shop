import { atom } from "recoil";

const projectsData = atom({
  key: "projectsData",
  default: [],
});

const cartsData = atom({
  key: "cartsData",
  default: 0,
});

export { projectsData, cartsData };
