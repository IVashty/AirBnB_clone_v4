#!/usr/bin/node
// jquery
import $ from 'jquery';
// Execute the script only when DOM is loaded
$(document).ready(function () {
  // Request the API status and update the div#api_status
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    // Initialize an empty dictionary to store the checked amenities
    const checkedAmenities = {};

    // Loop over each checked checkbox and add its ID and name to the dictionary
    $('input[type="checkbox"]:checked').each(function () {
      checkedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    });

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    const amenitiesList = Object.values(checkedAmenities).join(', ');
    if (amenitiesList) {
      $('div.amenities > h4').text(amenitiesList);
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});
