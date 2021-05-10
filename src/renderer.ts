import { ipcRenderer } from "electron";

console.log("hey");
ipcRenderer.on("update", (e, num) => {
  const div = document.querySelector("div.num");
  if (!div) return console.log("wat");
  div.innerHTML = num;
  return console.log("renderer!", num);
});
