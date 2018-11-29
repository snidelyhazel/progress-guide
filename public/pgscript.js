var inputs = document.querySelectorAll('input, textarea');
for(var i=0;i<inputs.length;i++) {
  inputs[i].addEventListener('blur', function(){
    if(!this.checkValidity()) {
      this.classList.add('has-error');
    } else {
      this.classList.remove('has-error');
    }
  });
}

document.getElementById("is-in-group").addEventListener("change", function() {
  document.getElementById("progressive-group-row").style.display = (this.value == "yes") ? "" : "none";
})

document.getElementById("is-in-union").addEventListener("change", function() {
  document.getElementById("union-row").style.display = (this.value == "yes") ? "" : "none";
})

// Find representatives by zipcode

// Show popup window with House of Representatives search results
function repSearch()
{
  var left = screen.width - 775;
  var top = 0;
  var w = window.open("", "popupWindow", "width=775, height=" + screen.height + ", scrollbars=yes, left=" + left + ", top=" + top + "");
  w.location.href = "https://ziplook.house.gov/htbin/findrep_house?ZIP=" + ($("#zipcode").val());
}

$(document).ready(function()
{
  // Button click triggers popup window
  $("#ziplook").on("click", repSearch);

  // Enter key triggers popup window
  $('#zipcode').keypress(function(event)
  {
    // Enter key pressed
     if(event.which == 13)
     {
       repSearch();
     }
   });
});

//https://www.commoncause.org/find-your-representative/?gclid=CjwKCAiA0O7fBRASEiwAYI9QAgkcoiwXKLe2OqzRpjcz5gQHiLSs-IhuoOKEc73QhhysmvzqGQuk2xoCAkYQAvD_BwE
