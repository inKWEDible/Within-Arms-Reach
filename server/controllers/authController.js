const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config()
const axios = require('axios')

const authController = {};
const defaultAuthErr = {
  status: 400,
  message: 'There was an error in the authentication process. Please try again later.'
}

authController.createClient = (req, res, next) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      process.env.OAUTH_REDIRECT_URL
    );
    res.locals.client = oauth2Client;
    return next()
  }
  catch (error) {
    const returnError = Object.assign({log: `Error in createClient middleware. ${error}`}, defaultAuthErr)
    return next(returnError);
  }
}

authController.getAuthUrl = (req, res, next) => {
  try {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];
    res.locals.oauth2URL = res.locals.client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes,
    });
    return next();
  }
  catch (error) {
    const returnError = Object.assign({log: `Error in getAuthUrl middleware. ${error}`}, defaultAuthErr)
    return next(returnError);
  }
}

authController.getToken = async (req, res, next) => {
  try {
    const { code } = req.query;
    const { error } = req.query;
    if (error) throw new Error(error);
    const { tokens } = await res.locals.client.getToken(code);
    res.locals.tokens = tokens;
    return next();
  } 
  catch (error) {
    const returnError = Object.assign({log: `Error in getToken middleware. ${error}`}, defaultAuthErr)
    return next(returnError);
  }
}

authController.parseToken = (req, res, next) => {
  try {
    res.locals.accessToken = res.locals.tokens.access_token;
    let unparsedIdToken = res.locals.tokens.id_token;
    unparsedIdToken = unparsedIdToken.split('.');
    // Decode Base-64
    res.locals.idToken = JSON.parse(atob(unparsedIdToken[1]));
    res.locals.userId = res.locals.idToken.sub;
    res.locals.email = res.locals.idToken.email;
    res.locals.name = res.locals.idToken.name;
    return next();
  }
  catch (error) {
    const returnError = Object.assign({log: `Error in parseToken middleware. ${error}`}, defaultAuthErr)
    return next(returnError);
  }
}

// Unnecessary Google API request that gets the same info present on the ID_Token

// authController.getUserInfo = async (req, res, next) => {
//   try {
//     const googleResponse = await axios({
//       method: 'get',
//       url: 'https://www.googleapis.com/oauth2/v3/userinfo',
//       headers: {
//         Authorization: `Bearer ${res.locals.accessToken}`,
//       }
//     });
//     const googleUser = googleResponse.data;
//     console.log('test', googleUser);
//     res.locals.name = googleUser.name;
//     return next();
//   }
//   catch (error) {
//     const returnError = Object.assign({log: `Error in getUserInfo middleware. ${error}`}, defaultAuthErr)
//     return next(returnError);
//   }
// }


authController.checkToken = async (req, res, next) => {
  try {
    const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: res.locals.tokens.id_token,
      audience: process.env.OAUTH_CLIENT_ID
    })
    const payload = ticket.getPayload();
    const userid = payload['sub']
    console.log(res.locals.idToken);
    // const tokenResponse = await axios({
    //   method: 'get',
    //   url: `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${res.locals.accessToken}`,
    //   // headers: {
    //   //   Authorization: `Bearer ${res.locals.accessToken}`,
    //   // }
    // });
    // const tokenInfo = googleResponse.data;
    // console.log('test', tokenInfo);
    return next();
  }
  catch (error) {
    const returnError = Object.assign({log: `Error in checkToken middleware. ${error}`}, defaultAuthErr)
    return next(returnError);
  }
}

authController.setCookie = (req, res, next) => {
  try {
    
  } 
  catch (error) {
    
  }
}

authController.grabCookie = (req, res, next) => {
  try {
    
  } 
  catch (error) {
    
  }
}

module.exports = authController;