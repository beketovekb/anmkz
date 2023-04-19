document.getElementById('genpage').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });

      database.ref('page/genpage/opisanie').once('value')
  .then((snapshot) => {
    const value = snapshot.val();
    console.log("Read");
    $('#geneditoropsinie').text(value);
  });
  });