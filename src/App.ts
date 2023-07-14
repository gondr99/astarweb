import {Astar} from "./Astar.js";
import { MapManager } from "./MapManager.js";
import { Node } from "./Node.js";
import { Position } from "./Position.js";

let astar : Astar;
let gen : Generator ;
window.addEventListener("load", ()=>{
    
    MapManager.Instance = new MapManager();

    const btn = document.querySelector("#findBtn") as HTMLButtonElement;
    btn.addEventListener("click", ()=>{
        
        astar = new Astar(new Position(1, 8), new Position(8, 8));
        refreshList();
        gen = astar.findPath(); //제네레이터 가져오기
    });

    document.querySelector("#nextBtn")?.addEventListener("click", e => {
        let v = gen.next();
        refreshList();
    });

    const openDom = document.querySelector(".open-list") as HTMLDivElement;
    const closeDom = document.querySelector(".info-box > .list") as HTMLDivElement;

    function refreshList()
    {
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
    

    function makeCloseItem(name:string, parent:string) : HTMLDivElement
    {
        let div = document.createElement("div") as HTMLDivElement;
        div.innerHTML = `
        <div class="close-item">
            <div class="label slot-name">${name}</div>
            <div class="label parent-name">${parent}</div>
        </div>`;
        return div.firstElementChild as HTMLDivElement;
    }

    function makeOpenItem(name:string) : HTMLDivElement
    {
        let div = document.createElement("div") as HTMLDivElement;
        div.innerHTML = `<div class="open-slot">${name}</div>`;
        return div.firstElementChild as HTMLDivElement;
    }
});