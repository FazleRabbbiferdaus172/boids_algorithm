export class Boid {
  static count = 0;
  static instances = [];

  constructor({
    visible_range,
    protected_range,
    min_speed,
    max_speed,
    x,
    y,
    vx,
    vy,
    avoid_factor,
    matching_factor,
    centering_factor,
    left_margin,
    right_margin,
    top_margin,
    bottom_margin,
    turn_factor,
    bias_val
  }
  ) {
    this.visible_range = visible_range;
    this.protected_range = protected_range;
    this.min_speed = min_speed;
    this.max_speed = max_speed;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.avoid_factor = avoid_factor;
    this.matching_factor = matching_factor;
    this.centering_factor = centering_factor;
    this.left_margin = left_margin,
    this.right_margin = right_margin,
    this.top_margin = top_margin,
    this.bottom_margin = bottom_margin,
    this.turn_factor = turn_factor,
    this.boid_index = Boid.count;
    this.boid_graphics = new PIXI.Graphics().circle(x, y, 1.5).fill('red');
    Boid.count++;
    Boid.instances.push(this);
    this.bias_val = bias_val * (Math.random() < 0.5 ? 1 : -1);
  }

  static getCount() {
    return Boid.count;
  }

  stage_boid_graphis(app) {
    // debugger;
    app.stage.addChild(this.boid_graphics);
    // let new_boid_graphis = new PIXI.Graphics().circle(this.x, this.y, 3).fill('red');
    // app.stage.addChild(new_boid_graphis);
    // this.boid_graphics = new_boid_graphis;
  }

  get_distance_distance_between_boids(other_boid) {
    // √((x2 – x1)² + (y2 – y1)²)
    return Math.sqrt(
      Math.pow(this.x - other_boid.x, 2) + Math.pow(this.y - other_boid.y, 2)
    );
  }

  is_in_protected_range(other_boid) {
    let distance_between_boids =
      this.get_distance_distance_between_boids(other_boid);
    if (distance_between_boids < this.protected_range) {
      return true;
    }
    return false;
  }

  is_in_visual_range(other_boid) {
    let distance_between_boids =
      this.get_distance_distance_between_boids(other_boid);
    if (distance_between_boids < this.visible_range) {
      return true;
    }
    return false;
  }

  // Separation relative to coliding neighbors
  get_separation_vector(other_boids) {
    let close_x = 0;
    let close_y = 0;
    other_boids.forEach((other_boid) => {
      if (this.is_in_protected_range(other_boid)) {
        close_x += this.x - other_boid.x;
        close_y += this.y - other_boid.y;
      }
    });

    return { close_x, close_y };
  }

  update_velocity_to_avoid(other_boids) {
    const { close_x, close_y } = this.get_separation_vector(other_boids);
    // scaling the Separation vector by avoid_factor
    this.vx += close_x * this.avoid_factor;
    this.vy += close_y * this.avoid_factor;
  }

  // Alignment relative to visible neighbors
  get_avg_velocity_of_folk(other_boids) {
    // debug to see if it is correct
    let xvel_avg = this.vx;
    let yvel_avg = this.vy;
    let neighboring_boids = 1;
    other_boids.forEach((other_boid) => {
      if (this.is_in_visual_range(other_boid)) {
        xvel_avg += other_boid.vx;
        yvel_avg += other_boid.vy;
        neighboring_boids++;
      }
    });
    if (neighboring_boids) {
      xvel_avg /= neighboring_boids;
      yvel_avg /= neighboring_boids;
    }
    return { xvel_avg, yvel_avg };
  }

  update_velocity_to_align(other_boids) {
    const { xvel_avg, yvel_avg } = this.get_avg_velocity_of_folk(other_boids);
    this.vx += (xvel_avg - this.vx) * this.matching_factor;
    this.vy += (yvel_avg - this.vy) * this.matching_factor;
  }

  // Cohesion relative to visible neighbors
  get_position_of_center_of_mass(other_boids) {
    // debug to see if it is correct
    let xpos_avg = this.x;
    let ypos_avg = this.y;
    let neighboring_boids = 1;
    other_boids.forEach((other_boid) => {
      if (this.is_in_visual_range(other_boid)) {
        xpos_avg += other_boid.x;
        ypos_avg += other_boid.y;
        neighboring_boids++;
      }
    });
    if (neighboring_boids) {
      xpos_avg /= neighboring_boids;
      ypos_avg /= neighboring_boids;
    }
    return { xpos_avg, ypos_avg };
  }

  update_velocity_for_cohesion(other_boids) {
    const { xpos_avg, ypos_avg } =
      this.get_position_of_center_of_mass(other_boids);
    this.vx += (xpos_avg - this.x) * this.centering_factor;
    this.vy += (ypos_avg - this.y) * this.centering_factor;
  }

  update_velocity_to_maintain_screen_edge(
  ) {
    debugger;
    if (this.x < this.left_margin) this.vx += this.turn_factor;
    if (this.x > this.right_margin) this.vx -= this.turn_factor;
    if (this.y > this.bottom_margin) this.vy -= this.turn_factor;
    if (this.y < this.top_margin) this.vy += this.turn_factor;
  }

  limit_boid_speed() {
    const speed = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
    if (speed > this.max_speed) {
      this.vx = (this.vx / speed) * this.max_speed;
      this.vy = (this.vy / speed) * this.max_speed;
    } else if (speed < this.min_speed) {
      this.vx = (this.vx / speed) * this.min_speed;
      this.vy = (this.vy / speed) * this.min_speed;
    }
  }

  update_velocity_to_bias_direction() {
    this.vx = (1 - Math.abs(this.bias_val))* this.vx + this.bias_val;
  }

  update_position() {
    const other_boids = this.get_all_other_boids();
    this.update_velocity_for_cohesion(other_boids);
    this.update_velocity_to_align(other_boids);
    this.update_velocity_to_avoid(other_boids);
    this.update_velocity_to_maintain_screen_edge();
    this.update_velocity_to_bias_direction()
    this.limit_boid_speed();
    debugger;
    this.x += this.vx;
    this.y += this.vy;
  }

  update_boid_graphis_position()
  {
    debugger;
    this.boid_graphics.x = this.x;
    this.boid_graphics.y = this.y;
  }

  get_all_other_boids() {
    return Boid.instances.filter(boid => boid !== this);
  }
}
