export class Shot {
    WIDTH:number = 4;
    HEIGHT:number = 15;
    TIMEOUT:number = 50;
    x:number;
    y:number;
    direction:string;
    node:HTMLElement;

    i:number = 0; // TODO remove

    constructor(direction:string, y:number) {
        this.direction = direction;
        this.y = y;
        this.node = document.createElement('div');
        this.node.style.width = this.WIDTH + 'px';
        this.node.style.height = this.HEIGHT + 'px';
        this.node.style.position = 'absolute';
        this.node.style.backgroundColor = '#fff';
        this.loop();
    }

    loop() {
        let self = this;
        setTimeout (function() {
            self.move();
            self.i += 1;
            self.i < 60 ? self.loop() : true; // TODO remplacer 60 par le haut du lvl + supprimer le node
        }, this.TIMEOUT)
    }

    move() {
        this.y += 10;
        this.node.style.bottom = this.y + 'px';
    }
}
