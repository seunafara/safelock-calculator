// Get Difference between days
Date.daysBetween = function(date1, date2) {
  var one_day = 1000 * 60 * 60 * 24;
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  var difference_ms = date2_ms - date1_ms;
  return Math.round(difference_ms / one_day);
};

// Get 6 months from now
function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

// add 6 months to today
var y2k = addMonths(new Date(), +6);
var today = new Date();

// Get Month Names
var month = new Array();
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';
var name_of_month = month[y2k.getMonth()];

var savings_month =
  y2k.getDate() + ' ' + name_of_month + ' ' + y2k.getFullYear();

var saying = (document.getElementById(
  'savings-name'
).innerHTML = `How Much Will You Have By ${savings_month} If You Save With Us?🤔🚀`);

// init cal-again button
const cal_again = document.getElementById('cal-again');

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // hide calculator
  document.getElementById('loan-form').style.display = 'none';

  // Display try again button
  cal_again.removeAttribute('hidden');

  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Show Loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Listen For Calculate Again
cal_again.addEventListener('click', e => {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // show calculator
  document.getElementById('loan-form').style.display = 'block';

  e.preventDefault();
});

// Calculate results
function calculateResults() {
  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const futureValue = document.getElementById('future-value');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const fvInterest = parseFloat((principal * (interest.value / 100) * 1) / 364);
  const calculatedInterest = parseFloat(
    Date.daysBetween(today, y2k) * fvInterest
  );

  // Compute monthly payment
  const daily = principal + calculatedInterest;

  if (isFinite(daily)) {
    futureValue.value = daily.toFixed(2);
    // totalPayment.value = principal;
    totalInterest.value = calculatedInterest.toFixed(2);

    // Show Results
    document.getElementById('results').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please Check Your Numbers');
  }
}

// Show Error
function showError(error) {
  // Show Results
  document.getElementById('results').style.display = 'none';

  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // add class
  errorDiv.className = 'alert alert-danger';

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
