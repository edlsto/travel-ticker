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

  getAllTrips() {
    return this.users.reduce((tripsList, user) => {
      user.trips.forEach(trip => {
        tripsList.push(trip)
      })
      return tripsList
    }, [])
  }

  getPendingTrips(trips) {
    return trips.filter(trip => {
      return trip.status === "pending"
    })
  }

  // deleteTrip(tripID) {
  //   fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
  //     method: 'DELETE',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       "id": tripID
  //     })
  //   }).then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.log(error.message))
  // }



}


export default Agency;
