# 🎮 How to Add New Projects to Your Portfolio

This guide will show you how to add new projects to your pixel art portfolio **without touching any code**!

## 📁 Step 1: Add Your Images

1. **Create a new folder** in `public/portfolio/` with your project name
   - Example: `public/portfolio/my_new_project/`
   
2. **Add your images** to this folder
   - Supported formats: `.png`, `.jpg`, `.gif`
   - Keep filenames simple (no spaces, use underscores)
   - Example: `character_sprite.png`, `animation_walk.gif`

## ✏️ Step 2: Edit the Configuration File

1. **Open** `portfolio-config.json` in any text editor
2. **Find the "projects" section** (it's at the top)
3. **Add your new project** by copying and pasting this template:

```json
{
  "id": 3,
  "projectName": "Your Project Name",
  "projectDescription": "Brief description of your project",
  "projectColor": "primary",
  "items": [
    {
      "title": "YOUR ARTWORK TITLE",
      "category": "ANIMATION",
      "description": "Describe what this artwork shows or how it was made.",
      "imagePath": "your_project_folder/your_image.png",
      "tags": ["TAG1", "TAG2", "TAG3"]
    }
  ]
}
```

## 🎨 Step 3: Customize Your Project

### Project Settings:
- **id**: Use the next number (if you have 2 projects, use 3)
- **projectName**: The title that appears above your project section
- **projectDescription**: Subtitle that explains what the project is about
- **projectColor**: Choose from:
  - `"primary"` = Green theme
  - `"secondary"` = Orange theme  
  - `"accent"` = Purple theme

### Individual Artwork Settings:
- **title**: Name of your artwork (shows on the card)
- **category**: Choose from:
  - `"ANIMATION"` = Moving/animated pieces
  - `"CHARACTER"` = Character designs/sprites
  - `"OBJECTS"` = Items, weapons, props
  - `"UI"` = User interface elements
  - `"ENVIRONMENT"` = Backgrounds, landscapes
- **description**: Explain what the artwork shows
- **imagePath**: Path to your image file (folder_name/image_name.extension)
- **tags**: 1-3 keywords that describe your work

## 📝 Example: Adding a "Space Game" Project

1. **Create folder**: `public/portfolio/space_game/`
2. **Add images**: 
   - `spaceship.png`
   - `alien_walk.gif`
   - `laser_gun.png`

3. **Add to config file**:
```json
{
  "id": 3,
  "projectName": "Space Game",
  "projectDescription": "Sci-Fi Adventure Game Assets",
  "projectColor": "primary",
  "items": [
    {
      "title": "SPACESHIP DESIGN",
      "category": "OBJECTS",
      "description": "Player's main spaceship with detailed hull and engine effects.",
      "imagePath": "space_game/spaceship.png",
      "tags": ["SPACESHIP", "VEHICLE", "SCI-FI"]
    },
    {
      "title": "ALIEN WALK CYCLE",
      "category": "ANIMATION", 
      "description": "Smooth walking animation for alien enemy characters.",
      "imagePath": "space_game/alien_walk.gif",
      "tags": ["ALIEN", "ANIMATION", "ENEMY"]
    },
    {
      "title": "LASER WEAPON",
      "category": "OBJECTS",
      "description": "High-tech laser gun with glowing energy effects.",
      "imagePath": "space_game/laser_gun.png", 
      "tags": ["WEAPON", "LASER", "TECH"]
    }
  ]
}
```

## 🔧 Important Notes:

- **Always add a comma** after the `}` if you're adding a project in the middle
- **Don't add a comma** after the last project's `}`
- **Use quotes** around all text values
- **Check your commas** - missing or extra commas will break the site
- **Test your changes** by refreshing the website

## 🚨 Common Mistakes to Avoid:

❌ **Don't do this:**
```json
"imagePath": "my folder/my image.png"  // Spaces in path
"tags": [TAG1, TAG2]                   // Missing quotes
"projectColor": blue                   // Missing quotes
```

✅ **Do this instead:**
```json
"imagePath": "my_folder/my_image.png"  // Underscores instead of spaces
"tags": ["TAG1", "TAG2"]               // Quotes around each tag
"projectColor": "primary"              // Quotes around color
```

## 🆘 Need Help?

If something breaks:
1. **Check for missing commas** in your JSON
2. **Make sure all quotes match** (open and close)
3. **Verify image paths** are correct
4. **Copy the exact format** from existing projects

---

**That's it!** Your new projects will automatically appear on your portfolio website. No coding required! 🎉
