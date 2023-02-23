#!/usr/bin/node
//
import $ from 'jquery';
//  excutescript only when DOM is fully loaded.
$(document).ready(function () {
  const amenityDict = {};
  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    const amenityList = Object.values(amenityDict).join(', ');
    $('div.amenities > h4').text(amenityList);
  });
});
