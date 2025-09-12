# 🎮 Pixel Art Portfolio

A stunning retro-themed portfolio website built with Next.js, perfect for showcasing pixel art and digital creations.

## ✨ Features

- **Retro Pixel Art Design**: Authentic 8-bit/16-bit aesthetic with pixel-perfect styling
- **Interactive Portfolio Gallery**: Showcase artwork with filtering and modal views
- **Animated Hero Section**: Eye-catching animations with pixel art character sprites
- **Contact Integration**: Easy-to-use contact form with email and Discord integration
- **Responsive Design**: Looks great on all devices and screen sizes
- **Performance Optimized**: Built with Next.js for fast loading and SEO
- **Modern Tech Stack**: TypeScript, Tailwind CSS, and Framer Motion

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom pixel art theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Press Start 2P (Google Fonts)

## 🎨 Design Features

- Custom pixel art animations and sprites
- Retro CRT screen effects with scanlines
- Glitch text effects
- Pixel-perfect hover states and transitions
- Authentic 8-bit color palette
- Nostalgic loading screens

## 📱 Sections

1. **Hero**: Animated welcome section with typewriter effects
2. **About**: Personal introduction with skills and stats
3. **Portfolio**: Interactive gallery with category filtering
4. **Contact**: Professional contact form with social links
5. **Footer**: Complete site navigation and social media links

## 🛠️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Customization

### Contact Information
Update the contact details in `src/components/Contact.tsx`:
```typescript
const email = 'your-email@example.com'
const discord = 'YourDiscord#1234'
```

### Portfolio Items
Add your artwork in `src/components/Portfolio.tsx` by updating the `portfolioItems` array.

### Personal Information
Modify the about section in `src/components/About.tsx` to reflect your experience and skills.

### Color Theme
Customize colors in `tailwind.config.ts`:
```typescript
colors: {
  'pixel-bg': '#0f0f23',
  'pixel-primary': '#00ff41',
  'pixel-secondary': '#ff6b35',
  // ... more colors
}
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎮 Perfect For

- Pixel artists and digital creators
- Game developers and indie studios
- Retro art enthusiasts
- Anyone wanting a unique, nostalgic portfolio

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ and lots of pixels!**
