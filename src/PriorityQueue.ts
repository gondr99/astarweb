import { Node } from "./Node.js";
export class PriorityQueue 
{
    list:Node[];
    constructor()
    {
        this.list = [];
    }

    count() : number
    {
        return this.list.length;
    }

    contains( n: Node) : Node | null
    {
        let item = this.list.find(x => x.equal(n));
        if(item == undefined)
        {
            return null;
        }
        else return item;
    }

    push(n : Node)
    {
        const list = this.list;
        list.push(n);
        let now:number = this.list.length - 1;
        while(now > 0)
        {
            let next = Math.floor((now - 1) / 2);
            if(list[now].compare(list[next]) < 0)
            {
                break; //부모보다 내가 우선순위가 낮아
            }
            let temp:Node = list[now];
            list[now] = list[next];
            list[next] = temp; 

            now = next;
        }
    }

    pop() : Node 
    {
        const list = this.list;
        let ret : Node = list[0]; //맨 첫번째 녀석을 리턴

        let lastIdx = list.length - 1;
        console.log(lastIdx);
        if(lastIdx == 0) {
            list.pop();
            return ret;
        }

        list[0] = list.pop() as Node; //가장 마지막 원소를 뽑아서 가장 처음에

        lastIdx--;

        let now: number =0;
        while(true)
        {
            let left = Math.floor(2 * now + 1);
            let right = Math.floor(2 * now + 2);

            let next:number = now;
            if(left <= lastIdx && list[next].compare(list[left]) < 0)
            {
                next = left;
            }

            if(right <= lastIdx && list[next].compare(list[right]) < 0)
            {
                next = right;
            }

            if(next == now)
            {
                break;
            }

            let temp:Node = list[now];
            list[now] = list[next];
            list[next] = temp; 
            
            now = next;
        }
        return ret;
    }

    peek():Node | null
    {
        return this.list.length == 0 ? null : this.list[0];
    }
}