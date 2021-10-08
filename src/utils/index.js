export default function formatDate(dateString) {
  // format date from datestring for display on frontend
  const displayDateObject = new Date(Date.parse(dateString));
  return displayDateObject.toLocaleString()
}
