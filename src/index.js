import $ from 'jquery';
import './css/base.scss';
import User from './User';
import FilterData from './FilterData';
import domUpdates from './domUpdates'
import './images/book.png'
var moment = require('moment');

const logInBtn = $('.log-in')
const body = $('body')

logInBtn.on('click', clearHTML)
console.log(moment().format())

function clearHTML() {
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

function onStartup(userID) {

  let userData = new FilterData(userID)
  userData.getUser(userID)
    .then(user => {
      console.log(user)
      domUpdates.displayName(user.name)
      console.log(user.getCostOfTripsThisYear())
      domUpdates.displaySpentThisYear(Math.round(user.getCostOfTripsThisYear()))
      console.log(user.getUpcomingTrips())
      console.log(user.getPastTrips())
      domUpdates.displayPendingUpcoming(user.getUpcomingTrips())
      domUpdates.displayPast(user.getPastTrips())
    })
}
