document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  // Component loading
  const components = ['footer']; // Only keep components that exist
  
  components.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      fetch(`partials/${id}.html`)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch ${id}.html`);
          return res.text();
        })
        .then(html => element.innerHTML = html)
        .catch(err => console.warn(err.message));
    }
  });
});
// Add mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Rest of your existing component loading code...
});
document.addEventListener('DOMContentLoaded', () => {
  // Load components
  loadComponents();
});

function loadComponents() {
  const components = ['header', 'footer'];
  let loadedCount = 0;
  
  components.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      fetch(`partials/${id}.html`)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch ${id}.html`);
          return res.text();
        })
        .then(html => {
          element.innerHTML = html;
          loadedCount++;
          
          if (id === 'header') {
            setActiveNavLink();
            initializeMobileMenu();
          }
          
          // Initialize all functionality when all components are loaded
          if (loadedCount === components.length) {
            initializeAllFeatures();
          }
        })
        .catch(err => console.warn(`Error loading ${id}:`, err.message));
    }
  });
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  const pageMap = {
    'index': 'home',
    'about': 'about', 
    'services': 'services',
    'contacts': 'contact'
  };
  
  const activePage = pageMap[currentPage] || 'home';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  
  navLinks.forEach(link => {
    if (link.dataset.page === activePage) {
      link.classList.add('active');
    }
  });
}

function initializeMobileMenu() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.style.display = 'none';
      }
    });
    
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
      });
    });
  }
}

function initializeAllFeatures() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 120,
          behavior: 'smooth'
        });
      }
    });
  });
}