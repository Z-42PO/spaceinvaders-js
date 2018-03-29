export class Level {
    width: number;
    height: number;
    stage: number;
    tempo: number;
    node: HTMLElement;

    constructor(stage:number, tempo:number) {
        this.width = 800;
        this.height = 600;
        this.stage = 1;
        this.tempo = 1;
        this.create();
    }

    /**
     * add Level in DOM
     */
    create() {
        this.node = document.createElement('div');
        this.node.className = 'level level-' + this.stage;
        this.node.style.width = this.width + 'px';
        this.node.style.height = this.height + 'px';
        document.body.appendChild(this.node);
    }

    /**
     * add element in Level
     * @param node
     * @param x
     * @param y
     */
    addElement(node:HTMLElement, x:number, y:number = 0) {
        this.node.appendChild(node);
        node.style.bottom = y + 'px';
        node.style.left = x + 'px';
    }
}
