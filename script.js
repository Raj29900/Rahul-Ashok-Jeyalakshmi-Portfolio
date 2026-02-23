// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');


navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});


// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


// Contact form -> open email client with filled content
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');


contactForm.addEventListener('submit', e => {
  e.preventDefault();


  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();


  if (!name || !email || !message) {
    formStatus.style.color = '#ff8080';
    formStatus.textContent = 'Please fill in all fields.';
    return;
  }


  formStatus.style.color = '#72e3a1';
  formStatus.textContent = 'Opening your email app…';


  const subject = encodeURIComponent(`Portfolio Contact – ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );


  // 👉 change this to your real email
  const mailTo = 'kprrahul2018@gmail.com';


  window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;


  contactForm.reset();
});

