export class Player {
    WIDTH:number = 30;
    HEIGHT:number = 30;
    STEP:number = 15;

    pseudo:string = "player1";
    hp:number;
    score:number;
    coordonate:number = 385; // only x : (level width / 2) - (player width / 2)
    node: HTMLElement;

    constructor() {
        this.node = document.createElement('div');
        this.node.id = 'player';
        this.node.className = 'player';
        this.node.style.width = this.WIDTH + 'px';
        this.node.style.height = this.HEIGHT + 'px';
    }

    /**
     * Move element in the direction left or right
     * @param direction left | right
     */
    move(direction:string, limit:number) {
        this.coordonate += direction == 'left'
            ? this.coordonate - this.STEP > 0
                ? -this.STEP
                : 0
            : this.coordonate + this.WIDTH + this.STEP < limit
                ? this.STEP
                : 0;
        this.node.style.left = this.coordonate + 'px';
    }
}
