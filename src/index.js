import $ from 'jquery';
import './css/base.scss';
import DataRepo from './FilterData';
import domUpdates from './domUpdates'
import './images/book.png'
import './images/plus.png'
import './images/minus.png'
import './images/search.png'


var moment = require('moment');

const userName = $('.user-name')
const password = $('password')
const logInBtn = $('.log-in')
const body = $('body')


logInBtn.on('click', () => {
  const regex = /^traveler([1-9]|[1-4][0-9]|50)$/;
  if (regex.test(userName.val()) && password.val('travel2020')) {
    const userID = parseInt(userName.val().replace( /^\D+/g, ''))
    userView(userID);
  } else if (userName.val('agency') && password.val('travel2020')) {
    agencyView()
  }
})

// agencyView()
// userView()

function agencyView() {
  body.removeClass('log-in')
  body.html(`
    <header>
      <h2>Travel Tracker</h2>
        <div class="search-user-name-wrapper"><img class="search-img" src="./images/search.png"><input type="text" class="search" placeholder="Search for clients ">
      </div>

    </header>
    <aside>
      <div class="spent-container"><span class="display-cost"></span>in income generated <br> this year</div>
      <div class="spent-container"><span class="display-cost"></span>travelers on trips today</div>
    </aside>
    <main>
      <div class="requests">
      </div>
    </main>

  `);
  body.addClass('dashboard dashboard-agency')
  startUpAgencyView()

}


function userView(userID) {
  body.removeClass('log-in')
  const randomUser = Math.ceil(Math.random() * 50)
  // const randomUser = 8

  body.html(`
    <header><h2>Travel Tracker</h2><h3 id="user-name"></h3></header>
    <aside>
      <div class="spent-container"><span id="spent-this-year" class="display-cost"></span>spent on trips this year</div>
      <div class="book-trip">
        <img class="book-icon" src="./images/book.png">
        <h3>Book a trip</h3>
      </div>
    </aside>
    <main>
      <div class="current"></div>
      <div class="upcoming-wrapper"><h3>Upcoming trips</h3><div class="pending-upcoming"></div></div>
      <div class="past-wrapper"><h3>Past trips</h3><div class="past"></div></div>
    </main>

  `);
  body.addClass('dashboard')
  // onStartup(randomUser)
  onStartup(userID)

}

function startUpAgencyView() {
  // domUpdates.displayName('Agency');
  let userData = new DataRepo();

  userData.getAgency()
    .then(agency => {
      domUpdates.agencyDisplayPending(agency.getPendingTrips(agency.getAllTrips()))
      const search = $('.search');
      const requests = $('.requests')
      // search.on('click', () => {
      //   requests.html('')
      // })
      search.on('keyup', () => {
        console.log(search.val())
        if (search.val() === '') {
          console.log('empty')
          domUpdates.agencyDisplayPending(agency.getPendingTrips(agency.getAllTrips()))
        } else {
        let searchResults = agency.users.filter(user => {
          return search.val().toLowerCase() === user.name.slice(0, search.val().length).toLowerCase() || search.val().toLowerCase() === user.name.split(' ')[1].slice(0, search.val().length).toLowerCase()
        })
        domUpdates.displaySearchResults(searchResults)
        }
      })
    })

}

function onStartup(userID) {
  console.log(userID)
  const bookTrip = $('.book-trip')
  let userData = new DataRepo(userID)
  userData.getUser(userID)
    .then(user => {
      domUpdates.displayName(user.name)
      domUpdates.displaySpentThisYear(Math.round(user.getCostOfTripsThisYear()))
      console.log(user.getPendingTrips())
      domUpdates.displayPendingUpcoming(user.getPendingTrips().concat(user.getUpcomingTrips()))
      domUpdates.displayPast(user.getPastTrips())
      domUpdates.displayCurrent(user.getCurrentTrips())

      bookTrip.on('click', () => {
        userData.getDestinationsAndTrips()
          .then(data => {
            bookTrips(data, user)
          })
      })
    })
}

function bookTrips(data, user) {
  const parentContainer = $('main')
  let results;
  domUpdates.bookTrip(data.allDestinations)
  const tiles = $('.destination-tile');
  tiles.on('click', (event) => {
    results = getDetailsFromDOM(event, data)
  })
  parentContainer.on('click', (event) => {
    if ($(event.target).hasClass('submit-request')) {
      let numTravelers = parseInt($('.num-travelers-input').val())
      let duration = calculateDuration(results[1].selectedDates[0], results[1].selectedDates[1])
      user.requestTrip(Date.now(), results[0].id, numTravelers, moment(results[1].selectedDates[0]).format('YYYY/MM/DD'), duration)
      console.log(Date.now(), results[0].id, numTravelers, moment(results[1].selectedDates[0]).format('YYYY/MM/DD'), duration)
    }
})
}

function getDetailsFromDOM(event, data) {
  let selectedDestination = domUpdates.selectDestination(event, data.allDestinations)
  domUpdates.selectTripDetails(selectedDestination);
  let fp = domUpdates.getDates(selectedDestination)
  domUpdates.getTravelersNumber(selectedDestination, fp)
  return [selectedDestination, fp]
}

function calculateDuration(begin, end) {
  const beginDate = moment(begin);
  const endDate = moment(end);
  const duration = endDate.diff(beginDate, 'days')
  return duration
}
