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
                    this.addShot('top', this.player.x + this.player.WIDTH / 2, this.player.y);
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

            // Consume the event for suppressing "double action".
            event.preventDefault();
        }, true);
    }

    /**
     * check if a shot hit something
     */
    checkCollision(shot: Shot) {
        let val = false;
        let shotXmin = shot.x;
        let shotXmax = shot.x + shot.WIDTH;
        let shotYmin = shot.y;
        let shotYmax = shot.y + shot.HEIGHT;

        if (shot.direction == 'top') {
            for (const alien of this.aliens) {
                let alienXmin = alien.x;
                let alienXmax = alien.x + alien.WIDTH;
                let alienYmin = alien.y;
                let alienYmax = alien.y + alien.HEIGHT;

                shotXmax >= alienXmin && shotXmin <= alienXmax &&
                shotYmax > alienYmin && shotYmin <= alienYmax
                ? (
                    val = true,
                    alien.node.remove(), // remove alien from DOM
                    this.aliens.splice(this.aliens.indexOf(alien) , 1) // remove alien from array
                    )
                : true;
            }
        } else {
            shotXmax >= this.player.x && shotXmin <= this.player.x + this.player.WIDTH &&
            shotYmin <= this.player.y
            ? (
                val = true,
                this.gameOver()
              )
            : true;
        }
        return val;
    }

    /**
     * add a shot from player
     * @param direction
     */
    addShot(direction: string, x: number, y:number) {
        let shot = new Shot(direction, x, y);
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
            (shot.y < height - shot.STEP) && (shot.y > 0) && (self.checkCollision(shot) == false)
                ? self.loopShot(shot, height)
                : shot.node.remove(); // remove shot from DOM
        }, this.TIMEOUT_SHOT);
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
     * move all aliens
     * @param direction
     */
    moveAliens(direction:string) {
        for (const alien of this.aliens) {
            alien.move(direction);
            'bottom' == direction ? alien.STEP += 2 : true
            alien.y < 0 ? this.gameOver() : true
        }
    }

    /**
     * move aliens
     * @param d aliens's direction
     */
    loopAlien(d:string) {
        this.aliens.length == 0 ? this.gameWin() : true;
        let self = this;
        let direction = d;
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
            Math.floor(Math.random() * 2) ? self.shotAlien() : true;
        }, this.TIMEOUT_ALIEN);
    }

    /**
     * make aliens shooting
     */
    shotAlien() {
        let currentIndex = Math.floor(Math.random() * this.aliens.length);
        this.addShot('bottom', this.aliens[currentIndex].x + this.aliens[currentIndex].WIDTH / 2, this.aliens[currentIndex].y);
    }

    /**
     * executed when game is lost
     */
    gameOver() {
        alert('Perdu');
        location.reload();
    }

    gameWin() {
        alert('Gagné !');
        location.reload();
    }
}

// on document ready
document.addEventListener('DOMContentLoaded', () => {
    new GameController();
})
