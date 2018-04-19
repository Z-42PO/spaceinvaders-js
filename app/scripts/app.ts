// Game Controller

import { Level } from './level';
import { Player } from './player';
import { Alien } from './alien';
import { Shot } from './shot';

class GameController {
    TIMEOUT_SHOT: number = 50; // timeout on loopshot
    TIMEOUT_ALIEN: number = 250; // timeout on alien 250
    level: Level = new Level(1, 1);
    player: Player = new Player();
    aliens: Alien[] = new Array;

    constructor() {
        // add Player inside Level
        this.level.addElement(this.player.node, this.player.x);
        this.setKeydowEvent();

        // add all Aliens
        this.addAliens();
        this.loopAlien('right');
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
     * check if a shot hit an alien
     */
    checkCollision(shot: Shot) {
        let val = false;
        for (const alien of this.aliens) {
            let alienXmin = alien.x;
            let alienXmax = alien.x + alien.WIDTH;
            let shotXmin = shot.x;
            let shotXmax = shot.x + shot.WIDTH;

            let alienYmin = alien.y;
            let alienYmax = alien.y + alien.HEIGHT;
            let shotYmin = shot.y;
            let shotYmax = shot.y + shot.HEIGHT;

            shotXmax >= alienXmin && shotXmin <= alienXmax
            && shotYmax > alienYmin && shotYmin <= alienYmax
            ? (
                val = true,
                alien.node.remove(), // remove alien from DOM
                this.aliens.splice(this.aliens.indexOf(alien) , 1) // remove alien from array
              )
            : true;
        }
        return val;
    }

    /**
     * add a shot from player
     * @param direction
     */
    addShot(direction: string) {
        let y = this.player.HEIGHT + 5;
        let shot = new Shot(direction, this.player.x + this.player.WIDTH / 2, y);
        this.level.addElement(shot.node, shot.x, y);
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
            (shot.y < height - shot.STEP) && self.checkCollision(shot) == false
                ? self.loopShot(shot, height)
                : shot.node.remove(); // remove shot from DOM
        }, this.TIMEOUT_SHOT);
    }

    /**
     * add all Aliens, omg we're doomed !
     */
    addAliens() {
        let i;
        let j = 0;
        let x;
        let y = this.level.height;

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
     * @param x
     * @param y
     */
    addAlien(x: number, y: number) {
        let alien = new Alien(x, y);
        this.level.addElement(alien.node, alien.x, alien.y);
        this.aliens.push(alien);
    }

    moveAliens(direction:string) {
        for (const alien of this.aliens) {
            alien.move(direction);
            'bottom' == direction ? alien.STEP += 2 : true
        }
    }

    /**
     * move aliens
     * @param d aliens's direction
     */
    loopAlien(d:string) {
        let self = this;
        let direction = d;
        let lastDirection;
        setTimeout(function () {
            for (const alien of self.aliens) {
                ('right' == direction) && (alien.x + alien.WIDTH + alien.STEP > self.level.width) ||
                ('left' == direction) && (alien.x - alien.STEP < 0)
                    ? (self.moveAliens('bottom'), direction == 'right')
                        ? direction = 'left'
                        : direction = 'right'
                    : true
            }
            self.loopAlien(direction);
            self.moveAliens(direction);
        }, this.TIMEOUT_ALIEN);
    }
}

// on document ready
document.addEventListener('DOMContentLoaded', () => {
    new GameController();
})
