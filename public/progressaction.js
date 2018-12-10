function openJoin(anchor, event)
{
  popupWindow(anchor.href);
  event.preventDefault();
}

// Find representatives by zipcode

// Show popup window with House of Representatives search results
function localSearch(event)
{
  //popupWindow("https://ziplook.house.gov/htbin/findrep_house?ZIP=" + ($("#zipcode").val()));
  popupWindow($(event.target).attr('href'));
}

$(document).ready(function(event)
{
  // Button click triggers popup window
  $("#ziplook").on("click", localSearch);
  $("#pollLocatorLA").on("click", localSearch);
});
