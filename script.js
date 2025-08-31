// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Handle image loading errors
  document.querySelectorAll('.car-image').forEach(img => {
    img.onerror = function() {
      // Hide the image
      this.style.display = 'none';
      // Show the fallback
      let fallback = this.parentElement.querySelector('.car-fallback');
      if (fallback) {
        fallback.style.display = 'flex';
      }
    };
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Contact Form Validation - Enhanced
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      nameError.textContent = '';
      emailError.textContent = '';
      subjectError.textContent = '';
      messageError.textContent = '';
      successMessage.classList.remove('show');

      // Name validation
      if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your name.';
        valid = false;
      } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters long.';
        valid = false;
      }

      // Email validation
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (emailInput.value.trim() === '') {
        emailError.textContent = 'Please enter your email.';
        valid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      }

      // Subject validation
      if (subjectInput.value === '') {
        subjectError.textContent = 'Please select a subject.';
        valid = false;
      }

      // Message validation
      if (messageInput.value.trim() === '') {
        messageError.textContent = 'Please enter your message.';
        valid = false;
      } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters long.';
        valid = false;
      }

      // Success handling
      if (valid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
          successMessage.textContent = 'Thank you for contacting us! We\'ll get back to you within 24 hours.';
          successMessage.classList.add('show');
          contactForm.reset();
          
          // Reset button
          btnText.textContent = originalText;
          submitBtn.disabled = false;
          
          // Auto-hide success message after 8 seconds
          setTimeout(() => {
            successMessage.classList.remove('show');
          }, 8000);
        }, 1500);
      }
    });

    // Real-time validation with better UX
    nameInput.addEventListener('input', function() {
      if (this.value.trim() !== '' && this.value.trim().length >= 2) {
        nameError.textContent = '';
        this.parentElement.style.borderColor = '#10b981';
      }
    });

    emailInput.addEventListener('input', function() {
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (emailPattern.test(this.value.trim())) {
        emailError.textContent = '';
        this.parentElement.style.borderColor = '#10b981';
      }
    });

    subjectInput.addEventListener('change', function() {
      if (this.value !== '') {
        subjectError.textContent = '';
      }
    });

    messageInput.addEventListener('input', function() {
      if (this.value.trim().length >= 10) {
        messageError.textContent = '';
        this.parentElement.style.borderColor = '#10b981';
      }
    });
  }

  // Add loading animation for buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      // Add subtle click effect
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Intersection Observer for animations (optional enhancement)
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe car cards for fade-in animation
    document.querySelectorAll('.car-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }
});