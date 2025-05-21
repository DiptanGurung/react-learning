// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neonPink: '#ff00ff',
        neonCyan: '#00ffff',
        neonPurple: '#8a2be2',
      },
      boxShadow: {
        'neon-pink': '0 0 8px #ff00ff, 0 0 20px #ff00ff',
        'neon-cyan': '0 0 8px #00ffff, 0 0 20px #00ffff',
      },
      animation: {
        flicker: 'flicker 3s infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
};
