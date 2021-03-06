/**
 * myCRED Edit Log Scripts
 * These scripts are used to edit or delete entries
 * in the myCRED Log.
 * @since 1.4
 * @version 1.1
 */
jQuery(function($) {

	/**
	 * Click To Toggle Script
	 */
	$( '.click-to-toggle' ).click(function(){
		var target = $(this).attr( 'data-toggle' );
		$( '#' + target ).toggle();
	});

	/**
	 * Delete Log Entry AJAX caller
	 */
	var mycred_delete_log_entry = function( rowid, button ) {
		$.ajax({
			type       : "POST",
			data       : {
				action    : 'mycred-delete-log-entry',
				token     : myCREDLog.tokens.delete_row,
				row       : rowid
			},
			dataType   : "JSON",
			url        : myCREDLog.ajaxurl,
			success    : function( response ) {
				// Debug
				//console.log( response );

				var parentrow = button.parent().parent().parent();
				var actioncol = button.parent().parent();

				if ( response.success ) {
					actioncol.empty();
					actioncol.text( response.data );

					parentrow.addClass( 'deleted-row' );
					parentrow.fadeOut( 3000, function(){ parentrow.remove(); });
				}
				else {
					actioncol.empty();
					actioncol.text( response.data );
				}
			},
			error      : function( jqXHR, textStatus, errorThrown ) {
				// Debug
				//console.log( jqXHR );
				//console.log( 'textStatus: ' + textStatus + ' | errorThrown: ' + errorThrown );
			}
		});
	}

	/**
	 * Log Entry Deletion Trigger
	 */
	$( '.mycred-delete-row' ).click(function(){
		// Require user to confirm deletion
		if ( ! confirm( myCREDLog.messages.delete_row ) )
			return false;

		// Execute AJAX call
		mycred_delete_log_entry( $(this).attr( 'data-id' ), $(this) );
	});

	var log_row_id = '';
	var log_user = '';
	var log_time = '';
	var log_cred = '';

	var log_entry_raw = '';
	var log_entry = '';

	/**
	 * Setup Log Editor Modal
	 */
	$('#edit-mycred-log-entry').dialog({
		dialogClass : 'mycred-edit-log-entry',
		draggable   : true,
		autoOpen    : false,
		title       : myCREDLog.title,
		closeText   : myCREDLog.close,
		modal       : true,
		width       : 500,
		height      : 'auto',
		resizable   : false,
		show        : {
			effect     : 'slide',
			direction  : 'up',
			duration   : 250
		},
		hide        : {
			effect     : 'slide',
			direction  : 'up',
			duration   : 250
		}
	});

	/**
	 * Edit Modal Trigger
	 */
	$( '.mycred-open-log-entry-editor' ).click( function() {

		// Get the details we want to show
		log_row_id = $(this).attr( 'data-id' );
		log_user = $(this).parent().siblings( 'td.column-username' ).children( 'span' ).text();
		log_time = $(this).parent().siblings( 'td.column-time' ).text();
		log_cred = $(this).parent().siblings( 'td.column-creds' ).text();

		log_entry_raw = $(this).parent().siblings( 'td.column-entry' ).children( 'div.raw' ).text();
		log_entry = $(this).parent().siblings( 'td.column-entry' ).children( 'div.entry' ).text();

		// Show the modal window
		$( '#edit-mycred-log-entry' ).dialog( 'open' );

		// Populate the form
		var username_el = $( '#edit-mycred-log-entry #mycred-username' );
		username_el.empty();
		username_el.text( log_user );

		// ==================================================
    /* My Custom JS
     * Override date & creds
    */

    var time_input_el = $( '#edit-mycred-log-entry .js-mycred-date' );
  	var log_date = log_time;
    log_date = log_date.substring(0, (log_date.length - 8));

    // Init date
    function zeroPad(i) {
      return (i < 10 ? '0' : '') + i
    }
    var log_date = new Date(log_date);
    var year = log_date.getFullYear();
    var month = zeroPad(log_date.getMonth() + 1);
    var date = zeroPad(log_date.getDate());

    time_input_el.val( year + '-' + month + '-' + date );

    // Data picker
    $('.js-date-picker').datepicker({
      showWeek: true,
      firstDay: 1,
      dateFormat: "yy-mm-dd",
    });

		// Init Credit
    var creds_el = $( '#edit-mycred-log-entry .js-mycred-creds' );
    creds_el.val( log_cred );

// ================================================================================
  // @Edit Log Entry
  // Insert custom value when dialog pop up

  var withdrawTime           = $(this).parent().parent('.js-data-row').data('withdraw-time');
  var withdrawPointsInterest = $(this).parent().parent('.js-data-row').data('withdraw-points-interest');
  var withdrawPointsTotal    = $(this).parent().parent('.js-data-row').data('withdraw-points-total');
  var withdrawEntry          = $(this).parent().parent('.js-data-row').data('withdraw-entry');
  var withdrawPaymentStatus  = $(this).parent().parent('.js-data-row').data('withdraw-payment-status');

console.log('withdrawPaymentStatus: (' + withdrawPaymentStatus + ')');

  // Display interest data depend on interest date
  if (withdrawTime == 0) {
    withdrawTime = '';
  } else {
    withdrawTime = moment.unix(withdrawTime).format('YYYY-MM-DD');
  }

  if (withdrawPointsInterest == 0)
    withdrawPointsInterest = '';

  if (withdrawPointsTotal == 0)
    withdrawPointsTotal = '';

  $('.js-withdraw-date').val(withdrawTime);
  $('.js-interest-points').val(withdrawPointsInterest);
  $('.js-withdraw-points-total').val(withdrawPointsTotal);
  $('.js-withdraw-entry').val(withdrawEntry);
  if (withdrawPaymentStatus == null || withdrawPaymentStatus == '' ) {
    $('.js-withdraw-payment-status.none').prop('checked', 'checked');
  } else {
    $('.js-withdraw-payment-status.' + withdrawPaymentStatus).prop('checked', 'checked');
  }

// ================================================================================

		var entry_el = $( '#edit-mycred-log-entry #mycred-raw-entry' );
		entry_el.val( '' );
		entry_el.val( log_entry );

		var raw_entry_el = $( '#edit-mycred-log-entry #mycred-new-entry' );
		raw_entry_el.val( '' );
		raw_entry_el.val( log_entry_raw );

		$( 'input#mycred-log-row-id' ).val( log_row_id );

	});

	/**
	 * Edit AJAX Call
	 */
	var mycred_update_log_entry = function( rowid, formData, button ) {
		var button_label = button.val();

		$.ajax({
			type       : "POST",
			data       : {
        action                 : 'mycred-update-log-entry',
        token                  : myCREDLog.tokens.update_row,
        row                    : rowid,
        new_entry              : formData.entry,
        credit                 : formData.credit,
        time                   : formData.time,
        withdrawDate           : formData.withdrawDate,
        withdrawInterestRate   : formData.withdrawInterestRate,
        withdrawInterestPoints : formData.withdrawInterestPoints,
        withdrawPointsTotal    : formData.withdrawPointsTotal,
        withdrawEntry          : formData.withdrawEntry,
        withdrawPaymentStatus  : formData.withdrawPaymentStatus,
			},
			dataType   : "JSON",
			url        : myCREDLog.ajaxurl,
			beforeSend : function() {
				button.removeClass( 'button-primary' );
				button.addClass( 'button-secondary' );
				button.val( myCREDLog.working );
			},
			success    : function( response ) {
				// Debug
				// console.log( response );
        console.log(response.data);

				var effected_row = $( '#mycred-log-entry-' + response.data.row_id );
				button.removeClass( 'button-secondary' );

				if ( response.success ) {

					effected_row.addClass( 'updated-row' );
					effected_row.children( 'td.column-entry' ).children( 'div.raw' ).empty().html( response.data.new_entry_raw );

					$( '#edit-mycred-log-entry #mycred-raw-entry' ).val( response.data.new_entry );

					effected_row
            .children( 'td.column-entry' )
            .children( 'div.entry' ).empty().html( response.data.new_entry );
          effected_row
            .children( 'td.column-time' ).text(response.data.new_time);


					$( '#edit-mycred-log-entry #mycred-new-entry' ).val( response.data.new_entry_raw );

					button.val( response.data.label );
					setTimeout(function(){ button.val( button_label ); button.addClass( 'button-primary' ); }, 5000 );
				}
				else {
					button.val( response.data );
					setTimeout(function(){ button.val( button_label ); button.addClass( 'button-primary' ); }, 5000 );
				}
			},
			error      : function( jqXHR, textStatus, errorThrown ) {
				// Debug
				//console.log( jqXHR );
				//console.log( 'textStatus: ' + textStatus + ' | errorThrown: ' + errorThrown );
			}
		});
	}

	/**
	 * Edit AJAX Call Trigger
	 */
	$( '#mycred-update-log-entry' ).click( function() {
    var data = {
      credit                 : $( 'input.js-mycred-creds' ).val(),
      time                   : $( 'input.js-mycred-date' ).val(),
      entry                  : $( 'input#mycred-new-entry' ).val(),
      withdrawDate           : $( 'input.js-withdraw-date' ).val(),
      withdrawInterestRate   : $( 'input.js-interest-rate' ).val(),
      withdrawInterestPoints : $( 'input.js-interest-points' ).val(),
      withdrawPointsTotal    : $( 'input.js-withdraw-points-total' ).val(),
      withdrawEntry          : $( 'input.js-withdraw-entry' ).val(),
      withdrawPaymentStatus  : $( 'input.js-withdraw-payment-status:checked' ).val(),
    }
    console.log('data:' + data);
		mycred_update_log_entry( $(this).next().val(), data, $(this) );
	});

	/* global setUserSetting, ajaxurl, commonL10n, alert, confirm, toggleWithKeyboard, pagenow */
	var showNotice, adminMenu, columns, validateForm, screenMeta;

	// Removed in 3.3.
	// (perhaps) needed for back-compat
	adminMenu = {
		init : function() {},
		fold : function() {},
		restoreMenuState : function() {},
		toggle : function() {},
		favorites : function() {}
	};

	// show/hide/save table columns
	columns = {
		init : function() {
			var that = this;
			$('.hide-column-tog', '#adv-settings').click( function() {
				var $t = $(this), column = $t.val();
				if ( $t.prop('checked') )
					that.checked(column);
				else
					that.unchecked(column);

				columns.saveManageColumnsState();
			});
		},

		saveManageColumnsState : function() {
			var hidden = this.hidden();
			$.post(ajaxurl, {
				action: 'hidden-columns',
				hidden: hidden,
				screenoptionnonce: $('#screenoptionnonce').val(),
				page: pagenow
			});
		},

		checked : function(column) {
			$('.' + column).show();
			this.colSpanChange(+1);
		},

		unchecked : function(column) {
			$('.' + column).hide();
			this.colSpanChange(-1);
		},

		hidden : function() {
			return $('.manage-column').filter(':hidden').map(function() { return this.id; }).get().join(',');
		},

		useCheckboxesForHidden : function() {
			this.hidden = function(){
				return $('.hide-column-tog').not(':checked').map(function() {
					var id = this.id;
					return id.substring( id, id.length - 5 );
				}).get().join(',');
			};
		},

		colSpanChange : function(diff) {
			var $t = $('table').find('.colspanchange'), n;
			if ( !$t.length )
				return;
			n = parseInt( $t.attr('colspan'), 10 ) + diff;
			$t.attr('colspan', n.toString());
		}
	};

	$(document).ready(function(){columns.init();});
});
