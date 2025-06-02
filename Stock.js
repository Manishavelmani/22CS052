// import React, { useState } from 'react';
// import axios from 'axios';

// const AverageCalculator = () => {
//   const [numbers, setNumbers] = useState('');
//   const [average, setAverage] = useState(null);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setNumbers(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const numArray = numbers.split(',').map(num => parseFloat(num.trim()));
//       if (numArray.some(isNaN)) {
//         setError('Please enter valid numbers separated by commas.');
//         return;
//       }

//       const response = await axios.post('http://localhost:5000/average', {
//         numbers: numArray
//       });
//       setAverage(response.data.average);
//     } catch (err) {
//       setError('Server error or invalid response.');
//     }
//   };

//   return (
//     <div>
//       <h2>Average Calculator</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter numbers (e.g. 1,2,3)"
//           value={numbers}
//           onChange={handleChange}
//         />
//         <button type="submit">Calculate Average</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {average !== null && <p>Average: {average}</p>}
//     </div>
//   );
// };

// export default AverageCalculator;

import React, { useState } from 'react';
import axios from 'axios';

const Calculator = () => {
  const [type, setType] = useState('prime');
  const [count, setCount] = useState(5);
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/numbers', {
        type,
        count
      });
      setResult(response.data.result);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch numbers.');
    }
  };

  return (
    <div>
      <h2>Number Calulator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="prime">Prime</option>
            <option value="fibonacci">Fibonacci</option>
            <option value="even">Even</option>
            <option value="random">Random</option>
          </select>
        </label>
        <br />
        <label>
          Count:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
          />
        </label>
        <br />
        <button type="submit">Generate</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result.length > 0 && (
        <p>Result: {result.join(', ')}</p>
      )}
    </div>
  );
};

export default Calculator;
