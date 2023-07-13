export class Node {
    constructor(pos, parent, G, F) {
        this.pos = pos;
        this.parent = parent;
        this.G = G;
        this.F = F;
    }
    compare(other) {
        if (other.F == this.F)
            return 0;
        else
            return other.F < this.F ? -1 : 1;
    }
    equal(other) {
        return other.pos.equal(this.pos); //좌표로 같음 비교
    }
}
