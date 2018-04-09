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

    /**
     * Move element in the direction left or right
     * @param direction left | right
     */
    move(direction:string) {
        this.coordonate += direction == 'left' ? -5 : 5;
        this.node.style.left = this.coordonate + 'px';
    }
}
