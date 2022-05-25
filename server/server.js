const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const port = 3000;
const controllers = require('./controllers');

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
  controllers.findGoogleUser,
  controllers.addGoogleuser,
  (req, res) => {
    // Need to update where we send after successful authentication
    return res.status(200).redirect('/')
  }
);

app.get('/users', controllers.getUsers, (req, res) => {
  res.status(200).json(res.locals.allUsers); 
})

app.get('/items', controllers.allItems, (req, res) => {
  res.status(200).json(res.locals.allItems); 

}); 

app.post('/', controllers.addUser, (req, res) => {
  console.log('user post request'); 
  res.status(201).json(res.locals.newUser); 
}); 

app.post('/items', controllers.addItem, (req, res) => {
  console.log('item post request'); 
  res.status(201).json(res.locals.addedItem); 
}); 

app.post('/trade', controllers.proposeTrade, (req, res) => {
  console.log('item trade proposal'); 
  res.status(201).json(res.locals.newTrade); 
});

app.patch('/items', controllers.acceptTrade, (req, res) => {
  console.log('item trade accepted'); 
  res.status(202).json(res.locals.traded); 
})


app.use((req, res) => res.status(404).send('Looks like you\'re doomed to code alone forever'));

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'error in middleware', 
    status: 500, 
    message: {err: 'Error'}
  }; 
  const errorObj = Object.assign({}, defaultError, err); 
  return res.status(errorObj.status).json(errorObj.message); 
})


app.listen(port, (req, res) => {
  console.log(`listening on ${port}`);
});