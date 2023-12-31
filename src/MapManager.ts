import { Position } from "./Position.js";

interface MapSlot 
{
    pos: Position;
    dom: HTMLDivElement | null;
}

export class MapManager
{
    static Instance : MapManager;

    mapData: string[][];
    slotData: MapSlot[][];
    
    constructor()
    {
        this.mapData  = [
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
        this.slotData = [];
        for(let i = 0; i < this.mapData.length; i++)
        {
            this.slotData.push([]);
            for(let j = 0; j < this.mapData[i].length; j++) {
                this.slotData[i].push({pos: new Position(j, i), dom:null });
            }
        }

        this.makeMapDomData();
    }

    getDom(pos:Position) : HTMLDivElement 
    {
        let {x, y} = pos;
        return this.slotData[y][x].dom as HTMLDivElement;
    }
    makeMapDomData()
    {
        const mapBox:HTMLDivElement = document.querySelector(".map-box") as HTMLDivElement;
        const mapData = this.mapData;
    
        for(let i: number = 0; i < mapData.length; i++)
        {
            for(let j: number = 0; j < mapData[i].length; j++)
            {
                let dom = this.makeMapSlot(mapData[i][j]);
                dom.dataset.x = j.toString();
                dom.dataset.y = i.toString();
                this.slotData[i][j].dom = dom;
                mapBox.appendChild(dom);
            }
        }
    }

    makeMapSlot(text:string) : HTMLDivElement
    {
        const div = document.createElement("div") as HTMLDivElement;

        div.innerHTML = `
            <div class="slot ${text === "XX" ? "wall" : ""}"> 
                ${text === "XX" ? "" : text}
            </div>`;
        
        return div.firstElementChild as HTMLDivElement;
    }

    canMove(x:number, y:number) : boolean
    {
        return this.mapData[y][x] !== "XX" && x < this.mapData.length && y < this.mapData[0].length;
    }

    getName(pos:Position) : string 
    {
        return this.mapData[pos.y][pos.x];
    }
}