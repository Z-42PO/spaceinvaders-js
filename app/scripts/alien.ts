export class Alien {
    WIDTH:number = 40;
    HEIGHT:number = 30;
    STEP:number = 10;

    x:number;
    y:number;
    node: HTMLElement;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
        this.node = document.createElement('div');
        this.node.className = 'alien';
        this.node.style.width = this.WIDTH + 'px';
        this.node.style.height = this.HEIGHT + 'px';
        this.node.style.position = 'absolute';
        this.node.style.left = x + 'px';
        this.node.style.bottom = y + 'px';
    }

    move(direction: string) {
        'right' == direction // yoda style
            ? (this.x += this.STEP, this.node.style.left = this.x + 'px')
            : 'left' == direction
            ? (this.x -= this.STEP, this.node.style.left = this.x + 'px')
            : 'bottom' == direction
            ? (this.y -= this.STEP, this.node.style.bottom = this.y + 'px')
        : true;
    }
}
