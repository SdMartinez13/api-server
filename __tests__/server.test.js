'use strict';

const supertest = require('supertest');
const { server } = require('../src/app');
const { sequelize } = require('../src/models/index');
const mockRequest = supertest(server);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop({});
  await sequelize.close();
});

describe('Server Tests', () => {
  describe('Error Handler Tests', () => {
    test('404 on a bad route', async () => {
      let response = await mockRequest.get('/foo');
      //   console.log(response);
      expect(response.status).toEqual(404);
      expect(response.text).toEqual('Not Found');
    });

    test('404 on a bad method', async () => {
      let response = await mockRequest.put('/person');
      expect(response.status).toEqual(404);
      expect(response.text).toEqual('Not Found');
    });

    test('Create a record using POST', async () => {
      let response = await mockRequest.post('/person').send({name: 'Keith', age: '37', pronouns: 'they/them'});
      //   console.log(response);
      expect(response.status).toEqual(200);
    });


    test('Read a list of records using GET', async () => {
      let response = await mockRequest.get('/person');
      expect(response.status).toEqual(200);
    });

    test('Read a record using GET', async () => {
      let response = await mockRequest.get('/person/1');
      expect(response.status).toEqual(200);
    });

    test('Read a record using GET 404', async () => {
      let response = await mockRequest.get('/person/999');
      //   console.log(response);
      expect(response.status).toEqual(404);
      expect(response.text).toEqual('Person not found');
    });

    test('Update a record using PUT', async () => {
      let response = await mockRequest.put('/person/1').send({age: '31'});
      expect(response.status).toEqual(200);
    });

    test('Destroy a record using DELETE', async () => {
      let response = await mockRequest.delete('/person/1');
      expect(response.status).toEqual(200);
    });

  });

});
