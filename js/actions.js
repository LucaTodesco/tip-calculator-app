var changeBill = 0;
var changeTipPerc = 0;
var changePerson = 0;
var changeTipCustom = 0;

$(document).ready(function() {

  $('.input_bill_focus').on('focusin', function() {
    if( !$(this).hasClass('error') ) {
      $('.input_bill_focus').addClass('input_bill_border_color');
    }
  });
  $('.input_bill_focus').on('focusout', function() {
    $('.input_bill_focus').removeClass('input_bill_border_color');
  });

  $('.input_person_focus').on('focusin', function() {
    if( !$(this).hasClass('error') ) {
      $('.input_person_focus').addClass('input_person_border_color');
    }
  });
  $('.input_person_focus').on('focusout', function() {
    $('.input_person_focus').removeClass('input_person_border_color');
  });

  $('.btn_tip').on('click', function() {
    $('.btn_tip').removeClass('active-btn');
    $(this).addClass('active-btn');
    changeTipPerc = $(this).html();
    calculate();
  });

  $('#input_bill').on('change', function() {
    changeBill = ( $(this).val() != '' ? $(this).val() : 0 );

    if( changeBill == 0 ) {
      $('#error_bill').html('Can\'t be zero');
      $('.input_bill_focus').addClass('error');
    }
    else if( changeBill < 0 ) {
      $('#error_bill').html('Can\'t be negative');
      $('.input_bill_focus').addClass('error');
    }
    else {
      $('#error_bill').html('');
      $('.input_bill_focus').removeClass('error');
    }

    if( changeBill == '' ) {
      $('#error_bill').html('');
      $('.input_bill_focus').removeClass('error');
    }

    calculate();
  });

  $('#input_people').on('change', function() {
    changePerson = ( $(this).val() != '' ? $(this).val() : 0 );

    if( changePerson == 0 ) {
      $('#error_person').html('Can\'t be zero');
      $('.input_person_focus').addClass('error');
    }
    else if( changePerson < 0 ) {
      $('#error_person').html('Can\'t be negative');
      $('.input_person_focus').addClass('error');
    }
    else {
      $('#error_person').html('');
      $('.input_person_focus').removeClass('error');
    }

    if( changePerson == '' ) {
      $('#error_person').html('');
      $('.input_person_focus').removeClass('error');
    }

    calculate();
  });

  $('#custom').on('change', function() {
    changeTipCustom = ( $(this).val() != '' ? $(this).val() : 0 );

    if( changeTipCustom < 0 ) {
      $('#error_custom').html('Can\'t be negative');
      $('#custom').addClass('error');
    }
    else {
      $('#error_custom').html('');
      $('#custom').removeClass('error');
    }

    if( changeTipCustom == '' ) {
      $('#error_custom').html('');
      $('#custom').removeClass('error');
    }

    calculate();
  });

  $('#btn_reset').on('click', function() {
    if( $(this).hasClass('active-reset') ) {
      $('#input_bill').val('');
      $('#error_bill').html('');
      $('.input_bill_focus').removeClass('error');

      $('.btn_tip').removeClass('active-btn');

      $('#custom').val('');
      $('#error_custom').html('');
      $('#custom').removeClass('error');

      $('#input_people').val('');
      $('#error_person').html('');
      $('.input_person_focus').removeClass('error');

      $('#total_tip').html('$0.00');
      $('#total_person').html('$0.00');

      $(this).removeClass('active-reset');
    }
  });

});


function calculate() {
  if( changeBill > 0 && ( changeTipPerc > 0 || changeTipCustom >= 0 ) && changePerson > 0 ) {
    changeTip = ( changeTipCustom != 0 ? changeTipCustom : changeTipPerc );

    var perc = ( changeBill * changeTip ) / 100;
    var tip_person = perc / changePerson;

    $('#total_tip').html('$' + tip_person.toFixed(2));

    var tot_person = ( changeBill / changePerson ) + tip_person;

    $('#total_person').html('$' + tot_person.toFixed(2));

    if( tip_person != 0 && tot_person != 0 ) {
      $('#btn_reset').addClass('active-reset');
    }
  }
}
