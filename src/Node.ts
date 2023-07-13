import { Position } from "./Position.js";

export class Node 
{
    pos:Position;
    parent: Node | null;
    G: number;
    F: number;
    
    constructor(pos : Position, parent : Node| null, G:number, F:number )
    {
        this.pos = pos;
        this.parent = parent;
        this.G = G;
        this.F = F;
    }

    compare(other: Node):number
    {
        if(other.F == this.F) return 0;
        else return other.F < this.F ? -1 : 1;
    }

    equal(other:Node) : boolean
    {
        return other.pos.equal(this.pos); //좌표로 같음 비교
    }
}