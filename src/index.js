import $ from 'jquery';
import './css/base.scss';
import domUpdates from './domUpdates'
import './images/book.png'
import './images/plus.png'
import './images/minus.png'
import './images/search.png'
import './images/close.png'

const logInBtn = $('.log-in')
logInBtn.on('click', () => {
  let formResult = domUpdates.validateForm();
  if (formResult > 0) {
    domUpdates.userView(formResult)
  } else if (formResult === 0) {
    domUpdates.agencyView()
  }
})
