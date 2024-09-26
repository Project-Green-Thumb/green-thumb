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
    const users = await User.find({});
    console.log(users);
    // clear the db
    await mongoose.connection.dropDatabase();
    // close the connection
    await mongoose.connection.close();
    // stop the server
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // we want to clear the db before each test and set up mock user data to interact with
    await mongoose.connection.db.dropDatabase();

    await User.create({ username: 'bartledoo', password: 'goodpass3' });
    await User.syncIndexes();
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
      it('should login user with correct credentials', () => {
        return request(app)
          .post('/api/login')
          .send({ username: 'bartledoo', password: 'goodpass3' })
          .expect(200); //Possibly add token to this once we add one.
      });

      // status of 400 and content type of JSON (error message) with incorrect credentials
      it('should respond with a status of 400 and a application/json content type with incorrect credentials', () => {
        return request(app)
          .post('/api/login')
          .send({ username: 'bartledont', password: 'badpass3' })
          .expect(400)
          .expect((res) => {
            expect(res.headers['content-type']).toMatch(/application\/json/);
            expect(res.body).toHaveProperty('error', 'Invalid credentials.');
          });
      });

      it('should respond with a 400 status and an error if username field is empty', () => {
        return request(app)
          .post('/api/login')
          .send({ username: '', password: '123' })
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty(
              'error',
              'Both username and password fields are required.'
            );
          });
      });

      it('should respond with a 400 status and an error if password field is empty', () => {
        return request(app)
          .post('/api/login')
          .send({ username: 'test', password: '' })
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty(
              'error',
              'Both username and password fields are required.'
            );
          });
      });

      it('should respond with a 400 status and an error if username and password fields are empty', () => {
        return request(app)
          .post('/api/login')
          .send({ username: '', password: '' })
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty(
              'error',
              'Both username and password fields are required.'
            );
          });
      });
    });
  });

  /*
   * SIGN UP
   */

  describe('/api/signup', () => {
    describe('POST', () => {
      it('should create new user on successful signup', () => {
        return request(app)
          .post('/api/signup')
          .send({ username: 'testUser3', password: 'testPass3' })
          .expect(201)
          .expect((res) => {
            expect(res.body).toHaveProperty('_id');
          });
      });

      it('should return an error if username AND password fields are empty', () => {
        return request(app)
          .post('/api/signup')
          .send({ username: '', password: '' })
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty(
              'error',
              'Both username and password fields are required.'
            );
          });
      });

      it('should return an error if username field is empty', () => {
        return request(app)
          .post('/api/signup')
          .send({ username: '', password: 'testingTime' })
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty(
              'error',
              'Both username and password fields are required.'
            );
          });
      });

      it('should return an error if password field is empty', () => {
        return request(app)
          .post('/api/signup')
          .send({ username: 'goober', password: '' })
          .expect(400)
          .expect((res) => {
            expect(res.body).toHaveProperty(
              'error',
              'Both username and password fields are required.'
            );
          });
      });

      it('should return an error if username is already taken', async () => {
        await User.create({ username: 'test', password: '123' });

        return request(app)
          .post('/api/signup')
          .send({ username: 'test', password: 'goodpass3' })
          .expect(409)
          .expect((res) => {
            expect(res.body).toHaveProperty(
              'error',
              'Error creating account! Username may be taken.'
            );
          });
      });
    });
  });
});
