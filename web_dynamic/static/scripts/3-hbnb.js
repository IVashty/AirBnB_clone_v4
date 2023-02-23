#!/usr/bin/node
// jquery
import $ from 'jquery';
//
$(document).ready(function () {
  // check for the api_status element every second
  setInterval(function () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
      // if the API status is "OK", add the "available" class to the api_status element
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        // if the API status is not "OK", remove the "available" class from the api_status element
        $('DIV#api_status').removeClass('available');
      }
    });
  }, 1000);

  // send a POST request to /api/v1/places_search with an empty dictionary as the request body
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    success: function (data) {
      // iterate over each place returned by the API and create an article element to display it
      for (const place of data) {
        const article = $('<article>');
        const title = $('<div class="title">').append(
          $('<h2>').text(place.name),
          $('<div class="price_by_night">').text(`$${place.price_by_night}`)
        );
        const information = $('<div class="information">').append(
          $('<div class="max_guest">').append(
            $('<i class="fa fa-users fa-3x" aria-hidden="true"></i>'),
            $('<br>'),
            `${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`
          ),
          $('<div class="number_rooms">').append(
            $('<i class="fa fa-bed fa-3x" aria-hidden="true"></i>'),
            $('<br>'),
            `${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`
          ),
          $('<div class="number_bathrooms">').append(
            $('<i class="fa fa-bath fa-3x" aria-hidden="true"></i>'),
            $('<br>'),
            `${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`
          )
        );
        const description = $('<div class="description">').text(place.description);
        article.append($('<div class="image">').append($('<img>').attr('src', place.picture)));
        article.append($('<div class="content">').append(title, information, description));
        $('section.places').append(article);
      }
    }
  });
});
