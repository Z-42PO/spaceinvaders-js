export class Player {
    pseudo:string = "player1";
    hp:number;
    score:number;
    position:Array<number>;
    node: HTMLElement;

    create(position:HTMLElement) {
        this.node = document.createElement('div');
        this.node.id = 'player';
        position.appendChild(this.node);
    }
}