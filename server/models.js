const { Pool } = require('pg');
require('dotenv').config();

const myURI = process.env.myURI;

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
//   id SERIAL NOT NULL PRIMARY KEY, 
//   name VARCHAR(255) NOT NULL, 
//   email VARCHAR(255) NOT NULL, 
//   password VARCHAR(255) NOT NULL
// );

// CREATE TABLE Items (
//     itemKey SERIAL NOT NULL PRIMARY KEY, 
//     name VARCHAR(255) NOT NULL,
//     desciption VARCHAR(255) NOT NULL, 
//     userId INT NOT NULL, 
//     available BOOLEAN NOT NULL, 
//     photo VARCHAR
//   ); 

// CREATE TABLE tradeRequests (
//     sender INT NOT NULL, 
//     recipient INT NOT NULL, 
//     itemId INT NOT NULL,
//     FOREIGN KEY (sender) REFERENCES userTable(id), 
//     FOREIGN KEY (recipient) REFERENCES userTable(id),
//     FOREIGN KEY (itemId) REFERENCES items(itemkey)
//     );


//postgres://qvsuuqss:4S1bIZiTux1pKXeTiScTwik1fDjNrUtH@fanny.db.elephantsql.com/qvsuuqss