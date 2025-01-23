// Function to move pupils
function trackingEyes(event) {
  const isTouchEvent = event.touches !== undefined;
  const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;
  const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;

  document.querySelectorAll(".eye").forEach((eye) => {
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);

    const maxMovement = rect.width * 0.25; // 25% of the eye's radius
    const moveX = Math.cos(angle) * maxMovement;
    const moveY = Math.sin(angle) * maxMovement;

    const pupil = eye.querySelector(".pupil");
    pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// Debounce function for smoother touch movement
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// Function to reset pupils
function resetPupils() {
  document.querySelectorAll(".pupil").forEach((pupil) => {
    pupil.style.transform = "translate(0, 0)";
  });
}

// Add event listeners
window.addEventListener("mousemove", trackingEyes);
window.addEventListener("touchmove", debounce(trackingEyes, 10)); // Debounced touch move
window.addEventListener("touchend", resetPupils);
document.addEventListener("mouseleave", resetPupils);
