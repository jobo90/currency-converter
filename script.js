const currency_one = document.getElementById('currency-one');
const amount_one = document.getElementById('amount-one');
const currency_two = document.getElementById('currency-two');
const amount_two = document.getElementById('amount-two');

const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
const calculate = () => {
  const currency_one_value = currency_one.value;
  const currency_two_value = currency_two.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one_value}`)
    .then((res) => res.json())
    .then((data) => {
      const rate_value = data.rates[currency_two_value];

      rate.innerText = `1 ${currency_one_value} = ${rate_value.toFixed(4)} ${currency_two_value}`;

      amount_two.value = (amount_one.value * rate_value).toFixed(2);
    });
};

// Event listeners
currency_one.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
currency_two.addEventListener('change', calculate);
amount_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  calculate();
})

calculate();