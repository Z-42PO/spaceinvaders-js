export class Shot {
    width:number = 4;
    height:number = 15;
    x:number;
    y:number;
    node:HTMLElement;

    constructor() {
       this.node = document.createElement('div');
       this.node.style.width = this.width + 'px';
       this.node.style.height = this.height + 'px';
       this.node.style.position = 'absolute';
       this.node.style.backgroundColor = '#fff';
    }
}
