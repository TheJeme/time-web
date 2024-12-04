document.addEventListener('DOMContentLoaded', () => {
  const timeNow = document.getElementById('time-now');
  const startInput = document.getElementById('diff-start');
  const endInput = document.getElementById('diff-end');
  const timeDiff = document.getElementById('time-diff');
  const timezoneStart = document.getElementById('timezone-start');
  const timezoneEnd = document.getElementById('timezone-end');
  const timezoneFrom = document.getElementById('timezone-from');
  const timezoneTo = document.getElementById('timezone-to');

  function updateTime() {
    timeNow.innerHTML = moment().format('LLLL');
  }

  function calculateDateDiff() {
    const startDate = new Date(startInput.value);
    const endDate = new Date(endInput.value);

    if (!isNaN(startDate) && !isNaN(endDate)) {
      timeDiff.innerHTML = `Difference: ${(endDate - startDate) / (1000 * 60 * 60 * 24)} days`;
    }
  }

  function calculateTimezoneDiff() {
    const time = timezoneStart.value;
    const fromZone = timezoneFrom.value;
    const toZone = timezoneTo.value;

    console.log(time, fromZone, toZone);
    if (!isNaN(new Date(time)) && fromZone && toZone) {
      timezoneEnd.innerHTML = moment.tz(time, "YYYY-MM-DDTHH:mm", fromZone).tz(toZone).format('LLLL');
    }
  }

  function populateTimezones() {
    const timezones = moment.tz.names();
    timezones.forEach(timezone => {
      const option1 = document.createElement('option');
      option1.value = timezone;
      option1.textContent = timezone;
      timezoneFrom.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = timezone;
      option2.textContent = timezone;
      timezoneTo.appendChild(option2);
    });
  }

  setInterval(updateTime, 250);
  updateTime();
  populateTimezones();

  startInput.addEventListener('change', calculateDateDiff);
  endInput.addEventListener('change', calculateDateDiff);
  timezoneStart.addEventListener('change', calculateTimezoneDiff);
  timezoneFrom.addEventListener('change', calculateTimezoneDiff);
  timezoneTo.addEventListener('change', calculateTimezoneDiff);
});