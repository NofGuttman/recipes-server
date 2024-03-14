const express = require('express');
const bodyParser = require('body-parser');
const recipes = require('./routes/recipes');
const components = require('./routes/components');

const PORT = 8087;

const app = express();

app.use(bodyParser.json());

app.use('/recipes', recipes);
app.use('/components', components);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 1,
    message: 'Hello world'
  })
})

app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
})