function start() {
    const cv = document.getElementById("game");
    const c = cv.getContext("2d");

    c.fillStyle = "black";
    c.fillRect(0, 0, cv.width, cv.height);

    c.fillStyle="rgb(200 0 0)";
    c.fillRect(10, 10, 50, 50);

    c.fillStyle="rgb(0 0 200 / 50%)";
    c.fillRect(30, 30, 50, 50);

    c.fillStyle="rgb(200 0 0)";
    c.font="35px Times New Roman";
    c.fillText("Upload a Song below", 100, 100);
}
start();

function game() {

    // pixel_position_of_note:
    //     let x = BPM/240000*scroll_speed*(screen_width - 150)
    //     return 150+(x - current_time) + scroll_speed
}