import $ from 'jquery';
import './css/base.scss';
import User from './User';
import FilterData from './FilterData';
import domUpdates from './domUpdates'

const logInBtn = $('.log-in')
const body = $('body')

logInBtn.on('click', clearHTML)

function clearHTML() {
  body.removeClass('log-in')
  const randomUser = Math.floor(Math.random() * 50)
  onStartup(randomUser)
  body.html(`
    <header><h2>Travel Tracker</h2><h3 id="user-name"></h3></header>
    <aside><h3>Book a trip</h3></aside>
    <main>
      <div class="current"><h3>You have no current trips</h3></div>
      <div class="pending-upcoming"><h3>Pending and upcoming trips</h3></div>
      <div class="past"><h3>Past trips</h3></div>
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
    })
}
