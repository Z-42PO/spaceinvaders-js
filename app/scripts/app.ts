// Game Controller

import { Level } from './level';
import { Player } from './player';
import { Shot } from './shot';

class GameController {
    TIMEOUT_SHOT:number = 50; // timeout on loopshot

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
     * @param level
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
              case " ":
                this.addShot(player, level, 'top')
                break;
              default:
                return; // Quit when this doesn't handle the key event.
            }

            // Consume the event for suppressing "double action".
            event.preventDefault();
        }, true);
    }

    /**
     * add a shot from player
     * @param player
     * @param level
     * @param direction
     */
    addShot(player:Player, level:Level, direction:string) {
        let y = player.HEIGHT + 5;
        let shot = new Shot(direction, y);
        level.addElement(shot.node, player.coordonate + player.WIDTH / 2 - shot.WIDTH / 2, y)
        this.loopShot(shot, level.height);
    }

    /**
     * move the shot
     * @param shot
     * @param height
     */
    loopShot(shot:Shot, height:number) {
        let self = this;
        setTimeout (function() {
            shot.move();
            shot.y < height - shot.STEP ? self.loopShot(shot, height) : shot.node.remove();
        }, this.TIMEOUT_SHOT)
    }
}

// on document ready
document.addEventListener('DOMContentLoaded', () => {
    new GameController();
})
