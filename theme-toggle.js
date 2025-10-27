// Global Theme Toggle System
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    this.createToggleButton();
    this.loadSavedTheme();
    this.addGlobalStyles();
  }

  createToggleButton() {
    if (document.getElementById('global-theme-toggle')) return;
    
    const button = document.createElement('button');
    button.id = 'global-theme-toggle';
    button.className = 'theme-toggle';
    button.innerHTML = '<i class="fas fa-sun" id="theme-icon"></i>';
    button.title = 'Toggle Dark/Light Mode';
    button.onclick = () => this.toggleTheme();
    
    document.body.appendChild(button);
  }

  addGlobalStyles() {
    if (document.getElementById('global-theme-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'global-theme-styles';
    style.textContent = `
      .theme-toggle {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1000;
        background: #00d4ff;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
      }
      
      .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
      }
      
      body.light-mode {
        background: #f8fafc !important;
        color: #1e293b !important;
      }
      
      body.light-mode .theme-toggle {
        background: #1e293b;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }
      
      body.light-mode .header-container {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
      }
      
      body.light-mode .nav-link {
        color: #1e293b !important;
      }
      
      body.light-mode .logo-text {
        color: #1e293b !important;
      }
      
      body.light-mode .cta-button {
        background: linear-gradient(45deg, #1e293b, #475569) !important;
      }
    `;
    
    document.head.appendChild(style);
  }

  toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
      icon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    } else {
      icon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    }
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('theme-icon');
    
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      if (icon) icon.className = 'fas fa-moon';
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ThemeManager());
} else {
  new ThemeManager();
}