// import DataRepo from './DataRepo';
var moment = require('moment');
// import Trip from './Trip'

class User {
  constructor(id, name, trips) {
    this.id = id;
    this.name = name;
    this.trips = trips
  }

  getCostOfTripsThisYear() {
    const tripsThisYear = this.trips.filter(trip => {
      return moment(trip.date).isSame('2020-12-31', 'year') && trip.status !== 'pending'
    })
    return tripsThisYear.reduce((totalCost, trip) => {
      totalCost += ((trip.destination.estimatedLodgingCostPerDay + trip.destination.estimatedFlightCostPerPerson) * trip.duration) * 1.1
      return totalCost
    }, 0)
  }

  getUpcomingTrips() {
    return this.trips.filter(trip => {
      return moment(trip.date).isAfter(moment()) && trip.status === 'approved'
    })
  }

  getCurrentTrips(trips) {
    trips = this.trips || trips;
    return trips.filter(trip => {
      return moment(moment()).isBefore(moment(trip.date).add(trip.duration, 'days')) && moment(trip.date).isBefore(moment())
    })
  }

  getPastTrips() {
    return this.trips.filter(trip => {
      return moment(trip.date).isBefore(moment().subtract(trip.duration, 'days'))
    })
  }

  getPendingTrips() {
    return this.trips.filter(trip => {
      return trip.status === 'pending'
    })
  }

  requestTrip(tripID, destinationID, travelers, date, duration) {
    console.log(tripID, destinationID, travelers, date, duration)
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": tripID,
        "userID": this.id,
        "destinationID": destinationID,
        "travelers": travelers,
        "date": date,
        "duration": duration,
        "status": "pending",
        "suggestedActivities": []
      })
    }).then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error.message))
  }



}


export default User;
