// Main Application Javascript for Guruprakash S Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
});

// Initialize Theme (Dark/Light mode)
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to dark theme as requested or if system preference is dark
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark');
  
  document.documentElement.setAttribute('data-theme', initialTheme);
}
