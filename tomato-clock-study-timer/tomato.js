
function updateClock() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById('current-time').textContent = formattedTime;
};

setInterval(updateClock, 1000);

// function startCountdown(duration) {
//     let timer = duration;
//     setInterval(function () {
//         const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
//         const seconds = (timer % 60).toString().padStart(2, '0');
//         const formattedTime = `${minutes}:${seconds}`;
//         document.getElementById('clock').textContent = formattedTime;

//         if (--timer < 0) {
//             clearInterval(timer);
//             // Timer has ended, perform any necessary actions here
//         }
//     }, 1000);
// }

// const countdownDuration = 60; // Set the countdown duration in seconds
// startCountdown(countdownDuration);




let intervalId;
let remainingTime;
let isPaused = false;
let streakCount = 0;

function displayStreak() {
    if (streakCount > 0) {
        document.getElementById('StartStudyPrompt').style.display = "none";
        document.getElementById('ContinueStudyPrompt').style.display = "block";
        document.getElementById('streakCount').innerHTML = streakCount;
    }
}

// Function to update the clock display
function updateClockDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('clock').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('slider').addEventListener('input', function() {
    const sliderValue = this.value; // Get the current value of the slider
    document.querySelector('.sliderText span').textContent = sliderValue; // Update the span text with the slider value
});

// Start button functionality
document.getElementById('start').addEventListener('click', function() {
    if (isPaused) {
        isPaused = false;
        startCountdown(remainingTime); // Resume the countdown
    } else {
        remainingTime = parseInt(document.getElementById('slider').value) * 60; // Convert minutes to seconds
        startCountdown(remainingTime);
    }
});

// Pause button functionality
document.getElementById('pause').addEventListener('click', function() {
    if (intervalId) {
        clearInterval(intervalId);
        if(isPaused == false) {
            isPaused = true;
            document.getElementById('pause').innerHTML = "Resume";
        }
        else {
            isPaused = false;
            document.getElementById('pause').innerHTML = "Pause";
            startCountdown(remainingTime);
        }
    }
});

// Reset button functionality
document.getElementById('reset').addEventListener('click', function() {
    remainingTime = 0;
    updateClockDisplay(remainingTime);
    isPaused = false;
    clearInterval(intervalId);
});

// Countdown function
function startCountdown(time) {
    updateClockDisplay(time);
    intervalId = setInterval(function() {
        if (time <= 0) {
            streakCount++;
            clearInterval(intervalId);
            displayStreak();
        } else {
            time--;
            remainingTime = time; // Store the remaining time
            updateClockDisplay(time);
        }
    }, 1000);
}