const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 7653;

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: 'org-AHIUE2oiagZjyIJy3wE6HAsC',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/models', async (req, res) => {
  try {
    const response = await openai.listModels();
    //console.log('response', response.data.data);
    res.json(response.data.data);
  } catch (error) {
    console.log('error from get models request', error);
  }
});

app.post('/', async (req, res) => {
  const { message, currentModel } = req.body;
  console.log('hello from post request');
  console.log('body.message', message);
  console.log('body.currentModel', currentModel);

  try {
    const response = await openai.createCompletion({
      model: `${currentModel}`, //'text-davinci-003'
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });
    console.log('from post 2', response.data.choices);
    res.json({
      message: response.data.choices[0].text,
    });
  } catch (error) {
    console.log('error from post request', error);
  }
});

app.listen(port, () => {
  console.log('Server started on port 3221');
});
