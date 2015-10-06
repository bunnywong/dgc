// this is bun.js
jQuery(document).ready(function($){

	// Hide hour & min
	$('td.column-time').text(function() {
		var str = $(this).text();
		str = str.substring(0, str.length - 8);
		// return str; // DEBUG
	});

	// Calc intest points
	moment().zone("+08:00");
	var GLOBAL_INTEREST_RATE = 0.08;
	$('td[data-timestamp]').each(function() {
		var self   = $(this);
		var points = $(self).next('.column-creds').text();
		points     = points.replace(/\s/g, ''); // Remove space

		if (points != '') {
			var timestamp       = $(self).data(timestamp).timestamp;
			// timestamp           = timestamp;
			var dataDate        = moment.unix(timestamp ).hour(0).minute(0).second(0).seconds(0);
			var today           = moment().hour(0).minute(0).second(0).seconds(0);
			var dayDiff 	      = today.diff(dataDate, 'days');
			var dayInterestRate = dayDiff / 365 * GLOBAL_INTEREST_RATE;
			var interestPoints  = points * dayInterestRate;
			interestPoints      = interestPoints.toFixed(2);

			// Is saving
			if (points > 0 && interestPoints > 0) {
				$(self).next().next('.interest-points').text(interestPoints);
			}
		} else {
			// Server side render result
		}
	});

	// Calc interest points
	var arr = new Array();
	var sum = 0;

	$(".interest-points").each(function(){
	   var val = $(this).text();
	   if (val > 0 ) {
		   arr.push(parseFloat(val));
	   }
	});

	// Sum array (columns)
	for (i=0; i < arr.length; i++) {
		sum +=arr[i];
	}
	sum = Math.round(sum * 100) / 100;
	var html = '<strong>' + sum + '</strong>';
	$("p:contains('My total interest points')" ).append(' ' + html)
});
