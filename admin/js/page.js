document.getElementById('genpage').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });

      loadAdminGen('ru','#geneditoropsinieru','#geneditorru');
  });