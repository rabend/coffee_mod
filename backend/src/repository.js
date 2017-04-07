const fs = require('fs');
const path = require('path');

module.exports = class Repository {
    constructor(database) {
        this.database = database;
        if (!fs.existsSync(database)) {
            fs.mkdirSync(database);
        }
    }

    saveUser(user) {
        const userFile = path.resolve(this.database, user.name);

        if (fs.existsSync(userFile)) {
            JSON.parse(fs.readFileSync(userFile));
            fs.unlinkSync(userFile);
        } else {
            user.beverageCount = 0;
        }

        const userData = JSON.stringify(user);
        fs.appendFileSync(userFile, userData);
    }

    getUser(userName) {
        const userFile = path.resolve(this.database, userName);
        const userData = fs.readFileSync(userFile);
        return JSON.parse(userData);
    }

    incrementBeverageCount(userName) {
        const userFile = path.resolve(this.database, userName);

        if (fs.existsSync(userFile)) {
            const persistedUser = JSON.parse(fs.readFileSync(userFile));
            persistedUser.beverageCount += 1;
            fs.unlinkSync(userFile);
            fs.appendFileSync(userFile, JSON.stringify(persistedUser));
        } else {
            throw new Error('user ' + userName + 'does not exist!');
        }
    }
}