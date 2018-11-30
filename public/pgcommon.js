// Show link contents in popup window
function popupWindow(url)
{
  var left = screen.width - 775;
  var top = 0;
  var w = window.open("", "popupWindow", "width=775, height=" + screen.height + ", scrollbars=yes, left=" + left + ", top=" + top + "");
  w.location.href = url;
}
