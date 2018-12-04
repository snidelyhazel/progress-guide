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
  popupWindow("https://ziplook.house.gov/htbin/findrep_house?ZIP=" + ($("#zipcode").val()));
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

  const surveySections = [$('#section1'), $('#section2'), $('#section3'), $('#section4'), $('#section5'),$('#section6'),];
  let currentSection = 0;

  surveySections[currentSection].removeAttr('hidden');

  $('#continueButton').on("click", function(event)
  {
    // Find inputs and selectors.
    const inputsOnThisSection = surveySections[currentSection].find("input, select");
    let anyInvalidInputs = false;
    for (const input of inputsOnThisSection)
    {
      // Use built-in validation. https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/checkValidity
      if (!input.checkValidity())
      {
        anyInvalidInputs = true;
        // Use built-in notification. https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity
        input.reportValidity();
      }
    }

    if (!anyInvalidInputs)
    {
      surveySections[currentSection].attr('hidden', '');
      currentSection++;
      surveySections[currentSection].removeAttr('hidden');
    }
  });
});

//https://developers.google.com/civic-information/
//https://www.opensecrets.org/elections/
//https://openstates.org/find_your_legislator/
