const db = require('./models.js'); 
const controllers = {}; 


// ***** Add UUID instead of auto increment so that we can add Google user ids
// ***** We should add a check that email is unique. name maybe not

controllers.getUsers = async (req, res, next) => {
    try {
        const getUsersQuery = 'SELECT * FROM UserTable'; 
        const result = await db.query(getUsersQuery); 
        res.locals.allUsers = result.rows; 
        return next(); 
    } catch (error) {
        const err = {
            log: 'error in controller.getUsers middleware function', 
            status: 500, 
            message: {error: 'there was a problem getting users'}
        }; 
        return next(err); 
    }
}

controllers.addUser = async (req, res, next) => {
    console.log('inside of addUser middleware'); 
    try {
        console.log(req.body); 
        const { id, name, email, password } = req.body; 
        const addUserQuery = `INSERT INTO UserTable (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, password;`
        const params = [id, name, email, password]; 
        const result = await db.query(addUserQuery, params); 
        res.locals.newUser = result; 
        return next(); 
    } catch (error) {
        const err = {
            log: 'error in controller.addUser middleware function', 
            status: 500, 
            message: {error: 'there was a problem while creating a new user'}
        }; 
        return next(err); 
    };
};

controllers.findGoogleUser = async (req, res, next) => {
    try {
        const query = `SELECT id FROM UserTable WHERE id = $1;`;
        const params = [res.locals.userId]
        const findGoogleUserQuery = await db.query(query, params);
        if (findGoogleUserQuery.rows.length > 0) {
            res.locals.userExists = true;
        }
        return next();
    } 
    catch (error) {
        const returnError = {
            log: `Error in findGoogleUser middleware. ${error}`, 
        }
        return next(returnError);    
    }
}

controllers.addGoogleuser = async (req, res, next) => {
    try {
        if (res.locals.userExists === true) return next()
        const query = `INSERT INTO UserTable (id, name, email) VALUES ($1, $2, $3) RETURNING id, name, email;`;
        const params = [res.locals.userId, res.locals.name, res.locals.email];
        const result = await db.query(query, params); 
        res.locals.newUser = result; 
        return next(); 
    } 
    catch (error) {
        const returnError = {
            log: `Error in addGoogleUser middleware. ${error}`, 
        }
        return next(returnError);    
    }
}

controllers.deleteUser = async (req, res, next) => {
    console.log('inside of deleteUser middleware'); 
    try {
        const { id } = req.body; 
        const deleteUserQuery = 'DELETE FROM UserTable WHERE id = $1'; 
        const params = [id]; 
        const result = await db.query(deleteUserQuery, params); 
        res.locals.deletedUser = result.rows; 
        return next(); 
    } catch (error) { 
        const err = {
            log: 'error in controller.deleteUser middleware function', 
            status: 500, 
            message: {error: 'there was a problem deleting this user'}
        }; 
        return next(err); 
    };
};

controllers.allItems = async (req, res, next) => {
  try {
    const allItemsQuery = 'SELECT itemKey, name, description, userID, photo FROM items WHERE available = true;'
    const result = await db.query(allItemsQuery);
    res.locals.allItems = result.rows; 
    return next(); 
  } catch (error) {
        const err = {
            log: 'error in controller.allItems middleware function', 
            status: 500, 
            message: {error: 'there was a problem while retrieving items'}
        };
    return next(err); 
  };
}; 

controllers.addItem = async (req, res, next) => {
    try {
        const {name, description, available, photo } = req.body; 
        const userId = res.locals.userId;
        const postItemQuery = `INSERT INTO items (name, description, userId, available, photo) VALUES ($1, $2, $3, $4, $5);`
        const params = [name, description, userId, available, photo]; 
        const result = await db.query(postItemQuery, params); 
        res.locals.addedItem = result; 
        return next(); 
    } catch (error) {
        const err = {
            log: 'error in controller.postItem middleware function', 
            status: 500, 
            message: {error: 'there was a problem adding this item'}
        };
      return next(err); 
    };
};

controllers.proposeTrade = async (req, res, next) => {
    try{
        const { sender, recipient, itemKey } = req.body; 
        const proposeTradeQuery = 'INSERT INTO tradeRequests (sender, recipient, itemKey) VALUES ($1, $2, $3)'; 
        const params = [sender, recipient, itemKey]; 
        const result = await db.query(proposeTradeQuery, params); 
        res.locals.newTrade = result.rows; 
        return next(); 
    }  catch (error) {
        const err = {
            log: 'error in controller.proposeTrade middleware function', 
            status: 500, 
            message: {error: 'there was a problem proposing this trade'}
        };
      return next(err); 
    };
}; 

controllers.acceptTrade = async (req, res, next) => {
    try {
        const { sender, recipient, itemKey } = req.body; 
        const acceptTradeQuery = 'UPDATE items SET userId = $1 WHERE itemKey = $2;'
        const params = [sender, itemKey]; 
        const result = await db.query(acceptTradeQuery, params); 
        res.locals.traded = result.rows; 
        return next(); 
    } catch (error) {
        const err = {
            log: 'error in controller.acceptTrade middleware function', 
            status: 500, 
            message: {error: 'there was a problem accepting this trade'}
        }; 
      return next(err); 
    }; 
}; 

controllers.getIncomingTrades = async (req, res, next) => {
    try{
        const { recipient } = req.body; 
        const incomingTradesQuery = 'SELECT * FROM tradeRequests WHERE recipient = $1;'; 
        const params = [ recipient ]; 
        const result = db.query(incomingTradesQuery, params); 
        res.locals.incoming = result.rows; 
        return next(); 
    } catch (error) {
        const err = {
            log: 'error in controller.getIncomingTrades middleware function', 
            status: 500, 
            message: {error: 'there was a problem getting incoming trades'}
        }; 
      return next(err); 
    };
}; 


module.exports = controllers; 