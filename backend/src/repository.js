const fs = require('fs');
const path = require('path');

module.exports = class Repository {
     constructor(database) {
         this.database = database;
     }

     saveUser(user) {
         const userData = JSON.stringify(user);
         fs.appendFile(this.database, userData);
     }

     getUser(username) {
         const userFile = path.resolve(this.database, username);
         const userData = fs.readFileSync(userFile);
         return JSON.parse(userData);
     }
}