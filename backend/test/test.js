const assert = require('assert');
const Repository = require('../src/repository.js');
const fs = require('fs');
const path = require('path');
const rmrf = require('rimraf');

const rootFolder = path.resolve(__dirname, '../../');
const database = path.resolve(rootFolder, 'coffee_users');
let user = {
    name: "TestUser", 
    selectedCoffee:100, 
    selectedMilk:20, 
    selectedStrength:3    
};

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

        afterEach(() => {
            user = {
                name: "TestUser", 
                selectedCoffee: 100, 
                selectedMilk: 20, 
                selectedStrength: 3
            };
        })

        it("should create a folder 'coffee_users' upon instantiation", () => {
            assert.equal(false, fs.existsSync(database));
            const repo = new Repository(database);
            assert.equal(true, fs.existsSync(database));
        });

        it("should save user data without throwing an error", () => {
            const repo = new Repository(database);
            repo.saveUser(user);
        });

        it("should get a user by his name", () => {
            const repo = new Repository(database);

            assert.equal("TestUser", user.name);
            repo.saveUser(user);

            const loadedUser = repo.getUser("TestUser");

            assert.deepEqual(loadedUser, user);
        });

        it("should find a user by his token hash", () => {
            const repo = new Repository(database);
            user.tokenHash = "madeUpTokenHash";
            repo.saveUser(user);

            const loadedUser = repo.getUserByTokenHash(user.tokenHash);

            assert.deepEqual(user, loadedUser);
        });

        it("should throw an error if no user can be found for a token hash", () => {
            const repo = new Repository(database);
            user.tokenHash = "madeUpTokenHash";
            repo.saveUser(user);

            assert.throws(() => {
                repo.getUserByTokenHash("invalidTokenHash")
            }, "No matching user data found!");
        });

        it("should be able to increment the beverage count of a user", () => {
            const repo = new Repository(database);
            assert.equal(undefined, user.beverageCount);
            repo.saveUser(user);
            let loadedUser = repo.getUser(user.name);
            assert.equal(0, loadedUser.beverageCount);

            repo.incrementBeverageCount(user.name);
            loadedUser = repo.getUser(user.name);

            assert.equal(1, loadedUser.beverageCount);
        });
    }
);