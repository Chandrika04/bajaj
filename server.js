const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const user_id = 'john_doe_17091999';
  const email = 'john@xyz.com';
  const roll_number = 'ABCD123';

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input' });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item) && /^[a-zA-Z]+$/.test(item));
  const highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop()] : [];

  res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
