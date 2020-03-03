import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/Trip'

import trips from './trip-data-sample'
import travelers from './user-data-sample'
import destinations from './destinations-data-sample'

describe('Trip tests', function() {
  let trip = new Trip(trips[0], destinations, travelers)
  it('should have default properties', function() {
    expect(trip.userID).to.equal(1);
    expect(trip.id).to.equal(1);
    expect(trip.destination).to.deep.equal(
      {
        id: 2,
        destination: 'Stockholm, Sweden',
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        alt: 'city with boats on the water during the day time'
      }
    );
    expect(trip.travelers).to.equal(1);
    expect(trip.date).to.equal('2019-09-16T00:00:00-06:00');
    expect(trip.duration).to.equal(8);
    expect(trip.status).to.equal('approved');
    expect(trip.name).to.equal('Ham Leadbeater');
    expect(trip.cost).to.equal(1480);
  });
});
