export const time2Seconds = str => {
  let time = str, seconds = 0, miniSeconds = null;
  
  let dotIndex = str.indexOf( '.' );
  if (dotIndex !== -1) {
    time = str.slice(0, dotIndex);
    miniSeconds = '0' + str.slice(dotIndex);
  }

  let timeArr = time.split(':');
  if (timeArr.length > 0) {
    seconds += Number( timeArr[0] ) * 60;
  }

  if (timeArr.length > 1) {
    seconds += Number( timeArr[1] );
  }
  
  seconds += Number( miniSeconds );
  
  return seconds;
}