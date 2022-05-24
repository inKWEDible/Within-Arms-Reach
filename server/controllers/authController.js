const { google } = require('googleapis');
require('dotenv').config()

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
    const { code } = req.params;
    //Do we at this point still have res locals if we are redirected
    const { error } = req.params;
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
  res.locals.accessToken = res.locals.tokens.access_token;
  let unparsedIdToken = res.locals.tokens.id_token;
  unparsedIdToken = unparsedIdToken.split('.');
  // Decode Base-64
  res.locals.idToken = unparsedIDToken[1].atob();
  res.locals.userId = res.locals.idToken.user_id
  res.locals.email = res.locals.idToken.email
  return next();
}

authController.getUserInfo = async (req, res, next) => {
  try {
    const googleResponse = await axios({
      method: 'get',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: {
        Authorization: `Bearer ${res.locals.accessToken}`,
      }
    });
    const googleUser = googleResponse.data;
    res.locals.name = googleUser.name;
  }
  catch (error) {
    const returnError = Object.assign({log: `Error in getUserInfo middleware. ${error}`}, defaultAuthErr)
    return next(returnError);
  }
}


module.exports = authController;