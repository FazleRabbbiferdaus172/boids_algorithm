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
    for (let i=0; i < 300; i++) {
      let boid = new Boid({
        visible_range : 80,
        protected_range : 300,
        min_speed : 3,
        max_speed : 6,
        x : window.innerWidth/2 + (50 + Math.random() * (50 - 3)) * Math.floor((Math.random() * 3) - 1),
        y : window.innerHeight/2 + (50 + Math.random() * (50 - 3)) * Math.floor((Math.random() * 3) - 1),
        vx : 3,
        vy : 3,
        avoid_factor : 0.0005,
        matching_factor : 0.05,
        centering_factor : 0.05,
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
        boid.update_velocity_to_maintain_screen_edge(
          150,
          650,
          150,
          450,
          .008
        )
        boid.boid_graphics.x += boid.vx;
        boid.boid_graphics.y += boid.vy;
      })
    });
})();