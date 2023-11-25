var speedX = 0.06;
var speedZ = 0.08;

var p1speed = 0;
var p2speed = 0;

var p_minX = -1.9;
var p_maxX = 1.9;

var score_up = 0;
var score_down = 0;


Hatch.createTimer('playGame', 20, function () {
    moveBall();
    movePaddle1();
    movePaddle2();
});

function moveBall() {

    Ball.setX(Ball.getX() + speedX);
    Ball.setZ(Ball.getZ() + speedZ);
    if (Ball.getX() >= 2.37 || Ball.getX() <= -2.37) {
        speedX *= -1;
    }
    if (Ball.getZ() >= 5.37) {
        Ball.setZ(0);
        score_up++;
        su.setText(score_up);
        checkscore(score_up, 1)
    }
    else if (Ball.getZ() <= -5.37) {
        Ball.setZ(0);
        score_down++;
        sd.setText(score_down);
        checkscore(score_down, 2)
    }
}
Hatch.onKeyDown(function (event) {
    if (event.key == 'ArrowLeft') {
        p1speed = -0.06;
    }
    if (event.key == 'ArrowRight') {
        p1speed = 0.06;
    }
    if (event.key == 'a') {
        p2speed = -0.06;
    }
    if (event.key == 'd') {
        p2speed = 0.06;
    }
});

function movePaddle2() {
    Paddle_D.setX(Paddle_D.getX() + p2speed);
    if (Paddle_D.getX() <= p_minX || Paddle_D.getX() >= p_maxX) {
        p2speed = 0;
    }
}

function movePaddle1() {
    Paddle_U.setX(Paddle_U.getX() + p1speed);
    if (Paddle_U.getX() <= p_minX || Paddle_U.getX() >= p_maxX) {
        p1speed = 0;
    }
}
Ball.detectCollisionsWith([Paddle_U, Paddle_D], function (collidedObject) {
    speedZ *= -1;
});

function checkscore(score, side) {
    if (score >= 10 && side == 1) {
        sd3.setVisible(true)
        Hatch.removeTimer('playGame')
    }


    else if (score >= 10 && side == 2) {
        sd2.setVisible(true)
        Hatch.removeTimer('playGame')
    }



}
