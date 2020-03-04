import $ from 'jquery';
import './css/base.scss';
import domUpdates from './domUpdates'
import './images/book.png'
import './images/plus.png'
import './images/minus.png'
import './images/search.png'
import './images/close.png'
import DataRepo from './DataRepo';


function startUp() {
  let formResult = domUpdates.validateForm();
  if (formResult > 0) {
    userView(formResult)
  } else if (formResult === 0) {
    agencyView()
  }
}

const input = $('input')

input.on('keyup', () => {
  if (event.which === 13) {
    startUp()
  }
})

const logInBtn = $('.log-in')

logInBtn.on('click', () => {
  startUp()
})


function agencyView() {
  domUpdates.addAgencyHTML()
  let userData = new DataRepo();
  userData.getAgency()
    .then(agency => {
      domUpdates.clickLogoReturnHomeAgency(agency)
      domUpdates.showEarned(agency.getRevenueFromAllNonPendingTripsThisYear(agency.getAllTrips()))
      domUpdates.displayCurrentTravelers(agency.getCurrentTrips(agency.getAllTrips()).length)
      domUpdates.agencyDisplayPending(agency.getAllPendingTrips(agency.getAllTrips()))
      domUpdates.approveOrDeny(agency)
      domUpdates.searchForUser(agency)
    })
    .catch(error => console.log(error.message))
}

function userView(userID) {
  domUpdates.addUserHTML()
  domUpdates.addUserDashboardHTML()
  let userData = new DataRepo(userID)
  userData.getUser()
    .then(user => {
      domUpdates.clickLogoReturnHomeUser(user)
      domUpdates.displayName(user.name)
      domUpdates.displaySpentThisYear(Math.round(user.getCostOfTripsThisYear()))
      domUpdates.displayPendingUpcoming(user.getPendingTrips().concat(user.getUpcomingTrips()))
      domUpdates.displayPast(user.getPastTrips())
      domUpdates.displayCurrent(user.getCurrentTrips())
      const bookTrip = $('.book-trip')
      bookTrip.on('click', () => {
        userData.getDestinations()
          .then(data => {
            domUpdates.launchBookTripsView(data, user)
          })
      })
    })
    .catch(error => console.log(error.message))
}
