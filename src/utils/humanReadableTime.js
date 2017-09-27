// Helper function to convert a timestamp to a human readable string
export default function humanReadableTime(timestamp) {
  function leadingZero(v) {
    return v < 10 ? '0'+v : v;
  }

  let stamp     = timestamp,
      date      = new Date(stamp),
      day       = date.getDate(),
      month     = date.getMonth()+1,
      year      = date.getFullYear(),
      hour      = date.getHours(),
      minute    = leadingZero(date.getMinutes()),
      humanTime = day+'.'+month+'.'+year+' '+hour+':'+minute;

  return humanTime;
}
