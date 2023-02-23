#!/usr/bin/node
// jquery
import $ from 'jquery';
// Execute the script only when DOM is loaded
$(document).ready(function () {
  // Function to update the status of the API
  function updateApiStatus () {
    // Make a GET request to the API status endpoint
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  // Function to update the list of places
  function updatePlaces (amenities) {
    // Make a POST request to the places_search endpoint with the list of amenities
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenities }),
      success: function (data) {
        $('section.places').empty();
        for (const place of data) {
          const article = $('<article>');
          article.append($('<div>', { class: 'title' }).append($('<h2>').text(place.name)));
          article.append($('<div>', { class: 'price_by_night' }).text('$' + place.price_by_night));
          article.append($('<div>', { class: 'information' }).append($('<div>', { class: 'max_guest' }).append($('<i>', { class: 'fa fa-users fa-3x', 'aria-hidden': 'true' })).append('<br />' + place.max_guest + ' Guests')).append($('<div>', { class: 'number_rooms' }).append($('<i>', { class: 'fa fa-bed fa-3x', 'aria-hidden': 'true' })).append('<br />' + place.number_rooms + ' Bedrooms')).append($('<div>', { class: 'number_bathrooms' }).append($('<i>', { class: 'fa fa-bath fa-3x', 'aria-hidden': 'true' })).append('<br />' + place.number_bathrooms + ' Bathroom')));
          article.append($('<div>', { class: 'description' }).text(place.description));
          $('section.places').append(article);
        }
      }
    });
  }

  // Update the status of the API and the list of places
  updateApiStatus();
  updatePlaces([]);

  // Listen for changes on each input checkbox tag
  $('input[type=checkbox]').change(function () {
    const amenities = [];
    $('input[type=checkbox]:checked').each(function () {
      amenities.push($(this).attr('data-id'));
    });
    updatePlaces(amenities);
  });

  // Listen for clicks on the button tag
  $('button').click(function () {
    const amenities = [];
    $('input[type=checkbox]:checked').each(function () {
      amenities.push($(this).attr('data-id'));
    });
    updatePlaces(amenities);
  });
});
