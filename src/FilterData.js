import Agency from './Agency';
import User from './User'
import Trip from './Trip'
var moment = require('moment');


class DataRepo {

  constructor(id) {
    this.allTrips = fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips")
      .then(data => data.json());
    this.allDestinations = fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations")
      .then(data => data.json());
    this.user = fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${id || ''}`)
      .then(data => data.json());
  }

  getDestinationsAndTrips() {
    return Promise.all([this.allTrips, this.allDestinations])
      .then(promises => {
        return {
          newTripID: this.getNewTripId(promises[0].trips),
          allDestinations: promises[1].destinations
        }
      })
  }

  getNewTripId(trips) {

    return trips.sort((a, b) => b.id - a.id)[0].id + 1;
  }

  getUser(userID) {
    return Promise.all([this.user, this.allTrips, this.allDestinations])
      .then(promises => {
        return new User(promises[0].id, promises[0].name, promises[0].travelerType, this.getAllTrips(promises[0].id, promises[1], promises[2], promises[0]))
      })
  }

  getAgency() {
    return Promise.all([this.user, this.allTrips, this.allDestinations])
      .then(promises => {
        console.log(promises[0])
        return new Agency(promises[0].travelers.map(user => {
          return new User(user.id, user.name, user.travelerType, this.getAllTrips(user.id, promises[1], promises[2], promises[0]))
        }))
      })
  }





  // getAllTripsForUser(userID) {
  //   return Promise.all([this.allTrips, this.allDestinations])
  //     .then( data => {
  //       console.log(data[1])
  //       let trips = data[0];
  //       let destinations = data[1];
  //       console.log(destinations)
  //       const filteredData = trips.trips.filter(trip => trip.userID === userID)
  //       return filteredData.map(trip => {
  //         return new Trip(trip, destinations)
  //      })
  //     })
  // }


  getAllTrips(userID, trips, destinations, users) {
    console.log(trips)
    const regex = /\//gi;
    const filteredData = trips.trips.filter(trip => trip.userID === userID || trip.userId === userID)
    console.log(filteredData)
    return filteredData.map(trip => {
      return new Trip(trip, destinations, users)
   })
  }



}

export default DataRepo;
