import $ from 'jquery';

let domUpdates = {

  displayName(name) {
    const userName = $('#user-name')
    userName.text(name)
  }

}


export default domUpdates;
