jQuery(document).ready(function($){

  $('#mycred-time').on('click', function() {
    $(this).datepicker({
      showWeek: true,
      firstDay: 1
    });
  });

});

