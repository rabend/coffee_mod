const assert = require('assert');
const Repository = require('../src/repository.js');
const fs = require('fs');
const path = require('path');
const rmrf = require('rimraf');

const rootFolder = path.resolve(__dirname, '../../');
const database = path.resolve(rootFolder, 'coffee_users');

describe("The Repository", () => {
        beforeEach((done) => {
            fs.access(database, (err) => {
                if(err) {
                    console.log("database folder did not exist");
                }
                rmrf(database, () => {
                    done();
                });
            });
        });

        it("should create a folder 'coffee_users' upon instantiation", () => {
            assert.equal(false, fs.existsSync(database));
            const repo = new Repository(database);
            assert.equal(true, fs.existsSync(database));
        });

        it("should save user data without throwing an error", () => {
            const user = {
                name: "test",
                selectedCoffee: 100,
                selectedMilk: 20,
                selectedStrength:5
            };

            const repo = new Repository(database);
            repo.saveUser(user);
        });

        it("should get a user by his name", () => {
            const repo = new Repository(database);
            const user = {
                name: "TestUser", 
                selectedCoffee:100, 
                selectedMilk:20, 
                selectedStrength:3
            };

            assert.equal("TestUser", user.name);
            repo.saveUser(user);

            const loadedUser = repo.getUser("TestUser");

            assert.deepEqual(loadedUser, user);
        })
    }
);