import {Boid} from "./boid.js";

(async () =>
{
    // Create a new application
    const app = new PIXI.Application();

    // Initialize the application
    await app.init({ antialias: true, resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);
    // let boids = [];
    // let boid;
    // for (let i=0; i < 5; i++) {
    //     boid = new PIXI.Graphics().circle(400, 400, 3)
    //     .fill('red');
    //     boids.push(boid);
    // }
    // app.stage.addChild(...boids);
    for (let i=0; i < 500; i++) {
      let boid = new Boid({
        visible_range : 80,
        protected_range : 15,
        min_speed : 1,
        max_speed : 2.5,
        x : 200,
        y : 120,
        vx : 1.2,
        vy : 1.2,
        avoid_factor : 0.0005,
        matching_factor : 0.05,
        centering_factor : 0.05,
        left_margin: 200,
        right_margin: 950,
        top_margin: 120,
        bottom_margin: 450,
        turn_factor: .06,
        maxbias: 0.01,
        bias_incremen:  0.00004,
        biasval: Math.floor((Math.random() * 3) - 1),
      }
      )
      boid.stage_boid_graphis(app);
    }
    app.ticker.add((ticker) => {
      Boid.instances.forEach(boid => {
        boid.update_position();
        boid.update_velocity_to_maintain_screen_edge()
        boid.boid_graphics.x += boid.vx;
        boid.boid_graphics.y += boid.vy;
      })
    });
})();