// Main Application Javascript for Guruprakash S Portfolio

function init() {
  console.log("Initializing portfolio scripts...");
  
  const steps = [
    { name: "Theme", fn: initTheme },
    { name: "ThemeToggle", fn: initThemeToggle },
    { name: "Typewriter", fn: initTypewriter },
    { name: "Canvas", fn: initCanvas },
    { name: "SkillsFilter", fn: initSkillsFilter },
    { name: "ProjectsFilter", fn: initProjectsFilter },
    { name: "ContactForm", fn: initContactForm },
    { name: "ScrollReveal", fn: initScrollReveal },
    { name: "ActiveNavScroll", fn: initActiveNavScroll },
    { name: "MobileMenu", fn: initMobileMenu }
  ];
  
  steps.forEach(step => {
    try {
      step.fn();
      console.log(`[Success] ${step.name} initialized.`);
    } catch (err) {
      console.error(`[Error] Failed to initialize ${step.name}:`, err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

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
  
  console.log(`[SkillsFilter] Found ${tabs.length} tabs and ${groups.length} groups.`);
  
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const category = tab.getAttribute('data-tab');
      console.log(`[SkillsFilter] Tab clicked: ${category}`, e);
      
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');
      
      groups.forEach(group => {
        const groupCat = group.getAttribute('data-category');
        if (category === 'all' || groupCat === category) {
          group.style.display = 'block';
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
  
  console.log(`[ProjectsFilter] Found ${filters.length} filters and ${cards.length} cards.`);
  
  filters.forEach(filter => {
    filter.addEventListener('click', (e) => {
      const filterValue = filter.getAttribute('data-filter');
      console.log(`[ProjectsFilter] Filter clicked: ${filterValue}`, e);
      
      // Remove active class
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      
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

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
  if (!form || !status) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Set status to sending
    status.textContent = 'Sending message...';
    status.className = 'form-status';
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;
    
    // Simulate successful form post
    setTimeout(() => {
      status.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
      status.className = 'form-status success';
      form.reset();
      
      // Clear message after 5 seconds
      setTimeout(() => {
        status.textContent = '';
        status.className = 'form-status';
      }, 5000);
    }, 1500);
  });
}

// Theme Toggle Functionality
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Scroll Reveal Animations
function initScrollReveal() {
  const revealItems = document.querySelectorAll('.reveal-item');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealItems.forEach(item => {
    revealObserver.observe(item);
  });
}

// Active Nav Link Highlighting on Scroll
function initActiveNavScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const activeCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  const activeObserver = new IntersectionObserver(activeCallback, {
    root: null,
    threshold: 0.5,
    rootMargin: '0px'
  });
  
  sections.forEach(section => {
    activeObserver.observe(section);
  });
}

// Mobile Menu Handler
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!mobileToggle || !navMenu) return;
  
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}




