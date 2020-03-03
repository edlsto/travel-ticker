import chai from 'chai';
const expect = chai.expect;

const spies = require('chai-spies');
chai.use(spies);

import trips from './trip-data-sample'
import travelers from './user-data-sample'
import destinations from './destinations-data-sample'

import DataRepo from '../src/DataRepo'


// global.fetch = () => new Promise((resolve, reject) => {})
// global.window = {};
chai.spy.on(global, 'fetch', () => new Promise((resolve, reject) => {}))


describe('Data Repo tests', function() {

  it('should make fetch calls for default data', function() {
    let dataRepo = new DataRepo(1);
    expect(global.fetch).to.have.been.called(3);
    expect(global.fetch).to.have.been.first.called.with("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips");
    expect(global.fetch).to.have.been.second.called.with("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations");
    expect(global.fetch).to.have.been.third.called.with("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/1");

  });

  it('should be able to get destinations', function() {
    let dataRepo = new DataRepo(1);
    chai.spy.on(dataRepo, 'getDestinations', () => {})
    dataRepo.getDestinations()
    expect(dataRepo.getDestinations).to.have.been.called(1);
  })

  it('should be able to get a user', function() {
    let dataRepo = new DataRepo(1);
    chai.spy.on(dataRepo, 'getUser', () => {})
    dataRepo.getUser(1)
    expect(dataRepo.getUser).to.have.been.called(1);
    expect(dataRepo.getUser).to.have.been.called.with(1);
  })

  it('should be able to get an agency', function() {
    let dataRepo = new DataRepo(1);
    chai.spy.on(dataRepo, 'getAgency', () => {})
    dataRepo.getAgency()
    expect(dataRepo.getAgency).to.have.been.called(1);
  })

  it('should be able to get all trips', function() {
    let dataRepo = new DataRepo(1);
    console.log(dataRepo.getAllTrips(1, trips, destinations, travelers))
    expect(dataRepo.getAllTrips(1, trips, destinations, travelers)).to.deep.equal(
      [
         {
          userID: 1,
          id: 1,
          destination: {
            id: 2,
            destination: 'Stockholm, Sweden',
            estimatedLodgingCostPerDay: 100,
            estimatedFlightCostPerPerson: 780,
            image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            alt: 'city with boats on the water during the day time'
          },
          travelers: 1,
          date: '2019-09-16T00:00:00-06:00',
          duration: 8,
          status: 'approved',
          name: 'Ham Leadbeater',
          cost: 1480
        },
         {
          userID: 1,
          id: 2,
          destination: {
            id: 4,
            destination: 'Cartagena, Colombia',
            estimatedLodgingCostPerDay: 65,
            estimatedFlightCostPerPerson: 350,
            image: 'https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
            alt: 'boats at a dock during the day time'
          },
          travelers: 5,
          date: '2020-10-04T00:00:00-06:00',
          duration: 18,
          status: 'pending',
          name: 'Ham Leadbeater',
          cost: 1455
        },
         {
          userID: 1,
          id: 3,
          destination: {
            id: 3,
            destination: 'Sydney, Austrailia',
            estimatedLodgingCostPerDay: 130,
            estimatedFlightCostPerPerson: 950,
            image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            alt: 'opera house and city buildings on the water with boats'
          },
          travelers: 4,
          date: '2020-05-22T00:00:00-06:00',
          duration: 17,
          status: 'pending',
          name: 'Ham Leadbeater',
          cost: 3030
        },
         {
          userID: 1,
          id: 4,
          destination: {
            id: 5,
            destination: 'Madrid, Spain',
            estimatedLodgingCostPerDay: 150,
            estimatedFlightCostPerPerson: 650,
            image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            alt: 'city with clear skys and a road in the day time'
          },
          travelers: 2,
          date: '2020-02-25T00:00:00-07:00',
          duration: 10,
          status: 'approved',
          name: 'Ham Leadbeater',
          cost: 2000
        },
         {
          userID: 1,
          id: 5,
          destination: {
            id: 1,
            destination: 'Lima, Peru',
            estimatedLodgingCostPerDay: 70,
            estimatedFlightCostPerPerson: 400,
            image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
            alt: 'overview of city buildings with a clear sky'
          },
          travelers: 3,
          date: '2020-04-30T00:00:00-06:00',
          duration: 18,
          status: 'approved',
          name: 'Ham Leadbeater',
          cost: 1590
        }
      ]

    );
  })


});
