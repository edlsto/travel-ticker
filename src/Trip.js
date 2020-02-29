var moment = require('moment');

class Trip {
  constructor(tripData, destinationsData, users) {
    console.log(users)
    this.userID = tripData.userID;
    this.id = tripData.id
    this.destination = destinationsData.destinations.find(destination => destination.id === tripData.destinationID)
    this.travelers = tripData.travelers;
    this.date = moment(tripData.date.replace(/\//gi, '-')).format();
    this.duration = tripData.duration;
    this.status = tripData.status;
    if (users.travelers){
      this.name = users.travelers.find(user => tripData.userID === user.id).name
    } else {
      this.name = users.name
    }
  }
  }


export default Trip;
