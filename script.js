const typedSpan = document.getElementById('typed');
const phrases = [
  'Educator. Mentor. Changemaker.',
  'Curriculum Designer. Programme Leader.',
  'Researcher. Community Builder.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 80;
const deletingSpeed = 40;
const pauseBetween = 2000;

function type() {
  const currentPhrase = phrases[phraseIndex];
  if (!isDeleting) {
    typedSpan.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, pauseBetween);
      return;
    }
  } else {
    typedSpan.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
      return;
    }
  }
  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
});
/* ---------- Formspree AJAX Submission ---------- */
const contactForm = document.querySelector('.contact-form');
const waitlistForm = document.querySelector('.waitlist-form');

async function handleSubmit(event, form, successElement) {
  event.preventDefault();
  const data = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      form.reset();
      successElement.style.display = 'block';
    } else {
      alert('Oops! Something went wrong. Please try again.');
    }
  } catch (error) {
    alert('Network error. Please check your connection and try again.');
  }
}

if (contactForm) {
  const successMsg = contactForm.querySelector('.form-success');
  contactForm.addEventListener('submit', (e) => handleSubmit(e, contactForm, successMsg));
}

if (waitlistForm) {
  // For waitlist, we don't have a dedicated success message; use a simple inline note
  waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(waitlistForm);
    try {
      const response = await fetch(waitlistForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        waitlistForm.innerHTML = '<p style="color:var(--mint);">You are on the list! Thank you.</p>';
      } else {
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  });
}