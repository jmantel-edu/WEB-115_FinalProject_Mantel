
function start() {
    const cv = document.getElementById("game");
    const c = cv.getContext("2d");

    c.fillStyle = "black";
    c.fillRect(0, 0, cv.width, cv.height);

    c.fillStyle="rgb(200 0 0)";
    c.fillRect(10, 10, 50, 50);

    c.fillStyle="rgb(0 0 200 / 50%)";
    c.fillRect(30, 30, 50, 50);

    // c.fillStyle="linear-gradient(to right, #7CFEF0, #6BFFB8, #2CEAA3, #28965A, #2A6041)";
    c.fillStyle="rgb(200 0 0)";
    c.fillText("Upload a Song below", 100, 100);
    c.font="35px Times New Roman";
}
start();