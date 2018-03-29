export class Player {
    pseudo:string = "player1";
    hp:number;
    score:number;
    coordonate:number = 385; // only x : (level width / 2) - (player width / 2)
    node: HTMLElement;

    constructor() {
        this.node = document.createElement('div');
        this.node.id = 'player';
        this.node.className = 'player';
    }
}
