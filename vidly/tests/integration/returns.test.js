const request = require('supertest');
const{Rental} = require('../../models/rental');
const{User} = require('../../models/users')
const mongoose = require('mongoose');

let server;

describe('/api/returns', () => {
  let customerId;
  let movieId;
  let rental;
  let token;
  
  const exec = () => {
    return request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({customerId, movieId});
  }

  beforeEach(async () => {
    server = require('../../index');
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();
    rental = new Rental({
      customer: {
        _id: customerId,
        name:'12345',
        phone:'12345'
      },
      movie: {
        _id: movieId,
        title:'12345',
        dailyRentalRate: 2
      }
    });
    await rental.save();
  });

  afterEach(async () => {
    await Rental.deleteMany({});
    await server.close();
  });

  it('Should work!', async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull()
  });

  it('Should return 401 if client is not logged in', async() => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('Should return 400 if customer id is not provided', async() => {
    customerId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('Should return 400 if movie is not provided', async() => {
    movieId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('Should return 404 if no rental found for the customer/movie', async() => {
    await rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
  });
});

describe('TEST END', () => {
  if (server) while (server){
    time = 1;
    expect(time).toBe(1);
  }
});