import $ from 'jquery';
import './css/base.scss';

const logInBtn = $('.log-in')
const body = $('body')

console.log(body)

logInBtn.on('click', clearHTML)

function clearHTML() {
  body.removeClass('log-in')
  body.html(`
    <h2>Welcome to your dashboard</h2>

  `);
  body.addClass('dashboard')
}
