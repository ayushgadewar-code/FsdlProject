// jquery.js
$(function () {

  // 1) Change submit button text briefly (demonstrates jQuery text())
$('#submitBtn').on('click', function () {
    var $btn = $(this);
    var original = $btn.text();

    $btn.text('Processing...');

    setTimeout(function () {
        $btn.text(original);
    }, 900);
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

  $("#logo").attr("title","Magic Image");


});
