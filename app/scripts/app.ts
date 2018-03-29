// Game Controller

import { Level } from './level';
import { Player } from './player';

class GameController {
    constructor() {
        let level = new Level(1, 1);
        let player = new Player();

        // add Player inside Level
        level.addElement(player.node, player.coordonate);
    }
}


document.addEventListener('DOMContentLoaded', () => { // on document ready
    new GameController();
})
