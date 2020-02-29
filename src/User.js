import FilterData from './FilterData';
var moment = require('moment');


class User {
  constructor(id, name, type, trips) {
    this.id = id;
    this.name = name;
    this.trips = trips
  }

  getCostOfTripsThisYear() {
    console.log(this)
    const tripsThisYear = this.trips.filter(trip => {
      return moment(trip.date).isAfter('2020-01-01')
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
      return moment(trip.date).isAfter(moment()) && trip.status === 'pending'
    })
  }

}


export default User;
