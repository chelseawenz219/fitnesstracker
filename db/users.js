//import client
const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;


//db command functions:
//have successfully debugged!!!! (-: 

//register user
async function createUser({ username, password }){
    const hashWord = bcrypt.hashSync(password, saltRounds);
    //hashing password before usage in function/storage to db.
    try{
        const {rows: [user]} = await client.query(`
        INSERT INTO users(username, password) VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username;
        `, [username, hashWord]);
        // [storing values to be accessed] //\\ ($1, $2) = accessing stored values
        return user;
    }catch (error){
        throw error;
    }
}

//login user 
async function getUser({ username, password }){
    //if no entries NOTHIN
    if (!username || !password){
        return;
    }
    try{
        console.log("username:", username);
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1;
        `, [username]);

        //if user doesn't exist ALSO NOTHIN
        if(!user){
            return;
        }

        //if password doesn't match MORE NOTHIN
        const matchingPassword = bcrypt.compareSync(password, user['password']);
        
        if(!matchingPassword){
            return;
        }
        //hide that password!
        delete password;
        return user;

    }catch (error){
        throw error;
    }
}

//last minute addition, to help complete-ness:
async function getUserById(userId) {
    // first get the user
    try {
      const {rows: [user]} = await client.query(`
        SELECT *
        FROM users
        WHERE id=$1;
      `, [userId]);

      delete user.password; 
      
      return user;  
    } catch (error) {
      console.error(error);
    }
  }


module.exports = {
    createUser,
    getUser,
    getUserById
}

