document.addEventListener('DOMContentLoaded', () => {
  const timeNow = document.getElementById('time-now');
  const dateNow = document.getElementById('date-now');
  const dateFormatted = document.getElementById('date-formatted');
  const dateWeek = document.getElementById('date-week');
  const dateDayOfYear = document.getElementById('date-day-of-year');
  const dateQuarter = document.getElementById('date-quarter');
  const dateRemaining = document.getElementById('date-remaining');
  const startInput = document.getElementById('diff-start');
  const endInput = document.getElementById('diff-end');
  const timeDiff = document.getElementById('time-diff');
  const epochSeconds = document.getElementById('epoch-seconds');
  const epochDatetime = document.getElementById('epoch-datetime');
  const epochStatus = document.getElementById('epoch-status');
  const timezoneStart = document.getElementById('timezone-start');
  const timezoneEnd = document.getElementById('timezone-end');
  const timezoneFrom = document.getElementById('timezone-from');
  const timezoneTo = document.getElementById('timezone-to');

  function updateTime() {
    timeNow.textContent = `Local time: ${moment().format('LTS')}`;
  }

  function updateDateDetails() {
    const selectedDate = dateNow.value
      ? moment(dateNow.value, 'YYYY-MM-DD', true)
      : moment();

    const dayOfYear = selectedDate.dayOfYear();
    const daysInYear = selectedDate.isLeapYear() ? 366 : 365;
    const daysRemaining = daysInYear - dayOfYear;

    dateFormatted.textContent = selectedDate.format('dddd, MMMM D, YYYY');
    dateWeek.textContent = `${selectedDate.isoWeek()} of ${selectedDate.isoWeeksInYear()}`;
    dateDayOfYear.textContent = `${dayOfYear} / ${daysInYear}`;
    dateQuarter.textContent = `Q${selectedDate.quarter()}`;
    dateRemaining.textContent = `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'}`;
  }

  function calculateDateDiff() {
    const startDate = new Date(startInput.value);
    const endDate = new Date(endInput.value);

    if (!Number.isNaN(startDate) && !Number.isNaN(endDate)) {
      timeDiff.innerHTML = `Difference: ${(endDate - startDate) / (1000 * 60 * 60 * 24)} days`;
    }
  }

  function calculateTimezoneDiff() {
    const time = timezoneStart.value;
    const fromZone = timezoneFrom.value;
    const toZone = timezoneTo.value;

    if (!Number.isNaN(new Date(time)) && fromZone && toZone) {
      timezoneEnd.innerHTML = moment.tz(time, "YYYY-MM-DDTHH:mm", fromZone).tz(toZone).format('LLLL');
    }
  }

  function formatLocalDateTime(date) {
    const pad = value => String(value).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
      + `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  function epochToDateTime() {
    const seconds = Number(epochSeconds.value);
    const date = new Date(seconds * 1000);

    if (epochSeconds.value === '' || !Number.isFinite(seconds) || Number.isNaN(date.getTime())) {
      epochStatus.textContent = 'Enter a valid Unix epoch in seconds.';
      return;
    }

    epochDatetime.value = formatLocalDateTime(date);
    epochStatus.textContent = date.toISOString();
  }

  function dateTimeToEpoch() {
    const date = new Date(epochDatetime.value);

    if (epochDatetime.value === '' || Number.isNaN(date.getTime())) {
      epochStatus.textContent = 'Enter a valid local date and time.';
      return;
    }

    epochSeconds.value = Math.floor(date.getTime() / 1000);
    epochStatus.textContent = date.toISOString();
  }

  function initializeEpochConverter() {
    const now = new Date();
    epochSeconds.value = Math.floor(now.getTime() / 1000);
    epochDatetime.value = formatLocalDateTime(now);
    epochStatus.textContent = now.toISOString();
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
  updateDateDetails();
  populateTimezones();
  initializeEpochConverter();

  startInput.addEventListener('change', calculateDateDiff);
  endInput.addEventListener('change', calculateDateDiff);
  epochSeconds.addEventListener('input', epochToDateTime);
  epochDatetime.addEventListener('input', dateTimeToEpoch);
  timezoneStart.addEventListener('change', calculateTimezoneDiff);
  timezoneFrom.addEventListener('change', calculateTimezoneDiff);
  timezoneTo.addEventListener('change', calculateTimezoneDiff);
  dateNow.addEventListener('change', updateDateDetails);
});
