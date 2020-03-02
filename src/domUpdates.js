import $ from 'jquery';
var moment = require('moment');
const flatpickr = require("flatpickr");

let domUpdates = {

  showAlert() {
    const current = $('.current')
    current.addClass('alert')
    current.text('Trip successfully requested! We will review your trip request.')
  },

  returnHomeUser(user) {
    const main = $('main')
    main.removeClass('book-trip-view')
    domUpdates.addUserDashboardHTML()
    domUpdates.displayPendingUpcoming(user.getPendingTrips().concat(user.getUpcomingTrips()))
    domUpdates.displayPast(user.getPastTrips())
    domUpdates.displayCurrent(user.getCurrentTrips())
  },

  addUserHTML() {
    const body = $('body')
    body.removeClass('log-in')
    body.html(`
      <header><h2 class="main-logo">Travel Tracker</h2><h3 id="user-name"></h3></header>
      <aside>
        <div class="spent-container"><span id="spent-this-year" class="display-cost"></span>spent on trips this year</div>
        <div class="book-trip">
          <img class="book-icon" src="./images/book.png">
          <h3>Book a trip</h3>
        </div>
      </aside>
      <main>

      </main>
    `);
    body.addClass('dashboard')
  },

  addUserDashboardHTML() {
    const main = $('main')
    main.html(`
        <div class="current"></div>
        <div class="upcoming-wrapper"><h3>Upcoming trips</h3><div class="pending-upcoming"></div></div>
        <div class="past-wrapper"><h3>Past trips</h3><div class="past"></div></div>
      `)

  },

  setUpUserProfile(agency) {
    const requests = $('.requests')
    requests.addClass('user-profile')
    requests.removeClass('requests')
    requests.html(`
        <div class="user-profile-wrapper">
        <h2>${agency.name}</h2>

        </div>
      `);
  },

  // approveDeleteUserProfile(agency, pendingUpcomingTrips) {
  //
  // },

  showUserProfileTrips(trips) {
    const wrapper = $('.user-profile-wrapper');
    console.log('here')
    console.log(trips)
    wrapper.html('')
    trips.forEach(trip => {
      wrapper.append(`
        <div class="trip-card" id="trip-request-${trip.id}">
          <div class="trip-options">
            <div class="destination trip-req"><p>${trip.destination.destination}</p></div>
            <div class="date trip-req"><p>${moment(trip.date).format('M/D')}-${moment(trip.date).add(trip.duration, 'days').format('M/D/YYYY')}</p></div>
            <div class="travelers trip-req"><p>${trip.travelers} travelers</p></div>
            <div class="status ${trip.status}"><p class="status-btn">${domUpdates.uppercase(trip.status)}</p></div>
          </div>
          <div class="agent-options">
            ${trip.status === 'pending' ? '<button class="agency-btn approve-btn" type="button">Approve</button><button class="agency-btn delete-btn deny-btn" type="button">Deny</button>' : '<button class="agency-btn delete-btn" type="button">Delete</button>'}
          </div>
        </div>`)
    })
  },

  approveOrDeny(agency) {
    const approveBtn = $('.approve-btn')
    const denyBtn = $('.deny-btn')
    approveBtn.on('click', (event) => {
      agency.approveTrip(parseInt($(event.target).parent()[0].id.split('-')[2]))
      $(event.target).parent()[0].remove();
    })
    denyBtn.on('click', event => {
      agency.denyTrip(parseInt($(event.target).parent()[0].id.split('-')[2]))
      $(event.target).parent()[0].remove();
    })
  },

  addAgencyHTML() {
    const body = $('body')
    body.removeClass('log-in')
    body.html(`
      <header>
        <h2 class="main-logo">Travel Tracker</h2>
          <div class="search-user-name-wrapper"><img class="search-img" src="./images/search.png"><input type="text" class="search" placeholder="Search for clients ">
        </div>

      </header>
      <aside>
        <div class="spent-container"><span class="display-earned display-cost"></span>in income generated <br> this year</div>
        <div class="spent-container"><span class="display-current-travelers display-cost"></span>travelers on trips today</div>
      </aside>
      <main>
        <div class="requests">
        </div>
      </main>

    `);
    body.addClass('dashboard dashboard-agency')
  },

  displayName(name) {
    const userName = $('#user-name')
    userName.text(name)
  },

  displayCurrentTravelers(num) {
    const displayCurrentTravelers = $('.display-current-travelers')
    displayCurrentTravelers.text(num)
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
      requests.append(`<div class="trip-card search-results-card" id="user-id-${user.id}"><span class="traveler-name search-result">${user.name}</span><button type="button" class="client-details-btn agency-btn">See client details</button></div>`)
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
    const requests = $('.requests')
    requests.html('')
    requests.append(trips.length > 0 ? '<h3>New trip requests</h3>' : '<h3>No new trip requests</h3>')
    trips.forEach(trip => {
      requests.append(`<div class="trip-card" id="trip-request-${trip.id}""><span class="traveler-name trip-req">${trip.name}</span><span class="destination trip-req">${trip.destination.destination}</span><span class="date trip-req">${moment(trip.date).format('M/D')}-${moment(trip.date).add(trip.duration, 'days').format('M/D/YYYY')}</span><span class="travelers trip-req">${trip.travelers} travelers</span><button class="agency-btn approve-btn" type="button">Approve</button><button class="agency-btn deny-btn" type="button">Deny</button></div>`)
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
    let selectedDestination = destinations.find(destination => destination.id === parseInt($(event.target).closest('.destination-tile')[0].id));
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

  showEarned(amount) {
    const displayEarned = $('.display-earned');
    displayEarned.text(`$${this.numberWithCommas(amount.toFixed(2))}`)
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
