export class Player {
    pseudo:string = "player1";
    hp:number;
    score:number;
    width:number = 30;
    step:number = 15;
    coordonate:number = 385; // only x : (level width / 2) - (player width / 2)
    node: HTMLElement;

    constructor() {
        this.node = document.createElement('div');
        this.node.id = 'player';
        this.node.className = 'player';
        this.node.style.width = this.width + 'px';
    }

    /**
     * Move element in the direction left or right
     * @param direction left | right
     */
    move(direction:string, limit:number) {
        this.coordonate += direction == 'left'
            ? this.coordonate - this.step > 0
                ? -this.step
                : 0
            : this.coordonate + this.width + this.step < limit
                ? this.step
                : 0;
        this.node.style.left = this.coordonate + 'px';
    }
}
