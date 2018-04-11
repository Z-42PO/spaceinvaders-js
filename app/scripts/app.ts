// Game Controller

import { Level } from './level';
import { Player } from './player';
import { Alien } from './alien';
import { Shot } from './shot';

class GameController {
    TIMEOUT_SHOT: number = 50; // timeout on loopshot
    level: Level = new Level(1, 1);
    player: Player = new Player();

    constructor() {
        // add Player inside Level
        this.level.addElement(this.player.node, this.player.x);
        this.setKeydowEvent();

        // add all Aliens
        this.addAliens();
    }

    /**
     * Use KeydownEvent constructor to listen keydown event
     * @param player
     * @param level
     */
    setKeydowEvent() {
        window.addEventListener("keydown", (event) => {
            if (event.defaultPrevented) {
                return; // Should do nothing if the key event was already consumed.
            }

            switch (event.key) {
                case "ArrowLeft":
                    this.player.move('left', this.level.width);
                    break;
                case "ArrowRight":
                    this.player.move('right', this.level.width);
                    break;
                case " ":
                    this.addShot('top');
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
     * @param direction
     */
    addShot(direction: string) {
        let y = this.player.HEIGHT + 5;
        let shot = new Shot(direction, y);
        this.level.addElement(shot.node, this.player.x + this.player.WIDTH / 2 - shot.WIDTH / 2, y);
        this.loopShot(shot, this.level.height);
    }

    /**
     * move the shot
     * @param shot
     * @param height
     */
    loopShot(shot: Shot, height: number) {
        let self = this;
        setTimeout(function () {
            shot.move();
            shot.y < height - shot.STEP ? self.loopShot(shot, height) : shot.node.remove();
        }, this.TIMEOUT_SHOT);
    }

    /**
     * add all Aliens, omg !
     */
    addAliens() {
        let i;
        let j = 0;
        let x;
        let y = 600;

        while (j < 3) {
            i = 0;
            x = 105;
            j++;
            y -= 50;

            while (i < 10) {
                i++;
                x += 50;
                this.addAlien(x, y);
            }
        }
    }

    /**
     * add one alien inside Level
     */
    addAlien(x: number, y: number) {
        let alien = new Alien(x, y);
        this.level.addElement(alien.node, alien.x, alien.y);
    }
}

// on document ready
document.addEventListener('DOMContentLoaded', () => {
    new GameController();
})
