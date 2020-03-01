import $ from 'jquery';
import './css/base.scss';
import FilterData from './FilterData';
import domUpdates from './domUpdates'
import './images/book.png'
import './images/plus.png'
import './images/minus.png'

var moment = require('moment');

const userName = $('.user-name')
const password = $('password')
const logInBtn = $('.log-in')
const body = $('body')


// logInBtn.on('click', () => {
//   const regex = /^traveler([1-9]|[1-4][0-9]|50)$/;
//   if (regex.test(userName.val()) && password.val('travel2020')) {
//     const userID = parseInt(userName.val().replace( /^\D+/g, ''))
//     userView(userID);
//   } else if (userName.val('agency') && password.val('travel2020')) {
//     agencyView()
//   }
// })

// agencyView()
userView()

function agencyView() {
  body.removeClass('log-in')
  body.html(`
    <header><h2>Travel Tracker</h2><h3 id="user-name"></h3></header>
    <aside>
      <div class="spent-container"><span class="display-cost"></span>in income generated <br> this year</div>
      <div class="spent-container"><span class="display-cost"></span>travelers on trips today</div>
    </aside>
    <main>
      <div class="requests"><h3>New trip requests</h3>
      </div>
    </main>

  `);
  body.addClass('dashboard dashboard-agency')
  startUpAgencyView()

}


function userView(userID) {
  body.removeClass('log-in')
  const randomUser = Math.floor(Math.random() * 50)
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
  onStartup(randomUser)

}

function startUpAgencyView() {
  domUpdates.displayName('Agency');
  let userData = new FilterData();

  userData.getAgency()
    .then(agency => {
      console.log(agency.users)
      console.log(agency.getCurrentTrips(agency.getAllTrips()))
      domUpdates.agencyDisplayPending(agency.getCurrentTrips(agency.getAllTrips()))
      console.log(agency.getPendingTrips(agency.getAllTrips()))
    })

}

function onStartup(userID) {
  const bookTrip = $('.book-trip')
  let userData = new FilterData(userID)
  userData.getUser(userID)
    .then(user => {
      domUpdates.displayName(user.name)
      domUpdates.displaySpentThisYear(Math.round(user.getCostOfTripsThisYear()))
      domUpdates.displayPendingUpcoming(user.getUpcomingTrips())
      domUpdates.displayPast(user.getPastTrips())

      bookTrip.on('click', () => {
        // let selectedDestination, fp, numTravelers;
        userData.getDestinationsAndTrips()
          .then(data => {
            bookTrips(data)
          })

      })



    })
}

function bookTrips(data) {
  let results
  domUpdates.bookTrip(data.allDestinations)
  const tiles = $('.destination-tile');
  tiles.on('click', (event) => {
    results = getDetailsFromDOM(event, data)
  })
  const parentContainer = $('main')
  parentContainer.on('click', (event) => {
    if ($(event.target).hasClass('submit-request')) {
    let numTravelers = parseInt($('.num-travelers-input').val())
    const beginDate = moment(results[1].selectedDates[0]);
    const endDate = moment(results[1].selectedDates[1]);
    const duration = endDate.diff(beginDate, 'days')
    // user.requestTrip(Date.now(), selectedDestination.id, numTravelers, beginDate.format('YYYY/MM/DD'), duration)
    console.log(Date.now(), results[0].id, numTravelers, beginDate.format('YYYY/MM/DD'), duration)
    }
})
}

function getDetailsFromDOM(event, data) {
  let selectedDestination = domUpdates.selectDestination(event, data.allDestinations)
  domUpdates.selectTripDetails(selectedDestination);
  let fp = domUpdates.getDates(selectedDestination)
  let numTravelers = domUpdates.getTravelersNumber(selectedDestination, fp)
  return [selectedDestination, fp, numTravelers]
}
