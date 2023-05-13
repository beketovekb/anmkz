document.getElementById('applicationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var form = event.target;
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();

  xhr.open('POST', form.action, true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              alert( 'Application submitted successfully');
              form.reset();
          } else {
              alert('An error occurred while submitting the application.');
          }
      }
  };
  xhr.send(formData);
});
