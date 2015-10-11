jQuery(document).ready(function($){
  $('.js-interest-rate, .js-withdraw-date, .js-mycred-date').change(function() {
      var withDrawDate       = $('.js-withdraw-date').val();
      if (withDrawDate == '') {
        $('.js-interest-points').val( '' );
        $('.js-withdraw-points-total').val( '' );
        $('.js-withdraw-entry').val( '' );
        return false;
      }

      var depositDate        = $('.js-mycred-date').val();
      withDrawDate           = moment(withDrawDate, 'YYYY-MM-DD');
      depositDate            = moment(depositDate, 'YYYY-MM-DD');
      var points             = $('.js-mycred-creds').val();
      var dayGap             = withDrawDate.diff(depositDate, 'days');
      var interestRate       = $('.js-interest-rate').val();
      interestRate           = parseFloat(interestRate) / 100.0;
      var totalInterestPoints = (points * interestRate) / 365 * dayGap;
      totalInterestPoints     = Math.round(totalInterestPoints * 100) / 100;
      totalInterestPoints > 0 ? totalInterestPoints = totalInterestPoints : totalInterestPoints = 0; // Validator

      // Update interest points
      $('.js-interest-points').val( totalInterestPoints );

      var total = parseFloat(points) + parseFloat(totalInterestPoints);
      if (total > 0)
        $('.js-withdraw-points-total').val( total );
  });

});

