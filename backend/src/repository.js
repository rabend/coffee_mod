const fs = require('fs');
const path = require('path');

module.exports = class Repository {
     constructor(database) {
         this.database = database;
     }

     saveUser(user) {
         const userFile = path.resolve(this.database, user.name);

         if (fs.existsSync(userFile)) {
             fs.unlinkSync(userFile);
         }

         const userData = JSON.stringify(user);
         fs.appendFile(userFile, userData);
     }

     getUser(username) {
         const userFile = path.resolve(this.database, username);
         const userData = fs.readFileSync(userFile);
         return JSON.parse(userData);
     }
}