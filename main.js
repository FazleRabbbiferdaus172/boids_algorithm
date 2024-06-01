import {Boid} from "./boid.js";

(async () =>
{
    // Create a new application
    const app = new PIXI.Application();

    // Initialize the application
    await app.init({ antialias: true, resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);
    let x = 650, y = 250;
    let boid;
    for (let i=0; i < 25; i++) {
      y += Math.floor(Math.random() * (10 - 6 + 1)) + 6;
      x = 650;
      for (let j=0; j < 40; j++) {
        x += Math.floor(Math.random() * (10 - 6 + 1)) + 6;
        boid = new Boid({
          visible_range : 40,
          protected_range : 8,
          min_speed : 1,
          max_speed : 3,
          x : x,
          y : y,
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
          with_tail: false
        }
        )
        boid.stage_boid_graphis(app);
      }
    }
    app.ticker.add((ticker) => {
      Boid.instances.forEach(boid => {
        boid.update_position();
        boid.boid_graphics.x += boid.vx;
        boid.boid_graphics.y += boid.vy;
        if (boid.with_tail) {
        for (let i=0; i < 9; i++) {
          boid.boid_path_graphics[i].x += boid.boid_path_list[i][0];
          boid.boid_path_graphics[i].y += boid.boid_path_list[i][1];
        }
        }
      })
    });
})();