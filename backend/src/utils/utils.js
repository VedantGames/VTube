const timePassed = createdTime => {
  const times = [60, 60, 24, 7, 4.5, 12];
  const abbs = ['seconds', 'munites', 'hours', 'days', 'weeks', 'months', 'years'];

  var timePassed = (new Date().getTime() - new Date(createdTime).getTime()) / 1000; var ttp = '';

  for (var i = 0; i < times.length; i++) {
      if (timePassed < times[i]) 
          return Math.round(timePassed) + ' ' + abbs[i];
      timePassed = Math.round(timePassed / times[i]);
  }
}

const calcDuration = duration => {
  var sec = duration % 60;
  duration = (duration - sec) / 60;
  var munite = duration % 60;
  duration = (duration - munite) / 60;
  var hours = duration % 24;
  duration = (duration - hours) / 24;
  var days = duration;

  var secS = sec.toString();
  if (sec < 10) secS = '0' + secS;

  var muniteS = munite.toString();
  if (munite < 10 && hours > 0) muniteS = '0' + muniteS;

  var t = (days != 0 ? days + ':' : '') + (hours != 0 ? hours + ':' : '') + (munite != 0 ? muniteS + ':' : '') + secS;

  return t;
}

module.exports = {
  timePassed,
  calcDuration
}