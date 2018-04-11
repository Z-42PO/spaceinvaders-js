export class Shot {
    WIDTH:number = 4;
    HEIGHT:number = 15;
    STEP:number = 10;

    x:number;
    y:number;
    direction:string;
    node:HTMLElement;

    constructor(direction:string, y:number) {
        this.direction = direction;
        this.y = y;
        this.node = document.createElement('div');
        this.node.style.width = this.WIDTH + 'px';
        this.node.style.height = this.HEIGHT + 'px';
        this.node.style.position = 'absolute';
        this.node.style.backgroundColor = '#fff';
        this.move();
    }

    move() {
        this.y += this.STEP;
        this.node.style.bottom = this.y + 'px';
    }
}
