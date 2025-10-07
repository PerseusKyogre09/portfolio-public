# Game Sprites

This directory contains the sprite assets for the portfolio game. All sprites should be in PNG format with a transparent background.

## Required Sprites

### Player Sprite (`player.png`)

- **Size**: 128×32 pixels (4 frames × 32×32 each)
- **Frames**: 4 walking animation frames
- **Style**: Pixel art character facing right
- **Usage**: Main player character with walking animation

### Certificate Frame (`certificate.png`)

- **Size**: 64×32 pixels
- **Style**: Picture frame or certificate display
- **Usage**: Interactive object for certificates section

### Computer Desk (`computer.png`)

- **Size**: 64×32 pixels
- **Style**: Desk with computer/monitor
- **Usage**: Interactive object for projects section

### Bookshelf (`bookshelf.png`)

- **Size**: 32×64 pixels
- **Style**: Bookshelf with books
- **Usage**: Interactive object for skills/education section

## Sprite Creation Tips

1. **Use pixel art style** to match the game aesthetic
2. **Keep consistent color palette** (dark theme friendly)
3. **Use transparent backgrounds** (PNG format)
4. **Test in game** - sprites should look good at game scale

## Tools for Creating Sprites

- **Free**: Piskel, GIMP, Aseprite (free version available)
- **Paid**: Aseprite, Photoshop with pixel art brushes
- **Online**: Pixilart, Lospec Pixel Editor

## Current Fallback

The game includes fallback colored rectangles if sprites aren't loaded, so it's functional even without custom sprites.

## Adding New Sprites

1. Create your sprite following the size specifications
2. Save as PNG with transparency
3. Place in this `sprites/` directory
4. The game will automatically load and use them

## Example Sprite Layout

For animated sprites like the player:

```
Frame 1    Frame 2    Frame 3    Frame 4
[32x32]    [32x32]    [32x32]    [32x32]
```

The Sprite class automatically handles animation by cycling through frames.