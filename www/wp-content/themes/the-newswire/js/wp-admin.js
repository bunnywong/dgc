jQuery(document).ready(function($){
  $('.js-withdraw-date, .js-mycred-date').change(function() {
      var withDrawDate       = $('.js-withdraw-date').val();
      var depositDate        = $('.js-mycred-date').val();
      withDrawDate           = moment(withDrawDate, 'YYYY-MM-DD');
      depositDate            = moment(depositDate, 'YYYY-MM-DD');
      var points             = $('.js-mycred-creds').val();
      var dayGap             = withDrawDate.diff(depositDate, 'days');
      var interestRate       = $('.js-interest-rate').val();
      interestRate           = parseFloat(interestRate) / 100.0;
      var totalInterestPoint = (points * interestRate) / 365 * dayGap;
      totalInterestPoint     = Math.round(totalInterestPoint * 100) / 100;



      $('.js-interest-points').val( dayGap + ' days / Interest Points ' + totalInterestPoint);

console.log('Answer: ' + dayGap * interestRate);
  });
});

