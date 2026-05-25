"use strict";

var typedSpan = document.getElementById('typed');
var phrases = ['Educator. Mentor. Changemaker.', 'Curriculum Designer. Programme Leader.', 'Researcher. Community Builder.'];
var phraseIndex = 0;
var charIndex = 0;
var isDeleting = false;
var typingSpeed = 80;
var deletingSpeed = 40;
var pauseBetween = 2000;

function type() {
  var currentPhrase = phrases[phraseIndex];

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

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(type, 1000);
});
/* ---------- Formspree AJAX Submission ---------- */

var contactForm = document.querySelector('.contact-form');
var waitlistForm = document.querySelector('.waitlist-form');

function handleSubmit(event, form, successElement) {
  var data, response;
  return regeneratorRuntime.async(function handleSubmit$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          data = new FormData(form);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
              'Accept': 'application/json'
            }
          }));

        case 5:
          response = _context.sent;

          if (response.ok) {
            form.reset();
            successElement.style.display = 'block';
          } else {
            alert('Oops! Something went wrong. Please try again.');
          }

          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          alert('Network error. Please check your connection and try again.');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}

if (contactForm) {
  var successMsg = contactForm.querySelector('.form-success');
  contactForm.addEventListener('submit', function (e) {
    return handleSubmit(e, contactForm, successMsg);
  });
}

if (waitlistForm) {
  // For waitlist, we don't have a dedicated success message; use a simple inline note
  waitlistForm.addEventListener('submit', function _callee(e) {
    var data, response;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            e.preventDefault();
            data = new FormData(waitlistForm);
            _context2.prev = 2;
            _context2.next = 5;
            return regeneratorRuntime.awrap(fetch(waitlistForm.action, {
              method: 'POST',
              body: data,
              headers: {
                'Accept': 'application/json'
              }
            }));

          case 5:
            response = _context2.sent;

            if (response.ok) {
              waitlistForm.innerHTML = '<p style="color:var(--mint);">You are on the list! Thank you.</p>';
            } else {
              alert('Oops! Something went wrong. Please try again.');
            }

            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            alert('Network error. Please try again.');

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 9]]);
  });
}
//# sourceMappingURL=script.dev.js.map
