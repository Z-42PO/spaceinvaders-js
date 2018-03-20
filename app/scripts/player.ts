export class Player {
    pseudo:string = "player1";
    hp:number;
    score:number;
    position:Array<number>;
    node: HTMLElement;

    create(position:string) {
        this.node = document.createElement('div');
        this.node.id = 'player';
        document.getElementById(position).appendChild(this.node);
    }
}
