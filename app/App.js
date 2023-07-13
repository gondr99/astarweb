const mapData = [
    ["XX", "XX", "XX", "XX", "XX", "XX", "XX", "XX", "XX", "XX"],
    ["XX", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "XX"],
    ["XX", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "XX"],
    ["XX", "D1", "D2", "XX", "D4", "D5", "D6", "D7", "D8", "XX"],
    ["XX", "E1", "E2", "XX", "E4", "E5", "XX", "XX", "XX", "XX"],
    ["XX", "F1", "F2", "XX", "F4", "F5", "F6", "F7", "F8", "XX"],
    ["XX", "G1", "G2", "XX", "G4", "G5", "G6", "G7", "G8", "XX"],
    ["XX", "H1", "H2", "XX", "H4", "H5", "XX", "XX", "H8", "XX"],
    ["XX", "I1", "I2", "XX", "I4", "I5", "XX", "I7", "I8", "XX"],
    ["XX", "XX", "XX", "XX", "XX", "XX", "XX", "XX", "XX", "XX"],
];
import { Astar } from "./Astar.js";
window.addEventListener("load", () => {
    const mapBox = document.querySelector(".map-box");
    for (let i = 0; i < mapData.length; i++) {
        for (let j = 0; j < mapData[i].length; j++) {
            mapBox.appendChild(makeMapSlot(mapData[i][j]));
        }
    }
    function makeMapSlot(text) {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="slot ${text === "XX" ? "wall" : ""}"> 
                ${text === "XX" ? "" : text}
            </div>`;
        return div.firstElementChild;
    }
    let astar;
    const btn = document.querySelector("#findBtn");
    btn.addEventListener("click", () => {
        astar = new Astar("I1", "I7");
    });
});
