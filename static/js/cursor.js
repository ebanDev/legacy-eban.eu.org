const cursor = document.querySelector('.cursor');

const moveCursor = (e)=> {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
}

window.addEventListener('mousemove', moveCursor)

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }  

function updateClickables() {
    const clickables = document.querySelectorAll("a, .clickable, #navArrows svg:not(.disabled)")

    for (el of clickables) {
      el.addEventListener('mouseover', (event) => {
        cursor.classList.add("onHover")
      });
    
      el.addEventListener('mouseout', (event) => {
        cursor.style.width = "50px"
        cursor.style.height = "50px"
        cursor.classList.remove("onHover")
      });
    }
}