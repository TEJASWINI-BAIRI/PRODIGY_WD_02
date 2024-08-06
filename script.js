let startTime, updatedTime, difference, tInterval, running = false;

const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

const hoursProgress = document.getElementById('hours-progress');
const minutesProgress = document.getElementById('minutes-progress');
const secondsProgress = document.getElementById('seconds-progress');
const millisecondsProgress = document.getElementById('milliseconds-progress');

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10); // Reduced interval to speed up time display
        running = true;
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    displayHours.innerHTML = '00<span>Hours</span>';
    displayMinutes.innerHTML = '00<span>Minutes</span>';
    displaySeconds.innerHTML = '00<span>Seconds</span>';
    displayMilliseconds.innerHTML = '00<span>Milliseconds</span>';
    hoursProgress.style.strokeDashoffset = 440;
    minutesProgress.style.strokeDashoffset = 440;
    secondsProgress.style.strokeDashoffset = 440;
    millisecondsProgress.style.strokeDashoffset = 440;
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    displayHours.innerHTML = (hours > 9 ? hours : '0' + hours) + '<span>Hours</span>';
    displayMinutes.innerHTML = (minutes > 9 ? minutes : '0' + minutes) + '<span>Minutes</span>';
    displaySeconds.innerHTML = (seconds > 9 ? seconds : '0' + seconds) + '<span>Seconds</span>';
    displayMilliseconds.innerHTML = (milliseconds > 9 ? milliseconds : '0' + milliseconds) + '<span>Milliseconds</span>';

    hoursProgress.style.strokeDashoffset = 440 - (440 * hours) / 24;
    minutesProgress.style.strokeDashoffset = 440 - (440 * minutes) / 60;
    secondsProgress.style.strokeDashoffset = 440 - (440 * seconds) / 60;
    millisecondsProgress.style.strokeDashoffset = 440 - (440 * milliseconds) / 100;
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);