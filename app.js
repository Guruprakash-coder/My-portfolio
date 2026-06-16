// Main Application Javascript for Guruprakash S Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initCanvas();
  initSkillsFilter();
  initProjectsFilter();
});

// Initialize Theme (Dark/Light mode)
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to dark theme as requested
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark');
  
  document.documentElement.setAttribute('data-theme', initialTheme);
}

// Typewriter Effect
function initTypewriter() {
  const words = ["Aspiring Software & AI Engineer", "Full-Stack Developer", "Problem Solver"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const target = document.getElementById('typewriter');
  
  if (!target) return;
  
  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1500; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// Canvas Constellation Particle Background
function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  window.addEventListener('resize', () => {
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
  });
  
  const particles = [];
  const particleCount = Math.min(60, Math.floor((width * height) / 18000));
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      
      const theme = document.documentElement.getAttribute('data-theme');
      ctx.fillStyle = theme === 'dark' ? 'rgba(0, 180, 230, 0.4)' : 'rgba(157, 51, 255, 0.2)';
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    const theme = document.documentElement.getAttribute('data-theme');
    const strokeColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Skills Section Filter
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab');
  const groups = document.querySelectorAll('.skill-card-group');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');
      
      const category = tab.getAttribute('data-tab');
      
      groups.forEach(group => {
        if (category === 'all' || group.getAttribute('data-category') === category) {
          group.style.display = 'block';
          // Trigger slight fade-in trigger animation
          setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
          }, 50);
        } else {
          group.style.opacity = '0';
          group.style.transform = 'translateY(10px)';
          setTimeout(() => {
            group.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Projects Section Filter
function initProjectsFilter() {
  const filters = document.querySelectorAll('.project-filter');
  const cards = document.querySelectorAll('.project-card');
  
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Remove active class
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      
      const filterValue = filter.getAttribute('data-filter');
      
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}


