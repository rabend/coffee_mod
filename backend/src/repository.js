const fs = require('fs');
const path = require('path');

module.exports = class Repository {
    constructor(database) {
        this.database = database;
    }

    saveUser(user) {
        const userFile = path.resolve(this.database, user.name);

        if (fs.existsSync(userFile)) {
            let persistedData = JSON.parse(fs.readFileSync(userFile));
            user.beverageCount = persistedData.beverageCount + 1;
            fs.unlinkSync(userFile);
        } else {
            user.beverageCount = 1;
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