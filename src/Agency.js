import User from './User';
var moment = require('moment');

class Agency extends User {
  constructor(users) {
    super (undefined, undefined, undefined, users)
    this.users = users
  }

  accessUserInfo(user) {
    this.id = user.id;
    this.name = user.name;
    this.trips = user.trips;
  }

  resetUserAccess() {
    this.id = undefined;
    this.name = undefined;
    this.trips = undefined;
  }

  getAllTrips() {
    return this.users.reduce((tripsList, user) => {
      user.trips.forEach(trip => {
        tripsList.push(trip)
      })
      return tripsList
    }, [])
  }

  getAllPendingTrips(trips) {
    return trips.filter(trip => {
      return trip.status === "pending"
    })
  }

  getRevenueFromAllNonPendingTripsThisYear(trips) {
    let tripsThisYear = trips.filter(trip => {
      return trip.status !== "pending" && moment(trip.date).isSame('2020-12-31', 'year')
    });
    return tripsThisYear.reduce((totalFees, trip) => {
      totalFees += trip.cost * .1
      return totalFees;
    }, 0)
  }

  approveTrip(id) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": id,
        "status": "approved"
      })
    }).then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error.message))
  }

  denyTrip(id) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": id,
      })
    }).then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error.message))
  }

}


export default Agency;
