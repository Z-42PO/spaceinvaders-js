// Game Controller

import { Level } from './level';
import { Player } from './player';

class GameController {
    constructor() {
        let level = new Level(1, 1);
        let player = new Player();

        // add Player inside Level
        level.addElement(player.node, player.coordonate);
        this.setKeydowEvent(player, level);
    }

    /**
     * Use KeydownEvent constructor to listen keydown event
     * @param player
     */
    setKeydowEvent(player:Player, level:Level) {
        window.addEventListener("keydown", (event) => {
            if (event.defaultPrevented) {
              return; // Should do nothing if the key event was already consumed.
            }

            switch (event.key) {
              case "ArrowLeft":
                player.move('left', level.width)
                break;
              case "ArrowRight":
                player.move('right', level.width)
                break;
              case "Space":
                // Do something for "enter" or "return" key press.
                break;
              default:
                return; // Quit when this doesn't handle the key event.
            }

            // Consume the event for suppressing "double action".
            event.preventDefault();
        }, true);
    }
}


document.addEventListener('DOMContentLoaded', () => { // on document ready
    new GameController();
})
