import chai from 'chai';
const expect = chai.expect;

import trips from './trip-data-sample'
import travelers from './user-data-sample'
import destinations from './destinations-data-sample'

import Agency from '../src/Agency'
import User from '../src/User'
import Trip from '../src/Trip'
import DataRepo from '../src/DataRepo'


describe('Agency tests', function() {
  it('should have default properties', function() {
    let tripsInstantiated = trips.trips.map(trip => {
      return new Trip(trip, destinations, travelers)
    })
    let agency = new Agency(travelers.travelers.map(user => {
      return new User(user.id, user.name, tripsInstantiated)
    }))
    expect(agency.users).to.deep.equal(
      [{
        id: 1,
        name: 'Ham Leadbeater',
        trips: [
           {
            userID: 1,
            id: 1,
            destination:

            {
                "alt": "city with boats on the water during the day time",
                "destination": "Stockholm, Sweden",
                "estimatedFlightCostPerPerson": 780,
                "estimatedLodgingCostPerDay": 100,
                "id": 2,
                "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
              }
            ,
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
                "alt": "boats at a dock during the day time",
                "destination": "Cartagena, Colombia",
                "estimatedFlightCostPerPerson": 350,
                "estimatedLodgingCostPerDay": 65,
               "id": 4,
              "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
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
                "alt": "opera house and city buildings on the water with boats",
                "destination": "Sydney, Austrailia",
                "estimatedFlightCostPerPerson": 950,
                "estimatedLodgingCostPerDay": 130,
                "id": 3,
                "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
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
                "alt": "city with clear skys and a road in the day time",
               "destination": "Madrid, Spain",
                "estimatedFlightCostPerPerson": 650,
                "estimatedLodgingCostPerDay": 150,
                "id": 5,
                "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
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
                "alt": "overview of city buildings with a clear sky",
                "destination": "Lima, Peru",
                "estimatedFlightCostPerPerson": 400,
                "estimatedLodgingCostPerDay": 70,
                "id": 1,
                "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
              },
            travelers: 3,
            date: '2020-04-30T00:00:00-06:00',
            duration: 18,
            status: 'approved',
            name: 'Ham Leadbeater',
            cost: 1590
          }
        ]
      }]

    );
  });
  //
  it('should have default properties', function() {
    let tripsInstantiated = trips.trips.map(trip => {
      return new Trip(trip, destinations, travelers)
    })
    let agency = new Agency(travelers.travelers.map(user => {
      return new User(user.id, user.name, tripsInstantiated)
    }))
    agency.accessUserInfo(
      agency.users[0]
    )
    expect(agency.name).to.equal('Ham Leadbeater');
    expect(agency.id).to.equal(1);
    expect(agency.trips).to.deep.equal(
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

    )
  });

  it('should get all trips', function() {
    let tripsInstantiated = trips.trips.map(trip => {
      return new Trip(trip, destinations, travelers)
    })
    let agency = new Agency(travelers.travelers.map(user => {
      return new User(user.id, user.name, tripsInstantiated)
    }))
    expect(agency.getAllTrips()).to.deep.equal(
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
  });

  it('should get all pending trips', function() {
    let tripsInstantiated = trips.trips.map(trip => {
      return new Trip(trip, destinations, travelers)
    })
    let agency = new Agency(travelers.travelers.map(user => {
      return new User(user.id, user.name, tripsInstantiated)
    }))
    expect(agency.getAllPendingTrips(agency.getAllTrips())).to.deep.equal(
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

    )
  });

  it('should get revenue from all non-pending trips', function() {
    let tripsInstantiated = trips.trips.map(trip => {
      return new Trip(trip, destinations, travelers)
    })
    let agency = new Agency(travelers.travelers.map(user => {
      return new User(user.id, user.name, tripsInstantiated)
    }))
    expect(agency.getRevenueFromAllNonPendingTripsThisYear(agency.getAllTrips())).to.equal(359)

  });

});
