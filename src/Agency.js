import User from './User';
var moment = require('moment');

class Agency extends User {
  constructor(users) {
    super (undefined, undefined, undefined, users)
    this.users = users
  }

  incomeGenerated(trips) {
    return trips.reduce((totalFees, trip) => {
      totalFees += trip.cost * .1
      return totalFees;
    }, 0)
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

  getAllPendingTrips(trips) {
    return trips.filter(trip => {
      return trip.status === "pending"
    })
  }

  approveTrip(id) {
    console.log('post' + id)
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
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
    console.log('delete' + id)
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
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
