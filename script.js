const keys = document.querySelectorAll(".key");
const note = document.querySelector(".nowplaying");
const hints = document.querySelectorAll(".hints");

// Play the note corresponding to the key press or touch
function playNoteFromKeyCode(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    
    if (!key) return; // Exit if no corresponding key is found

    const keyNote = key.getAttribute("data-note");
    key.classList.add("playing");
    note.textContent = keyNote; // Update the displayed note

    if (audio) {
        audio.currentTime = 0; // Rewind to the start
        audio.play(); // Play the corresponding sound
    }
}

// Handle keyboard key press
function playNoteFromKeyboard(e) {
    const keyCode = e.keyCode || e.which; // Handle both keyCode and which
    playNoteFromKeyCode(keyCode);
}

// Handle touch on piano key
function playNoteFromTouch(e) {
    const keyCode = e.target.getAttribute("data-key"); // Get data-key attribute
    playNoteFromKeyCode(keyCode);
}

// Remove the 'playing' class after the transition ends
function removeTransition(e) {
    if (e.propertyName !== "transform") return; // Only listen for the transform property
    this.classList.remove("playing");
}

// Apply hint transition effects to each key
function applyHintTransition(e, index) {
    e.style.transitionDelay = `${index * 50}ms`; // Use template literal for cleaner code
}

// Attach event listeners for touch and keyboard
keys.forEach(key => {
    key.addEventListener("transitionend", removeTransition); // Remove transition after animation
    key.addEventListener("touchstart", playNoteFromTouch); // Add touch support for mobile
});

// Attach event listener for key presses
window.addEventListener("keydown", playNoteFromKeyboard);

// Apply hint effects
hints.forEach(applyHintTransition);



// Selecting all keys
const keys = document.querySelectorAll('.key');

// Function to play the audio associated with a key
function playSound(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio) return; // Stop the function if no audio element

    audio.currentTime = 0; // Rewind to the start
    audio.play();
    key.classList.add('playing');
}

// Remove 'playing' class after the animation
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

// Event listeners for each key
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);

    // Touch event listener
    key.addEventListener('touchstart', (e) => {
        e.preventDefault();  // Prevent default touch behavior
        const keyCode = key.getAttribute('data-key');
        playSound(keyCode);
    });
});

// Keydown event listener for keyboard support
window.addEventListener('keydown', (e) => {
    playSound(e.keyCode);
});
