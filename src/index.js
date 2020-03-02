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
const randomUser = Math.ceil(Math.random() * 50)

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
userView(randomUser)

function agencyView() {
  domUpdates.addAgencyHTML()
  let userData = new DataRepo();
  userData.getAgency()
    .then(agency => {
      domUpdates.showEarned(agency.incomeGenerated(agency.getAllTrips()))
      domUpdates.displayCurrentTravelers(agency.getCurrentTrips(agency.getAllTrips()).length)
      domUpdates.agencyDisplayPending(agency.getAllPendingTrips(agency.getAllTrips()))
      domUpdates.approveOrDeny(agency)
      searchForUser(agency)
    })
    .catch(error => console.log(error.message))
}

function userView(userID) {
  domUpdates.addUserHTML()
  const bookTrip = $('.book-trip')
  let userData = new DataRepo(userID)
  userData.getUser(userID)
    .then(user => {
      domUpdates.displayName(user.name)
      domUpdates.displaySpentThisYear(Math.round(user.getCostOfTripsThisYear()))
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
    .catch(error => console.log(error.message))
}

function searchForUser(agency) {
  const search = $('.search');
  const requests = $('.requests')
  search.on('keyup', () => {
    if (search.val() === '') {
      domUpdates.agencyDisplayPending(agency.getAllPendingTrips(agency.getAllTrips()))
    } else {
    let searchResults = searchByName(agency)
    domUpdates.displaySearchResults(searchResults)
    const searchResultsCards = $('.search-results-card')
    searchResultsCards.on('click', event => {
      loadUserProfile(event, agency)
    })
    }
  })
}

function searchByName(agency) {
  const search = $('.search');
  return agency.users.filter(user => {
    return search.val().toLowerCase() === user.name.slice(0, search.val().length).toLowerCase() || search.val().toLowerCase() === user.name.split(' ')[1].slice(0, search.val().length).toLowerCase()
  })
}

function loadUserProfile(event, agency) {
  agency.accessUserInfo(agency.users.find(user => user.id === parseInt($(event.target).parent()[0].id.split('-')[2])))
  domUpdates.setUpUserProfile(agency)
  const pendingUpcomingTrips = agency.getUpcomingTrips().concat(agency.getPendingTrips())
  pendingUpcomingTrips.sort((a, b) => {
    return moment(a.date) - moment(b.date)
  })
  domUpdates.showUserProfileTrips(pendingUpcomingTrips)
  domUpdates.approveDeleteUserProfile(agency)
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
