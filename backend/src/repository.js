const fs = require('fs');
const path = require('path');
const readdirp = require('readdirp');

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
            const persistedUser = JSON.parse(fs.readFileSync(userFile));

            if(persistedUser.tokenHash !== undefined) {
                user.tokenHash = persistedUser.tokenHash
            }

            if (persistedUser.beverageCount !== undefined) {
                user.beverageCount = persistedUser.beverageCount
            }

            fs.unlinkSync(userFile);
        } else {
            user.beverageCount = 0;
        }

        const userData = JSON.stringify(user);
        fs.appendFileSync(userFile, userData, (err) => {
            if (err) {
                console.log("Data could not be written to file", err);
            }
        });
    }

    getUser(userName) {
        const userFile = path.resolve(this.database, userName);
        const userData = fs.readFileSync(userFile);
        return JSON.parse(userData);
    }

    getUserByTokenHash(tokenHash) {
        const userFileNames = fs.readdirSync(this.database);
        
        for(let i = 0; i < userFileNames.length; i++) {
            const user = JSON.parse(fs.readFileSync(path.resolve(this.database, userFileNames[i])));
            if (user.tokenHash === tokenHash) {
                return user;
            }
        }

        throw new Error("No matching user data found!");
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