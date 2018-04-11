export class Alien {
    WIDTH:number = 30;
    HEIGHT:number = 30;
    STEP:number = 15;

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
}
