const assert = require('assert');
const Repository = require('../src/repository.js');
const fs = require('fs');
const path = require('path');
const rmrf = require('rimraf');

const rootFolder = path.resolve(__dirname, '../../');
const database = path.resolve(rootFolder, 'coffee_users');

describe("The Repository", () => {
        beforeEach((done) => {
            if (fs.existsSync(database)) {
                rmrf(database, () => {
                    done();
                });
            }
        });

        it("should create a folder 'coffee_users' upon instantiation", () => {
            assert.equal(false, fs.existsSync(database));
            const repo = new Repository(database);
            assert.equal(true, fs.existsSync(database));
        })
    }
);