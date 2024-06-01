import {Boid} from "./boid.js";

(async () =>
{
    // Create a new application
    const app = new PIXI.Application();
    const container = document.getElementById('container');
    const margin = {top: container.offsetTop + (container.offsetHeight * .3), 
              bottom: container.offsetHeight - (container.offsetHeight * .3),
              left: container.offsetLeft + (container.offsetWidth * .25),
              rigt: container.offsetWidth - (container.offsetWidth * .25)
    }
    // Initialize the application
    await app.init({ resizeTo: container });

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
          min_speed : 3,
          max_speed : 6,
          x : x,
          y : y,
          vx : 4.5,
          vy : 4.5,
          avoid_factor : 0.05,
          matching_factor : 0.05,
          centering_factor : 0.003,
          left_margin: margin.left,
          right_margin: margin.rigt,
          top_margin: margin.top,
          bottom_margin: margin.bottom,
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