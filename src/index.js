import "./styles/index.scss";
import { Map } from './scripts/map';
import { Ball } from './scripts/ball';
import { Launcher } from './scripts/launcher';

document.addEventListener("DOMContentLoaded", () => {
    const bgcanvas = document.getElementById("bgCanvas");
    const gamecanvas = document.getElementById("gameCanvas");

    let img = new Image();
    img.src = "./src/background.png"
    // img.addEventListener('load', draw);
    // const ball = new Ball(gamecanvas, 20, 280);
    // const map = new Map(ball.scrollSpeed, bgcanvas, img) //initial scroll speed based on initial ball velocity

    const launcher = new Launcher(gamecanvas);
    let ball;
    let map;

    const start = () => {
        launcher.animate();
        gamecanvas.addEventListener("click", launch);
    }

    const stop = () => {
        debugger;
        return cancelAnimationFrame(animationId);
    }

    const launch = () => {
        if (launcher.launchAngle && launcher.launchPower >= 0) {
            gamecanvas.removeEventListener("click", launch);
            ball = new Ball(gamecanvas, launcher.launchPower, launcher.launchAngle);
            map = new Map(ball.scrollSpeed, bgcanvas, img) //initial scroll speed based on initial ball velocity
            animate();
        }
    }

    let animating = true;

    const animate = () => {
        ball.animate();
        map.animate();


        map.scrollSpeed = ball.scrollSpeed; //will update every frame
        if (ball.scrollSpeed == 0) {
            animating = false;
        }
        

        if (animating) {
            requestAnimationFrame(animate);
        }
    }

    start();

})