import User from './User';

class FilterData {
  constructor(id) {
    this.allTrips = fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips")
      .then(data => data.json());
    this.allDestinations = fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations")
      .then(data => data.json());
    this.user = fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${id}`)
      .then(data => data.json());
  }

  getUser(userID) {
    return Promise.all([this.user, this.getAllTripsForUser(userID)])
      .then(promises => {
        return new User(promises[0].id, promises[0].name, promises[0].travelerType, promises[1])
      })
  }


  getAllTripsForUser(userID) {
    return Promise.all([this.allTrips, this.allDestinations])
      .then( data => {
        const filteredData = data[0].trips.filter(trip => trip.userID === userID)
          return filteredData.map(trip => {
            return {
              id: trip.id,
              destination: data[1].destinations.find(destination => destination.id === trip.destinationID),
              travelers: trip.travelers,
              date: new Date(trip.date).toDateString(),
              duration: trip.duration,
              status: trip.status
            }
         })
      })
  }

}

export default FilterData;
