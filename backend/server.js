const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function generatePrimes(count) {
  const primes = [];
  let num = 2;
  while (primes.length < count) {
    if (isPrime(num)) primes.push(num);
    num++;
  }
  return primes;
}

function generateFibonacci(count) {
  const fib = [0, 1];
  while (fib.length < count) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib.slice(0, count);
}

function generateEven(count) {
  const evens = [];
  for (let i = 0; evens.length < count; i += 2) {
    evens.push(i);
  }
  return evens;
}

function generateRandom(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(Math.floor(Math.random() * 100)); // 0 to 99
  }
  return arr;
}

app.post('/numbers', (req, res) => {
  const { type, count } = req.body;

  if (!['prime', 'fibonacci', 'even', 'random'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type specified.' });
  }

  const numberCount = parseInt(count) || 5;
  let result;

  switch (type) {
    case 'prime':
      result = generatePrimes(numberCount);
      break;
    case 'fibonacci':
      result = generateFibonacci(numberCount);
      break;
    case 'even':
      result = generateEven(numberCount);
      break;
    case 'random':
      result = generateRandom(numberCount);
      break;
  }

  res.json({ result });
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
