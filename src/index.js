import $ from 'jquery';
import './css/base.scss';
import domUpdates from './domUpdates'
import './images/book.png'
import './images/plus.png'
import './images/minus.png'
import './images/search.png'
import './images/close.png'
import DataRepo from './DataRepo';

const logInBtn = $('.log-in')
logInBtn.on('click', () => {
  let formResult = domUpdates.validateForm();
  if (formResult > 0) {
    userView(formResult)
  } else if (formResult === 0) {
    agencyView()
  }
})

let randomUser = Math.ceil(Math.random() * 50)
// console.log(randomUser)
// agencyView()
userView(30)

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
  userData.getUser(userID)
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
