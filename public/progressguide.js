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

// Find representatives by zipcode

// Show popup window with House of Representatives search results
function repSearch()
{
  popupWindow("https://ziplook.house.gov/htbin/findrep_house?ZIP=" + ($("#zipcode").val()));
}

$(document).ready(function(event)
{

  // Button click triggers popup window
  $("#ziplook").on("click", repSearch);

  // Enter key triggers popup window
  $('#surveyform').find('input').keypress(function(event)
  {
    // Enter key pressed
     if(event.which == 13)
     {
       goToNextSection(true, false);
       event.preventDefault();
     }
   });

  const surveySections = [$('#section1'), $('#section2'), $('#section3'), $('#section4'), $('#section5'), $('#section6'),];
  let currentSection = 0;

  surveySections[currentSection].removeAttr('hidden');

  function checkValidity()
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

    const checkContains = surveySections[currentSection].find(".checkcontain.required");
    for (const checkContain of checkContains)
    {
      if ($(checkContain).find(':checkbox:checked').length == 0)
      {
        anyInvalidInputs = true;
      }
    }

    return anyInvalidInputs;
  }

  function goToNextSection(direction, debug)
  {
    if (direction)
    {
      const anyInvalidInputs = checkValidity();

      if (!anyInvalidInputs || debug)
      {
        surveySections[currentSection].attr('hidden', '');
        currentSection++;

        // If user is not eligible to vote by dint of age, don't display the voter status and political affiliation inputs.
        if (currentSection == 3)
        {
          if (parseInt($('#age').val()) < 16)
          {
            currentSection++;
          }
          else
          {
            // If user is eligible to preregister to vote.
            if (parseInt($('#age').val()) < 18)
            {
              $("#preregRow").css({'display': ''});
            }
            else
            {
              $("#voterstatusRow").css({'display': ''});
            }
          }
        }

        $('#backButton').removeAttr('hidden');
        if (currentSection == surveySections.length - 1)
        {
          $('#continueButton').attr('hidden', '');
          $('#submitButton').removeAttr('hidden');
        }

        surveySections[currentSection].removeAttr('hidden');
        $('#intro').attr('hidden', '');
      }
    }
    else
    {
      surveySections[currentSection].attr('hidden', '');
      currentSection--;

      // If user is not eligible to vote by dint of age, don't display the voter status and political affiliation inputs.
      if (currentSection == 3)
      {
        if (parseInt($('#age').val()) < 16)
        {
          currentSection--;
        }
      }

      if (currentSection == 0)
      {
        $('#backButton').attr('hidden', '');
        $('#intro').removeAttr('hidden');
      }

      $('#continueButton').removeAttr('hidden');
      $('#submitButton').attr('hidden', '');
      surveySections[currentSection].removeAttr('hidden');
    }
  }

  function submitSurvey(event)
  {
    const anyInvalidInputs = checkValidity();
    if (anyInvalidInputs)
    {
      event.preventDefault();
      return false;
    }
  }

  $('#surveyform').submit(submitSurvey);
  $('#submitButton').on("click", submitSurvey);

  document.documentElement.addEventListener('keypress', function(event)
  {
    if (event.key == '`' || event.key == '~')
    {
      goToNextSection(true, true);
    }
  });

  $('#backButton').on("click", () => goToNextSection(false, false));
  $('#continueButton').on("click", () => goToNextSection(true, false));

  $('#voterstatus').on("change", function()
  {
    if ($('#voterstatus').val() === 'yes')
    {
      $('#voteraffiliation').css({'display': ''});
    }
    else
    {
      $('#voteraffiliation').css({'display': 'none'});
    }
  })


  // Register to vote
  // https://registertovote.ca.gov/
  //$("#registertovote").on("click", popupWindow("https://registertovote.ca.gov/");


});

//https://developers.google.com/civic-information/
//https://www.opensecrets.org/elections/
//https://openstates.org/find_your_legislator/
