
const ANIMATION_SPEED = 4;
const END_NUMBER = 5000;

function increaseNumberAnimationStep(i, element, endNumber) {
  if (i <= endNumber) {
      if (i === endNumber) {
        element.innerText = i + '+';
      } else {
        element.innerText = i;
      }
  
      i++;
      setTimeout(increaseNumberAnimationStep, ANIMATION_SPEED, i, element, endNumber)
  }
}

function initIncreaseNumberAnimation() {
    let elem = document.querySelector(".features__clients-count");
    increaseNumberAnimationStep(0, elem, END_NUMBER)
}
  
initIncreaseNumberAnimation()

let items = document.querySelectorAll(".item");
 
let index = 0;
setInterval(function() {
  items[index]?.classList.add("active");
  for (let i = 0; i < items.length; i++) {
    if (i !== index) {
      items[i].classList.contains("active") &&
        items[i].classList.remove("active");
    }
  }
  index++;
  if (index === items.length) {
    index = 0;
  }
}, 2000);
