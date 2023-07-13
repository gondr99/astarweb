import { Astar } from "./Astar.js";
import { MapManager } from "./MapManager.js";
import { Position } from "./Position.js";
let astar;
let gen;
window.addEventListener("load", () => {
    var _a;
    const mapBox = document.querySelector(".map-box");
    MapManager.Instance = new MapManager();
    const mapData = MapManager.Instance.mapData;
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
    const btn = document.querySelector("#findBtn");
    btn.addEventListener("click", () => {
        astar = new Astar(new Position(1, 8), new Position(8, 8));
        refreshList();
        gen = astar.findPath(); //제네레이터 가져오기
    });
    (_a = document.querySelector("#nextBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", e => {
        let v = gen.next();
        console.log(v);
        refreshList();
    });
    const openDom = document.querySelector(".open-list");
    const closeDom = document.querySelector(".info-box > .list");
    function refreshList() {
        // console.log(astar.closeList);
        // console.log(astar.openList.list);
        openDom.innerHTML = "";
        astar.openList.list.forEach(n => {
            let div = makeOpenItem(n.name);
            openDom.appendChild(div);
        });
        closeDom.innerHTML = "";
        astar.closeList.forEach(n => {
            let div = makeCloseItem(n.name, n.parent == null ? "Null" : n.parent.name);
            closeDom.appendChild(div);
        });
    }
    function makeCloseItem(name, parent) {
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="close-item">
            <div class="label slot-name">${name}</div>
            <div class="label parent-name">${parent}</div>
        </div>`;
        return div.firstElementChild;
    }
    function makeOpenItem(name) {
        let div = document.createElement("div");
        div.innerHTML = `<div class="open-slot">${name}</div>`;
        return div.firstElementChild;
    }
});
