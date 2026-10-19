const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 600,
        windowHeight: 600,
        radius: 200,
        origin: {},
        points: 200,
        modulo: 2,
    };
    world.origin.x = world.windowWidth / 2;
    world.origin.y = world.windowHeight / 2;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "MODULAR MULTIPLICATION TABLE",
    );
    r.SetTargetFPS(60);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function toRadians(degree) {
    return (degree * Math.PI) / 180;
}

function getX(origin, radius, angle) {
    return origin.x + radius * Math.cos(toRadians(angle));
}

function getY(origin, radius, angle) {
    return origin.y + radius * Math.sin(toRadians(angle));
}

function getColor(i, points) {
    const hue = (i / points) * 360;
    return r.ColorFromHSV(hue, 1, 1);
}

function drawTimesTable(world) {
    const angleSlice = 360 / world.points;

    for (let i = 0; i < world.points; i++) {
        const startX = getX(world.origin, world.radius, i * angleSlice);
        const startY = getY(world.origin, world.radius, i * angleSlice);

        const endPoint = (i * world.modulo) % world.points;
        const endX = getX(world.origin, world.radius, endPoint * angleSlice);
        const endY = getY(world.origin, world.radius, endPoint * angleSlice);

        const color = getColor(i, world.points);

        r.DrawLineV(
            { x: startX, y: startY },
            { x: endX, y: endY },
            color,
        );
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    
    r.DrawRing(world.origin, world.radius, world.radius + 5, 0, 360, 50, r.RED);
    drawTimesTable(world);
    
    r.EndDrawing();
}

function update(world) {
    world.modulo += 0.01
}

function tearDown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    isRunning,
    draw,
    update,
    tearDown,
};
