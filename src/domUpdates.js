import $ from 'jquery';
var moment = require('moment');


let domUpdates = {

  displayName(name) {
    const userName = $('#user-name')
    userName.text(name)
  },

  displaySpentThisYear(amount) {
    const spentThisYear = $('#spent-this-year');
    spentThisYear.text(`$${this.numberWithCommas(amount)}`)
  },

  numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  },

  displayPendingUpcoming(trips) {
    const pendingUpcoming = $('.pending-upcoming')
    trips.forEach(trip => {
      pendingUpcoming.prepend(`<div class="trip-card"><img class="card-img" src=${trip.destination.image}><div class="trip-details"><h3>${trip.destination.destination}</h3><p> ${moment(trip.date).format('M/D')}-${moment(trip.date).add(trip.duration, 'days').format('M/D/YYYY')}</p><p>Travelers: ${trip.travelers}</div></div>`)
    })
  },

  displayPast(trips) {
    const past = $('.past')
    trips.forEach(trip => {
      past.prepend(`<div class="trip-card"><img class="card-img" src=${trip.destination.image}><div class="trip-details"><h3>${trip.destination.destination.split(', ')[0]}</h3><p> ${moment(trip.date).format('M/D')}-${moment(trip.date).add(trip.duration, 'days').format('M/D/YYYY')}</p></div></div>`)
    })
  }



}


export default domUpdates;
