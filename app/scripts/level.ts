class Level {
    width: Number;
    height: Number;
    stage: Number;
    tempo: Number;
    player: Player;
    alien: Array<Alien>;
    node: HTMLElement;

    constructor(stage:Number, tempo:Number) {
        this.width = 800;
        this.height = 600;
        this.stage = 1;
        this.tempo = 1;
        this.addDiv();
    }

    addDiv() {
        this.node = document.createElement('div');
        this.node.className = 'level-' + this.stage;
        this.node.style.width = this.width + 'px';
        this.node.style.height = this.height + 'px';
        document.body.appendChild(this.node);
    }
}




document.addEventListener('DOMContentLoaded', function() { // on document ready
    new Level(1, 1);
})
