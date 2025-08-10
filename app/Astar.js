import { PriorityQueue } from "./PriorityQueue.js";
import { Node } from "./Node.js";
import { Position } from "./Position.js";
import { MapManager } from "./MapManager.js";
export class Astar {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.openList = new PriorityQueue();
        this.closeList = [];
    }
    //제네레이터
    *findPath() {
        const opens = this.openList;
        const closes = this.closeList;
        const start = this.start;
        const end = this.end;
        //시작점 넣어주고
        let name = MapManager.Instance.getName(start);
        opens.push(new Node(new Position(start.x, start.y), null, 0, this.calcH(start), name));
        let result = false;
        let cnt = 0;
        let prevDom = null;
        //오픈리스트가 존재하는 한.
        while (opens.count() > 0) {
            let n = opens.pop(); //하나 빼오고
            //이게 현재 탐색노드가 된다.
            if (prevDom != null) {
                prevDom.classList.remove("now");
            }
            prevDom = MapManager.Instance.getDom(n.pos);
            prevDom.classList.add("now");
            this.findOpenList(n);
            closes.push(n); //방문완료
            yield cnt;
            if (n.pos.equal(end)) { //목적지에 도착
                result = true;
                break;
            }
            cnt++;
            if (cnt >= 10000) {
                result = false;
                break;
            }
        }
        if (result) {
            alert("경로 설정 완료");
            //여기서 리스트 역으로 만들어줘야 해
        }
        else {
            alert("경로가 없어요");
        }
    }
    findOpenList(currentNode) {
        let { x: cX, y: cY } = currentNode.pos;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0)
                    continue;
                let nX = cX + j, nY = cY + i;
                let next = new Position(nX, nY);
                let n = this.closeList.find(x => x.pos.equal(next));
                if (n !== undefined)
                    continue; //이미 방문한 노드리스트에 있다면
                if (MapManager.Instance.canMove(next.x, next.y)) {
                    //g를 새로 계산
                    let g = currentNode.G + Math.sqrt(Math.pow(cX - nX, 2) + Math.pow(cY - nY, 2));
                    let name = MapManager.Instance.getName(next);
                    let nextOpenNode = new Node(next, currentNode, g, g + this.calcH(next), name);
                    let exists = this.openList.contains(nextOpenNode);
                    //단순화
                    if (exists == null) {
                        this.openList.push(nextOpenNode);
                    }
                    //리프레시 코드 제거 2025.08.11
                    // if(exists != null) //기존 리스트에 존재한다
                    // {
                    //     exists.G = nextOpenNode.G;
                    //     exists.F = nextOpenNode.F;
                    //     exists.parent = nextOpenNode.parent;
                    //     //우선순위 큐 다시 리프레시 시켜줘야 함.
                    // }else{
                    //     this.openList.push(nextOpenNode);
                    // }
                }
            }
        }
    }
    calcH(currentPos) {
        const end = this.end;
        return Math.sqrt(Math.pow(end.x - currentPos.x, 2) + Math.pow(end.y - currentPos.y, 2));
    }
}
