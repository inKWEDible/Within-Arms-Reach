const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const port = 3000;

const authController = require('./controllers/authController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.status(200).sendFile('./client/index.html');
});

app.get('/signup/googleOAuth', 
  authController.createClient,
  authController.getAuthUrl,
  (req, res) => {
    return res.redirect(res.locals.oauth2URL)
  }
);

app.get('/google/oauth',
  authController.createClient,
  authController.getToken,
  authController.parseToken,
  (req, res) => {
    return res.status(200).send();
  }
);

app.use('*', 
    (req, res) => {
        return res.status(404).send();
});

app.use((err, req, res, next) => {
  const defaultErr = {
      log: 'Express error handler caught unknown middleware error.',
      status: 400,
      message: { err: 'An error has occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(400).json(errorObj.message);
});

app.listen(port, (req, res) => {
  console.log(`listening on ${port}`);
});