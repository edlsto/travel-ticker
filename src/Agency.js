import User from './User';
var moment = require('moment');

class Agency extends User {
  constructor(users) {
    super (users)
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

}


export default Agency;
