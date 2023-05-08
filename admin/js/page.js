document.getElementById('genpage').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });

      loadAdminGen('ru','#genTextRu','#capTextRu');
  });

  document.getElementById('genproduct').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });

      loadAdminGenProduct('ru','#genProductTextRu');
      loadAdminGenProductName('ru','#genProductNameRu','1','+');
      
  });

  document.getElementById('atc').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });

      loadAdminGenAbout('ru','#genAboutTitleRu','#genAboutTextRu');
      loadAdminGenPlus('ru','#genCompanyPlusTitleRu','#genCompanyPlusDescriptionRu','1','+');
  });

  document.getElementById('history').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadHistoryAdmin('ru','#custom-nav-home2');
  });

  document.getElementById('partners').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadPartners('#custom-nav-home2');
  });

  function checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Пользователь авторизован
        console.log('Пользователь авторизован');
      } else {
        // Пользователь не авторизован
        console.log('Пользователь не авторизован');
        window.location.replace("auth/auth.html");
      }
    });
  }

  document.getElementById('contact').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      // loadPartners('#custom-nav-home2'); 
      loadContact('ru', '#cardPhoneRu','number');
      loadContact('ru', '#cardOtherRu','other');
      loadCardTitle('#TitleCardRu','#TitleCardEn','#TitleCardKz');
      loadCardAdres('#adressCardDownRu','#adressCardDownEn','#adressCardDownKz');
      loadCardSsil('#instaCard','#webCard');
  });
  document.getElementById('footer').addEventListener('click', function(event) {
    event.preventDefault(); // предотвращаем переход по ссылке
    fetch(this.href)
      .then(response => response.text())
      .then(data => {
        document.getElementById('pagediv').innerHTML = data;
      });
      loadRekvizidCardTitle('#RekvizidCardRu','#RekvizidCardEn','#RekvizidCardKz');
  });