/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

// Close mobile menu when a nav link is clicked
document.addEventListener('DOMContentLoaded', function () {
  const navMenu = document.getElementById("myNavMenu");
  const navLinks = navMenu.querySelectorAll('a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('responsive')) {
        navMenu.classList.remove('responsive');
      }
    });
  });
});

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () {
  headerShadow();
  scrollFunction();
};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";

  } else {

    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";

  }
}

// Scroll to Top Button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}



/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: ["Diseñador UX/UI", "Developer Front-End", "Gestor Multimedia"],
  loop: true,
  typeSpeed: 80,
  backSpeed: 40,
  backDelay: 2000
})


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
})

/* -- HOME -- */
sr.reveal('.featured-text-card', {})
sr.reveal('.featured-name', { delay: 100 })
sr.reveal('.featured-text-info', { delay: 200 })
sr.reveal('.featured-text-btn', { delay: 200 })
sr.reveal('.social_icons', { delay: 200 })
sr.reveal('.featured-image', { delay: 300 })


/* -- PROJECT BOX -- */
sr.reveal('.project-box', { interval: 200 })

/* -- HEADINGS -- */
sr.reveal('.top-header', {})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info', { delay: 100 })
srLeft.reveal('#contact', { delay: 100 })

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills', { delay: 100 })
srRight.reveal('.form-control', { delay: 100 })


/* -- FOOTER -- */
const srrLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srrLeft.reveal('.top-footer', { delay: 100 })
srrLeft.reveal('.footer-social-icons', { delay: 100 })
srrLeft.reveal('.bottom-footer', { delay: 100 })



/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

    } else {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

    }
  })
}

window.addEventListener('scroll', scrollActive)

/* ----- FILTERS PORTFOLIO ----- */

document.addEventListener('DOMContentLoaded', function () {
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const hiddenProjects = document.querySelectorAll('.hidden-project');
  const loadMoreBtn = document.querySelector('.load-more-btn');
  let projectsShown = false;

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Get filter value
      const filterValue = this.getAttribute('data-filter');

      // Reset hidden projects state when changing filter
      if (!projectsShown) {
        hiddenProjects.forEach(item => {
          item.classList.add('hidden-project');
        });
        loadMoreBtn.textContent = 'Ver más proyectos';
      }

      // Filter items
      portfolioItems.forEach(item => {
        // First handle visibility based on filter
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }

        // Then maintain hidden-project class for those that should be hidden
        if (item.classList.contains('hidden-project') && !projectsShown) {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Load more functionality
  loadMoreBtn.addEventListener('click', function () {
    if (!projectsShown) {
      // Show hidden projects
      hiddenProjects.forEach(item => {
        item.classList.remove('hidden-project');

        // Only unhide if it matches the current filter
        const currentFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        if (currentFilter === 'all' || item.getAttribute('data-category') === currentFilter) {
          item.classList.remove('hidden');
        }

        // Add animation to newly visible items
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100);
      });

      this.textContent = 'Ver menos proyectos';
      projectsShown = true;
    } else {
      // Hide projects again
      hiddenProjects.forEach(item => {
        item.classList.add('hidden-project');
        item.classList.add('hidden');
      });

      this.textContent = 'Ver más proyectos';
      projectsShown = false;

      // Scroll back to top of portfolio section
      document.querySelector('.portfolio-header').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Add animation on scroll
  const animateOnScroll = () => {
    const items = document.querySelectorAll('.portfolio-item');

    items.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (itemTop < windowHeight - 100) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize animation
  portfolioItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Call animation on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});


/* ----- EXPERIENCE TIMELINE ANIMATION ----- */
document.addEventListener('DOMContentLoaded', function () {
  const timelineItems = document.querySelectorAll('.timeline-item');

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  function showTimelineItems() {
    timelineItems.forEach(item => {
      if (isInViewport(item)) {
        item.classList.add('active');
      }
    });
  }

  // Initial check
  showTimelineItems();

  // Check on scroll
  window.addEventListener('scroll', showTimelineItems);

  // Animate contact section
  const contactSection = document.querySelector('.contact-info');

  function showContactSection() {
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect();
      if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0) {
        contactSection.classList.add('active');
      }
    }
  }

  // Initial check
  showContactSection();

  // Check on scroll
  window.addEventListener('scroll', showContactSection);
});
