import chai from 'chai';
const expect = chai.expect;

import trips from './trip-data-sample'
import travelers from './user-data-sample'
import destinations from './destinations-data-sample'

import User from '../src/User'
import Trip from '../src/Trip'
// import Agency from '../src/Agency'


describe('User tests', function() {
  it('should hold ID, name and trips', function() {
    let user = new User(travelers.travelers[0].id, travelers.travelers[0].name, trips.trips)
    expect(user.id).to.equal(1);
    expect(user.name).to.equal('Ham Leadbeater');
    expect(user.trips).to.deep.equal(
      [
        {
        id: 1,
        userID: 1,
        destinationID: 2,
        travelers: 1,
        date: "2019/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [ ]
        },
        {
        id: 2,
        userID: 1,
        destinationID: 4,
        travelers: 5,
        date: "2020/10/04",
        duration: 18,
        status: "pending",
        suggestedActivities: [ ]
        },
        {
        id: 3,
        userID: 1,
        destinationID: 3,
        travelers: 4,
        date: "2020/05/22",
        duration: 17,
        status: "pending",
        suggestedActivities: [ ]
        },
        {
        id: 4,
        userID: 1,
        destinationID: 5,
        travelers: 2,
        date: "2020/02/25",
        duration: 10,
        status: "approved",
        suggestedActivities: [ ]
        },
        {
        id: 5,
        userID: 1,
        destinationID: 1,
        travelers: 3,
        date: "2020/04/30",
        duration: 18,
        status: "approved",
        suggestedActivities: [ ]
        }

      ]
    );
  });

  it('should calculate cost of trips this year', function() {
    let user = new User(travelers.travelers[0].id, travelers.travelers[0].name, trips.trips.map(trip => new Trip(trip, destinations, travelers)))
    user.getCostOfTripsThisYear()
    expect(user.getCostOfTripsThisYear()).to.equal(18106);
  });

  it('should be able to get future trips', function() {
    let user = new User(travelers.travelers[0].id, travelers.travelers[0].name, trips.trips.map(trip => new Trip(trip, destinations, travelers)))
    user.getUpcomingTrips()
    expect(user.getUpcomingTrips()).to.deep.equal(
      [
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
  });

  it('should be able to get past trips', function() {
    let user = new User(travelers.travelers[0].id, travelers.travelers[0].name, trips.trips.map(trip => new Trip(trip, destinations, travelers)))
    user.getPastTrips()
    expect(user.getPastTrips()).to.deep.equal(
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
        }
      ]
    );
  });

  it('should be able to get pending trips', function() {
    let user = new User(travelers.travelers[0].id, travelers.travelers[0].name, trips.trips.map(trip => new Trip(trip, destinations, travelers)))
    expect(user.getPendingTrips()).to.deep.equal(
      [
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
        }
      ]
    );
  });

});
