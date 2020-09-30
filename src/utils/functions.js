import moment from 'moment';

const TRACKER_ID = process.env.TRACKER_ID;

export const getTimeAgo = (datestring) => {
  moment.locale('de');
  let offset = moment().utcOffset();
  let getCurrentLocalTime = moment
    .utc(datestring)
    .utcOffset(offset)
    .format();
  return moment(getCurrentLocalTime, 'YYYY-MM-DD hh:mm:ss +ZZ').fromNow();
};

export const formatDateTime = (datestring) => {
  let date = new Date(datestring);
  date = moment(date)
    .locale('de')
    .format('DD.MM.YYYY, HH:mm');
  return date;
};

export const formatDateTimeShort = (datestring) => {
  let date = new Date(datestring);
  date = moment(date)
    .locale('de')
    .format('DD.MM.YYYY');
  return date;
};

export const formatDateTimeVeryShort = (datestring) => {
  let date = new Date(datestring);
  date = moment(date)
    .locale('de')
    .format('DD.MM.YY');
  return date;
};

export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const checkHashtag = (hashtag) => {
  let tag = hashtag.replace(/[`~!@#$%§^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '');
  tag = `#${tag}`;
  return tag;
};

export const getCategory = (theme) => {
  let tag = theme.toLowerCase();
  //  tag = `#${tag}`;
  return tag;
};

export const numberWithDots = (num) => {
  const result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return result;
};

export const convertToLowerCase = (string) => {
  const result = string.toLowerCase();
  return result;
};

export const shuffleArray = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const truncateString = (string, len) => {
  let result = string;

  if (string.length > len) {
    result = string.substring(0, len) + '...';
  }

  return result;
};

export const saveUserInfo = (field, value) => {
  localStorage.setItem(field, value);
};

export const getUserInfo = () => {
  const nickname = localStorage.getItem('rbm_nickname') || '';
  const email = localStorage.getItem('rbm_email') || '';

  return { nickname, email };
};

export const loadEtrackerScript = (callback) => {
  let script = document.createElement('script');

  script.src = '//static.etracker.com/code/e.js';
  script.id = '_etLoader';
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.setAttribute('data-respect-dnt', 'true');
  script.setAttribute('data-secure-code', 'NU3GCm');

  if (script.readyState) {
    //IE
    script.onreadystatechange = function() {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Others
    script.onload = function() {
      callback();
    };
  }

  let head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
};

export const deactivateScroll = () => {
  document.body.style.height = '100%';
  document.body.style.overflow = 'hidden';
};

export const reactivateScroll = () => {
  document.body.style.height = '';
  document.body.style.overflow = '';
};
