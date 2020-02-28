import $ from 'jquery';
import './css/base.scss';
import User from './User';
import FilterData from './FilterData';
import domUpdates from './domUpdates'
import './images/book.png'
var moment = require('moment');

const userName = $('.user-name')
const password = $('password')
const logInBtn = $('.log-in')
const body = $('body')

// logInBtn.on('click', () => {
//   const regex = /^traveler([1-9]|[1-4][0-9]|50)$/;
//   if (regex.test(userName.val()) && password.val('travel2020')) {
//     const userID = parseInt(userName.val().replace( /^\D+/g, ''))
//     clearHTML(userID);
//   } else if (userName.val('agency') && password.val('travel2020')) {
//     agencyView()
//   }
// })

agencyView()

function agencyView() {
  body.removeClass('log-in')
  body.html(`
    <header><h2>Travel Tracker</h2><h3 id="user-name"></h3></header>
    <aside>
      <div class="spent-container"><span id="spent-this-year"></span>in income generated <br> this year</div>
      <div class="spent-container"><span id="spent-this-year"></span>travelers on trips today</div>
    </aside>
    <main>
      <div class="requests"><h3>New trip requests</h3>
      <div class="trip-card"><span class="destination trip-req">Destination</span><span class="date trip-req">Date</span><span class="travelers trip-req">Travelers</span><button class="agency-btn" type="button">Approve</button><button class="agency-btn" type="button">Deny</button></div>
      </div>
    </main>

  `);
  body.addClass('dashboard dashboard-agency')
  startUpAgencyView()

}


function clearHTML(userID) {
  body.removeClass('log-in')
  const randomUser = Math.floor(Math.random() * 50)
  onStartup(randomUser)
  body.html(`
    <header><h2>Travel Tracker</h2><h3 id="user-name"></h3></header>
    <aside>
      <div class="spent-container"><span id="spent-this-year"></span>spent on trips this year</div>
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
}

function startUpAgencyView() {
  domUpdates.displayName('Agency');
  let userData = new FilterData()
  console.log(userData)
}

function onStartup(userID) {

  let userData = new FilterData(userID)
  userData.getUser(userID)
    .then(user => {
      domUpdates.displayName(user.name)
      domUpdates.displaySpentThisYear(Math.round(user.getCostOfTripsThisYear()))
      domUpdates.displayPendingUpcoming(user.getUpcomingTrips())
      domUpdates.displayPast(user.getPastTrips())
    })
}
