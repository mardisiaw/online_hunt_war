document.addEventListener('DOMContentLoaded', function() {
  const setTimeButton = document.getElementById('setTimeButton');
  setTimeButton.addEventListener('click', setTime);

  // Retrieve the target time from storage and update the popup
  chrome.storage.sync.get('targetTime', function(data) {
    const targetTime = data.targetTime;
    if (targetTime) {
      const targetTimeElement = document.getElementById('targetTime');
      targetTimeElement.textContent = targetTime;
    }
  });
});

function getTimeInMilliseconds(time) {
  const currentTime = new Date();
  const targetTime = new Date(currentTime.toDateString());

  const timeParts = time.split(':');
  targetTime.setHours(timeParts[0]);
  targetTime.setMinutes(timeParts[1]);
  targetTime.setSeconds(timeParts[2]);
  targetTime.setMilliseconds(timeParts[3]);

  return targetTime.getTime();
}

function setTime() {
  const hours = document.getElementById('hours').value;
  const minutes = document.getElementById('minutes').value;
  const seconds = document.getElementById('seconds').value;
  const milliseconds = document.getElementById('milliseconds').value;

  const targetTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;

  chrome.storage.sync.set({ targetTime: targetTime }, function() {
    console.log('Target time set:', targetTime);

    // Update the target time element in the popup
    const targetTimeElement = document.getElementById('targetTime');
    targetTimeElement.textContent = targetTime;
  });

  chrome.alarms.clearAll(function() {
    chrome.alarms.create('pageLoadAlarm', { when: getTimeInMilliseconds(targetTime) });
  });
}