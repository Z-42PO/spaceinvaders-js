import { Player } from './player';

class Level {
    width: number;
    height: number;
    stage: number;
    tempo: number;
    player: Player;
    // alien: Array<Alien>;
    node: HTMLElement;

    constructor(stage:number, tempo:number) {
        this.width = 800;
        this.height = 600;
        this.stage = 1;
        this.tempo = 1;
        this.create();
    }

    create() {
        // add Level in DOM
        this.node = document.createElement('div');
        this.node.className = 'level level-' + this.stage;
        this.node.style.width = this.width + 'px';
        this.node.style.height = this.height + 'px';
        // add Player inside Level
        this.player = new Player();
        this.player.create(this.node);
        document.body.appendChild(this.node);
    }
}



document.addEventListener('DOMContentLoaded', function() { // on document ready
    new Level(1, 1);
})
