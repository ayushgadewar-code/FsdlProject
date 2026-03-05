// jquery.js
$(function () {

// Replace click-based demo with form submit demo to avoid conflict with validation
$('#registrationForm').on('submit', function (e) {
  var $btn = $('#submitBtn');
  var original = $btn.text();
  $btn.text('Processing...');
  $btn.prop('disabled', true);
  setTimeout(function () {
    $btn.text(original);
    $btn.prop('disabled', false);
  }, 900);
  // Do not call preventDefault here — validation.js controls actual prevention.
});

  // 2) Set background-image using jQuery
  $('body').css({
    'background-image': 'url("assets/images/bg.jpg")',
    'background-size': 'cover',
    'background-attachment': 'fixed'
  });

  // 3) Access HTML form data using jQuery and display it (demonstrates .serialize() and .val())
  $('#showFormDataBtn').on('click', function (e) {
    e.preventDefault();
    var data = $('#registrationForm').serialize(); // serialized string
    var obj = {};
    $('#registrationForm').find('input').each(function () {
      var id = $(this).attr('id');
      obj[id] = $(this).val();
    });
    console.log('Form (jQuery) serialized:', data);
    console.log('Form (jQuery) object:', obj);

    // Optionally also show via DOM output area (keeps consistent UX)
    var outputDiv = $('#formOutput');
    outputDiv.html('<h3>Form Data (via jQuery)</h3>' +
      '<p><strong>Username:</strong> ' + (obj.username || '') + '</p>' +
      '<p><strong>Email:</strong> ' + (obj.email || '') + '</p>' +
      '<p><strong>Phone:</strong> ' + (obj.phone || '') + '</p>');
  });

  // 4) Add attribute using jQuery
  $('#featureImage').attr('title', 'Student feature image');
  $('#submitBtn').attr('data-assignment', 'assignment-3');

// Extra: change text of swap button for clarity
$('#changeImageBtn').text('Swap Image');

// Add attribute to logo image
$("#magicImage").attr("title","Magic Image");

});
