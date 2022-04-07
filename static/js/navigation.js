function nextPage() {
  for (var section = 0; section < document.querySelectorAll("section").length - 1; section++) {
    sectionY = document.querySelectorAll("section")[section].getBoundingClientRect().y
    nextSectionY = document.querySelectorAll("section")[parseInt(section) + 1].getBoundingClientRect().y
    if (Math.abs(sectionY) < Math.abs(nextSectionY)) {
      window.scrollTo(0, document.querySelectorAll("section")[parseInt(section) + 1].offsetTop)
      break;
    }
  }
}

function prevPage() {
  for (var section = document.querySelectorAll("section").length - 1; section > 0; section--) {
    sectionY = document.querySelectorAll("section")[section].getBoundingClientRect().y
    prevSectionY = document.querySelectorAll("section")[parseInt(section) - 1].getBoundingClientRect().y
    if (Math.abs(sectionY) < Math.abs(prevSectionY)) {
      window.scrollTo(0, document.querySelectorAll("section")[parseInt(section) - 1].offsetTop)
      break;
    }
  }
}

const aboutSection = document.querySelector('#about .textContent h1');
function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      document.querySelector("#navArrows svg:nth-child(1)").classList.add('disabled')
    } else {
      document.querySelector("#navArrows svg:nth-child(1)").classList.remove('disabled')
    }
  });
}

const aboutSectionIntersection = new IntersectionObserver(handleIntersection);
aboutSectionIntersection.observe(aboutSection);

const contactSection = document.querySelector('#contact .contactBubble:nth-child(5)');
function handleIntersectionContact(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      document.querySelector("#navArrows svg:nth-child(2)").classList.add('disabled')
    } else {
      document.querySelector("#navArrows svg:nth-child(2)").classList.remove('disabled')
    }
  });
}

const contactSectionIntersection = new IntersectionObserver(handleIntersectionContact);
contactSectionIntersection.observe(contactSection);
