const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server/server');
// might need?
// const fs = require('fs');
// const path = require('path');
const User = require('../server/models/userModel');

const server = 'http://localhost:3000';

let mongoServer;
// might need test/mock db file?

// testing log in routes
describe('Route integration', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.TEST_URI = uri;
  });

  afterAll(async () => {
    // clear the db
    await mongoose.connection.dropDatabase();
    // close the connection
    await mongoose.connection.close();
    // stop the server
    await mongoServer.stop();
  });

  describe('/', () => {
    /*
     * STATIC FILES
     */

    describe('GET', () => {
      it('should respond with 200 status and text/html content type', () => {
        return request(app)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  /*
   * LOGIN
   */

  describe('/api/login', () => {
    describe('POST', () => {
      beforeEach(async () => {
        // we want to clear the db before each test and set up mock user data to interact with
        await mongoose.connection.db.dropDatabase();

        // write our user models to put in the mock db to test here
        await User.create({ username: 'bartledoo', password: 'goodpass3' });
      });

      it('should login user with correct credentials', () => {
        return request(app)
          .post('/api/login')
          .send({ username: 'bartledoo', password: 'goodpass3' })
          .expect(200); //Possibly add token to this once we add one.
      });

      // status of 400 and content type of JSON (error message) with incorrect credentials
      it('should respond with a status of 400 and a text/json content type with incorrect credentials', () => {
        return request(app)
          .post('/api/login')
          .send({ username: 'bartledont', password: 'badpass3' })
          .expect(400)
          .expect((res) => {
            expect(res.headers['content-type']).toMatch(/application\/json/);
            expect(res.body).toHaveProperty('error', 'Invalid credentials.');
          });
      });
    });
  });
});

/*
 * SIGN UP
 */
//   describe('/api/signup', () => {
//   describe('POST', () => {
//     it('');
//   });
// });

// //////
// const mockDb = {
//   users: [
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Jane Smith' },
//   ],

//   getUserById: jest.fn((id) => {
//     return mockDb.users.find((user) => user.id === id);
//   }),

//   createUser: jest.fn((user) => {
//     const newId = mockDb.users.length + 1;
//     mockDb.users.push({ ...user, id: newId });
//     return { ...user, id: newId };
//   }),
// };

// module.exports = mockDb;
