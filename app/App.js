import { Astar } from "./Astar.js";
import { MapManager } from "./MapManager.js";
import { Position } from "./Position.js";
let astar;
let gen;
var AppMode;
(function (AppMode) {
    AppMode[AppMode["Idle"] = 1] = "Idle";
    AppMode[AppMode["FindPath"] = 2] = "FindPath";
    AppMode[AppMode["SelectStartSlot"] = 3] = "SelectStartSlot";
    AppMode[AppMode["SelectEndSlot"] = 4] = "SelectEndSlot";
})(AppMode || (AppMode = {}));
window.addEventListener("load", () => {
    var _a;
    MapManager.Instance = new MapManager();
    const btn = document.querySelector("#findBtn");
    let start = new Position(1, 8);
    let end = new Position(8, 8);
    let appMode = AppMode.Idle;
    btn.addEventListener("click", () => {
        if (appMode == AppMode.FindPath) {
            showMsg("이미 경로탐색중입니다. 새로운 경로를 탐색하고자 한다면 새로고침해주세요.", "#f00");
            return;
        }
        if (appMode == AppMode.SelectStartSlot || appMode == AppMode.SelectEndSlot) {
            showMsg("먼저 슬롯을 선택하세요");
            return;
        }
        astar = new Astar(start, end);
        refreshList();
        gen = astar.findPath(); //제네레이터 가져오기
        appMode = AppMode.FindPath; //경로 배정시작
    });
    (_a = document.querySelector("#nextBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", e => {
        if (appMode != AppMode.FindPath) {
            showMsg("경로배정중이 아닙니다.");
            return;
        }
        let v = gen.next();
        if (!v.done) {
            refreshList();
        }
        else {
            showMsg("경로배정이 완료되었습니다.", "#000");
        }
    });
    const startInput = document.querySelector("#start");
    startInput.addEventListener("click", e => {
        if (appMode != AppMode.Idle) {
            showMsg("출발지를 설정할 수 없는 상태입니다.", "#f00");
            return;
        }
        appMode = AppMode.SelectStartSlot;
        showMsg("출발지를 클릭하세요", "#000", false);
    });
    const endInput = document.querySelector("#end");
    endInput.addEventListener("click", e => {
        if (appMode != AppMode.Idle) {
            showMsg("도착지를 설정할 수 없는 상태입니다.", "#f00");
            return;
        }
        appMode = AppMode.SelectEndSlot;
        showMsg("도착지를 클릭하세요", "#000", false);
    });
    const mapBox = document.querySelector(".map-box");
    mapBox.addEventListener("click", e => {
        if (appMode != AppMode.SelectStartSlot && appMode != AppMode.SelectEndSlot) {
            return;
        }
        let target = e.target;
        if (!target.classList.contains("wall") && target.classList.contains("slot")) { //벽이 아닌경우
            let x = +target.dataset.x;
            let y = +target.dataset.y;
            if (appMode == AppMode.SelectStartSlot) {
                showMsg("출발지 설정완료", "#000", false);
                start = new Position(x, y);
                appMode = AppMode.Idle;
                startInput.value = target.innerHTML;
            }
            else {
                showMsg("목적지 설정완료", "#000", false);
                end = new Position(x, y);
                appMode = AppMode.Idle;
                endInput.value = target.innerHTML;
            }
        }
    });
    const openDom = document.querySelector(".open-list");
    const closeDom = document.querySelector(".info-box > .list");
    let openDoms;
    function refreshList() {
        openDom.innerHTML = "";
        openDoms = [];
        astar.openList.list.forEach((n, idx) => {
            let div = makeOpenItem(n);
            openDoms[idx] = div;
            div.addEventListener("mouseenter", e => {
                if (idx > 0) {
                    let parentIdx = Math.floor((idx - 1) / 2);
                    openDoms[parentIdx].classList.add("parent");
                }
            });
            div.addEventListener("mouseleave", e => {
                openDoms.forEach(x => x.classList.remove("parent"));
            });
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
    function makeOpenItem(n) {
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="open-slot">
            ${n.name}
            <span class="tool-tip">G: ${n.G.toFixed(2)}, F: ${n.F.toFixed(2)}</span>
        </div>`;
        return div.firstElementChild;
    }
    const msgBox = document.querySelector(".msg-box");
    let timer = 0;
    function showMsg(msg, color = "#000", fade = true) {
        let beforeMsg = msgBox.innerHTML;
        let beforeColor = msgBox.style.color;
        msgBox.innerHTML = msg;
        msgBox.style.color = color;
        window.clearTimeout(timer);
        if (fade) {
            timer = window.setTimeout(() => {
                msgBox.innerHTML = beforeMsg;
                msgBox.style.color = beforeColor;
            }, 3000);
        }
    }
});
