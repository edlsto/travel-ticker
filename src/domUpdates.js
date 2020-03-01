import $ from 'jquery';
var moment = require('moment');
// const flatpickr = require("flatpickr");

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
    trips.sort((a, b) => b.status - a.status ? 1 : -1)
    const pendingUpcoming = $('.pending-upcoming')
    trips.forEach(trip => {
      pendingUpcoming.prepend(`<div class="trip-card ${trip.status}"><img class="card-img" src=${trip.destination.image}><div class="trip-details"><h3>${trip.destination.destination}</h3><p> ${moment(trip.date).format('M/D')}-${moment(trip.date).add(trip.duration, 'days').format('M/D/YYYY')}</p><p>Travelers: ${trip.travelers}</div><div class="status"><p class="status-btn">${this.uppercase(trip.status)}</p></div></div>`)
    })

  },

  displaySearchResults(users) {
    const requests = $('.requests')
    requests.html('')
    requests.append(users.length > 0 ? '<h3>Search results</h3>' : '<h3>No search results</h3>')
    users.forEach(user => {
      requests.append(`<div class="trip-card"><span class="traveler-name search-result">${user.name}</span><button type="button">Client details</button></div>`)
    })
  },

  uppercase(string) {
    let stringArray = string.split('');
    stringArray[0] = stringArray[0].toUpperCase();
    return stringArray.join('')
  },

  displayCurrent(trips) {
    const current = $('.current');
    trips.forEach(trip => {
      current.prepend(`<div class="trip-card current-trip"><div class="current-label"><p class="status-btn">Current trip</p></div><div class="trip-details"><h3>${trip.destination.destination}</h3><p> ${moment(trip.date).format('M/D')}-${moment(trip.date).add(trip.duration, 'days').format('M/D/YYYY')}</p><p>Travelers: ${trip.travelers}</div><img class="card-img" src=${trip.destination.image}></div>`)
    })
  },

  displayPast(trips) {
    const past = $('.past')
    trips.forEach(trip => {
       past.prepend(`<div class="trip-card"><img class="card-img" src=${trip.destination.image}><div class="trip-details"><h3>${trip.destination.destination.split(', ')[0]}</h3><p> ${moment(trip.date).format('M/D')}-${moment(trip.date).add(trip.duration, 'days').format('M/D/YYYY')}</p></div></div>`)
     })
  },


  agencyDisplayPending(trips) {
    console.log(trips)
    const requests = $('.requests')
    requests.html('')
    console.log(trips)
    requests.append(trips.length > 0 ? '<h3>New trip requests</h3>' : '<h3>No new trip requests</h3>')
    trips.forEach(trip => {
      console.log(trip)
      requests.append(`<div class="trip-card"><span class="traveler-name trip-req">${trip.name}</span><span class="destination trip-req">${trip.destination.destination}</span><span class="date trip-req">${moment(trip.date).format('M/D')}-${moment(trip.date).add(trip.duration, 'days').format('M/D/YYYY')}</span><span class="travelers trip-req">${trip.travelers} travelers</span><button class="agency-btn" type="button">Approve</button><button class="agency-btn" type="button">Deny</button></div>`)
    })
  },


  createTiles(destinations) {
    const destinationsWrapper = $('.destinations-wrapper');
    destinations.forEach(destination => {
      destinationsWrapper.append(`<div class="destination-tile" id="${destination.id}"><div class="destination-name-wrapper"><span class="destination-name">${destination.destination}</span></div><img src=${destination.image}></div>`)
    })

  },

  bookTrip(destinations) {
    const main = $('main')
    main.html('');
    main.addClass('book-trip-view')
    main.append('<div><h3>Where do you want to go?</h3></div><div class="destinations-wrapper"></div>')
    domUpdates.createTiles(destinations);


  },

  selectDestination(event, destinations) {
    const main = $('main')
    main.addClass('select-trip-details')
    let selectedDestination = destinations.find(destination => destination.id === parseInt($(event.target).parent()[0].id));
    return selectedDestination
  },

  selectTripDetails(selectedDestination) {
    const main = $('main')
    main.addClass('select-trip-details')
    main.html(
      `<h3>So you wanna go to ${selectedDestination.destination} ...</h3>
      <div id="date-picker"></div>
      <div class="lower-wrapper">
      <div class="options-wrapper">
      <h4>Number of travelers</h4>
      <div class="number-travelers-wrapper"><img class='plus-minus-img minus' src='./images/minus.png'><input type="number" value=2 class="num-travelers-input"><img class='plus-minus-img plus' src='./images/plus.png'></div>
      <button class="submit-request">Submit request</button>
      </div>
      <div class="calculate-cost">
      <h4>The estimated cost of this trip is</h4>
      <div class="display-cost" id="cost-estimate">—</div>
      </div>
      </div>`
    )
  },


  getTravelersNumber(selectedDestination, fp) {
    this.showCost(selectedDestination, fp.selectedDates, $('.num-travelers-input').val())
    const numTravelersInput = $('.num-travelers-input')
    $('.minus').on('click', () => {
      let travelers = numTravelersInput.val();
      travelers--;
      numTravelersInput.val(travelers)
    })
    $('.plus').on('click', () => {
      let travelers = numTravelersInput.val();
      travelers++;
      numTravelersInput.val(travelers)
    })
    $('.plus-minus-img').on('click', () => {
      this.showCost(selectedDestination, fp.selectedDates, $('.num-travelers-input').val())
    })
    return parseInt($('.num-travelers-input').val())
  },

  showCost(destination, selectedDates, travelers) {
    const beginDate = moment(selectedDates[0]);
    const endDate = moment(selectedDates[1]);
    const duration = endDate.diff(beginDate, 'days')
    const totalCostPerTraveler = (duration * destination.estimatedLodgingCostPerDay + destination.estimatedFlightCostPerPerson) * 1.1;
    const totalCost = totalCostPerTraveler * travelers;
    console.log(totalCost)
    $('#cost-estimate').text(`$${this.numberWithCommas(Math.round(totalCost))}`)
  },

  getDates(selectedDestination) {
    let fp = flatpickr("#date-picker", {
      mode: 'range',
      inline: 'true',
      showMonths: 3,
      minDate: 'today',
      defaultDate: [moment().format('YYYY-MM-DD'), moment().add(7,'days').format('YYYY-MM-DD')],
      onChange: function(selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
          domUpdates.showCost(selectedDestination, selectedDates, $('.num-travelers-input').val())
        }
      }
    });
    return fp;
  }


}


export default domUpdates;
