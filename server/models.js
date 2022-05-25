const { Pool } = require('pg'); 
require('dotenv').config(); 

const myURI = 'postgres://qvsuuqss:4S1bIZiTux1pKXeTiScTwik1fDjNrUtH@fanny.db.elephantsql.com/qvsuuqss'; 


const pool = new Pool ({
    connectionString: myURI
}); 


module.exports = {
    query: (text, params, callback) => {
        console.log('executed query: ' + text); 
        return pool.query(text, params, callback)
    }
}; 


// CREATE TABLE UserTable (
//   id VARCHAR NOT NULL UNIQUE, 
//   name VARCHAR NOT NULL, 
//   email VARCHAR NOT NULL, 
//   password VARCHAR
// );

// CREATE TABLE Items (
//     itemKey SERIAL NOT NULL PRIMARY KEY, 
//     name VARCHAR(255) NOT NULL,
//     description VARCHAR(255) NOT NULL, 
//     userId VARCHAR NOT NULL, 
//     available BOOLEAN NOT NULL, 
//     photo VARCHAR, 
//     FOREIGN KEY (userId) REFERENCES userTable(id)
//   ); 

// CREATE TABLE tradeRequests (
//     sender VARCHAR NOT NULL, 
//     recipient VARCHAR NOT NULL, 
//     itemId INT NOT NULL,
//     FOREIGN KEY (sender) REFERENCES userTable(id), 
//     FOREIGN KEY (recipient) REFERENCES userTable(id),
//     FOREIGN KEY (itemId) REFERENCES items(itemkey)
//     );


//postgres://qvsuuqss:4S1bIZiTux1pKXeTiScTwik1fDjNrUtH@fanny.db.elephantsql.com/qvsuuqss