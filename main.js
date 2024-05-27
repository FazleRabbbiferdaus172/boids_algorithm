(async () =>
{
    // Create a new application
    const app = new PIXI.Application();

    // Initialize the application
    await app.init({ antialias: true, resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);
    let boids = [];
    let boid;
    for (let i=0; i < 5; i++) {
        boid = new PIXI.Graphics().circle(400, 400, 3)
        .fill('red');
        boids.push(boid);
    }
    app.stage.addChild(...boids);
    let elapsed = 0.0;
    app.ticker.add((ticker) => {
      elapsed += ticker.deltaTime;
      // sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.00;
      for (let i=0; i < 5; i++) {
        boids[i].x = Math.floor(Math.random() * 100.0) + 100  + Math.cos(elapsed/50.0) * 100.00;
       }
    });
})();