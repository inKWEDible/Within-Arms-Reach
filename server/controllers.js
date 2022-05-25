const db = require('./models.js'); 
const controllers = {}; 

controllers.addUser = async (req, res, next) => {
    console.log('inside of addUser middleware'); 
    try {
        console.log(req.body); 
        const { name, email, password } = req.body; 
        const addUserQuery = `INSERT INTO UserTable (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, password;`
        const params = [name, email, password]; 
        const result = await db.query(addUserQuery, params); 
        console.log(result); 
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
    console.log(result);  
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
        const {name, description, userId, available, photo } = req.body; 
        const postItemQuery = `INSERT INTO items (name, description, userId, available, photo) VALUES ($1, $2, $3, $4, $5);`
        const params = [name, description, userId, available, photo]; 
        const result = await db.query(postItemQuery, params); 
        console.log(result); 
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


module.exports = controllers; 