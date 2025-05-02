# Pacman

i wanna to create web version of the game pacman, but in the contrast with the
original version pacman should be able to shoot after some eating.
each shoot should be treated as the catching creature "dies" and after some
delay it respawn. init memory bank for
that. to make so think over everything and let me know what questions ya have.
feel free to use MCPs provided and use modern tools.

Use icons from this lib <https://thenounproject.com/browse/icons/term/pac-man-ghost/> for ghosts and pacman.

Icons should be in the same scale and zoom as the maze in the main level.

You must ensure that character can move in the maze and shoot. Move only inside the maze, not over the walls.

Ghosts should be able to move in the maze on their own.

## Clarifications

  Core Requirements Clarification:

  1. Shooting Mechanics:
   • What triggers Pacman's ability to shoot? (Special pellet pickup, power-up
  duration, limited ammo?) - after picking certan amounts of dots, let's say 50 it get 1 ammo
   • Projectile behavior (speed, range, direction control) - let's say that ammo is 10x faster than the hero speed
   • Cooldown system between shots - 1 second for now.
   Limit ammos to 3

  2. Ghost Behavior:
   • Respawn mechanics (fixed delay? progressive difficulty?) both, but very gradually
   • Post-respawn behavior (vulnerability period? speed changes?), as in the original game, first few seconds it's
vulnerable, and this lower when dificultty increases. let the speed be the same

  3. Game State Management:
  • Score tracking for shooting vs eating - success shoot give extra 50 points. more points - more points gained
 with success shoot
  • Power-up state persistence - start with 0 shoots, and collect up to 3 ammos, ammos are thansferable between lvls
  • Ghost respawn timers - let's start with 10 secs, and then reduce with dificulty

  Architectural Questions:

  1. Tech Stack Preferences:
   • Canvas vs WebGL (Phaser.js vs PixiJS vs vanilla Canvas), webgl shounds good,
  but you need to make a research for the best choice. <think> what best for the game </think>
   • State management (Redux/Zustand vs custom solution) - ok with both
   • Should we use TypeScript for type-safe game entities? - yes, ts is preferable

  2. Multiplayer Considerations:
   • Will this support networked multiplayer eventually? maybe, but for now it's not the concern. it's about MVP
   • Need for client-side prediction? no

  3. Asset Pipeline:
   • Preferred animation approach (sprite sheets vs CSS animations) - both are ok, which is simpler for ya to make
   • Sound effect requirements - pick simplest options for now

  Next Step Questions:

  1. Should shooting consume regular pellets as "ammo" or be a separate power-
  up? - regullar palets, answered above
  2. Preferred ghost respawn pattern: Fixed locations or dynamic spawning? - as in the original game, fixed in the sandbox
  3. Priority for initial implementation: Core movement vs shooting mechanics? - core movement
