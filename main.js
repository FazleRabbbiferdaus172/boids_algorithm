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
        visible_range : 40,
        protected_range : 8,
        min_speed : 1,
        max_speed : 3,
        x : 450,
        y : 255,
        vx : 1.5,
        vy : 1.5,
        avoid_factor : 0.05,
        matching_factor : 0.05,
        centering_factor : 0.003,
        left_margin: 200,
        right_margin: 1150,
        top_margin: 100,
        bottom_margin: 650,
        turn_factor: .2,
        bias_val: 0.001,
      }
      )
      boid.stage_boid_graphis(app);
    }
    app.ticker.add((ticker) => {
      Boid.instances.forEach(boid => {
        boid.update_position();
        boid.boid_graphics.x += boid.vx;
        boid.boid_graphics.y += boid.vy;
        for (let i=0; i < 9; i++) {
          debugger;
          boid.boid_path_graphics[i].x += boid.boid_path_list[i][0];
          boid.boid_path_graphics[i].y += boid.boid_path_list[i][1];
        }
        debugger;
      })
    });
})();