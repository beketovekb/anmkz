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
      // loadAdminGenAbout('ru','#genAboutTitleRu','#genAboutTextRu');
      // loadAdminGenPlus('ru','#genCompanyPlusTitleRu','#genCompanyPlusDescriptionRu','1','+');
  });