// import { Player } from './player';

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
        this.node = document.createElement('div');
        this.node.className = 'level level-' + this.stage;
        this.node.id = 'level';
        this.node.style.width = this.width + 'px';
        this.node.style.height = this.height + 'px';

        this.player = new Player();
        this.player.create('level');
        document.body.appendChild(this.node);
    }
}





class Player {
    pseudo:string = "player1";
    hp:number;
    score:number;
    position:Array<number>;
    node: HTMLElement;

    create(position:string) {
        this.node = document.createElement('div');
        this.node.id = 'player';
        document.getElementById(position).appendChild(this.node);
    }
}


document.addEventListener('DOMContentLoaded', function() { // on document ready
    new Level(1, 1);
})
