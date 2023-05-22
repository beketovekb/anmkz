const database = firebase.database();
// database.ref('page/genpage/opisanie').on('value', (snapshot) => {
// 	const value = snapshot.val();
// 	console.log(value);
// 	$('#geneditoropsinie').text(value);
//   });


function loadLng() {
  myValue = 'ru';
  if (localStorage.getItem("glblng") != null) { myValue = localStorage.getItem("glblng"); }
  //alert(myValue);
  gentt();
  readico(myValue);
  loadAdminGenProduct(myValue, 'titleProduct');
  loadAdminGenAbout(myValue, 'aboutTitle', 'aboutDescription')
  loadAdminGenProductName(myValue, 'genProductName', '1', '+');
  database.ref('aboutImg/').on('value', (snapshot) => {
    const value = snapshot.val();
    // console.log(value);
    if (!value)
      document.getElementById('imgAbout').style.backgroundImage = "url(" + value + ")";
  });
  loadAdminGenPlus(myValue, 'plusTitle', 'plusDesc', 'pos', 'pls');
  loadHistoryAdmin(myValue, 'history');
  loadPartners('part');
  clearContact('cardContact');
  loadContact(myValue, 'cardContact', 'number');
  loadContact(myValue, 'cardContact', 'other');
  loadImgCardContact('photoCardContact');
  loadCardDate('instaCardContact', 'insta');
  loadCardDate('webCardContact', 'web');
  loadCardDate2(myValue, 'titleCardContact', 'zagolovok');
  loadCardDate2(myValue, 'adresCardContact', 'adres');
  translateTitle(myValue, 'webCardContactTitle', ['Вэб-сайт', 'Website', 'Вэб-сайт']);

  menuPage(myValue);
  loadRekvizit(myValue, 'rekvizitText');
  clearContact('footerContactCard');
  loadFooterContact(myValue, 'footerContactCard', 'number');
  loadFooterContact(myValue, 'footerContactCard', 'other');

  loadCert('certCard', myValue);
  loadNewsGenPage(myValue, 'news_cards');
}

function gentt() {
  database.ref(myValue + '/page/genpage/zagolovok').on('value', (snapshot) => {
    const value = snapshot.val();
    // console.log(value);
    document.getElementById('gentitle').innerHTML = value;
  });
  database.ref(myValue + '/page/genpage/opisanie').on('value', (snapshot) => {
    const value = snapshot.val();
    // console.log(value);
    document.getElementById('genCaption').innerHTML = value;
  });

}
function readico(lng) {
  switch (lng) {
    case 'ru':
      block = 'br'
      break;
    case 'en':
      block = 'be'
      break;
    case 'kz':
      block = 'bk'
      break;

    default:
      break;
  }
  for (let i = 1; i <= 4; i++) {
    // Считывание данных из Firebase Realtime Database и отображение на странице
    database.ref(lng + '/page/genpageico/' + block + i + '/title').on('value', (snapshot) => {
      const value = snapshot.val();
      // console.log(value);
      document.getElementById('tb' + i).textContent = value;
    });

    database.ref(lng + '/page/genpageico/' + block + i + '/description').on('value', (snapshot) => {
      const value = snapshot.val();
      // console.log(value);
      document.getElementById('cb' + i).textContent = value;
    });
    database.ref(lng + '/page/genpageico/' + block + i + '/ico').on('value', (snapshot) => {
      const value = snapshot.val();
      // console.log(value);
      document.getElementById('ib' + i).src = value;
    });
  }
}
function loadAdminGenProduct(lng, dv) {
  database.ref(lng + '/page/genproduct/zagolovok').on('value', (snapshot) => {
    const value = snapshot.val().replace(/<br>/g, "\n");
    // console.log(value);
    document.getElementById(dv).innerHTML = value;

  });
}
function loadAdminGenAbout(lng, dv, dv2) {
  database.ref(lng + '/page/genabout/zagolovokabout').on('value', (snapshot) => {
    const value = snapshot.val();
    // console.log(value);
    document.getElementById(dv).innerHTML = value;
    // $(dv).val(value);
  });
  database.ref(lng + '/page/genabout/opisanie').on('value', (snapshot) => {
    const value = snapshot.val();
    // console.log(value);
    document.getElementById(dv2).innerHTML = value;
    // $(dv2).val(value);
  });
  // podrobnee
  pdr = 'Подробнее';
  switch (lng) {
    case 'ru':
      pdr = 'Подробнее';
      break;
    case 'en':
      pdr = 'Moree';
      break;
    case 'kz':
      pdr = 'Толығырақ';
      break;

    default:
      break;
  }
  document.getElementById('podrobnee').innerHTML = pdr;
}

function loadAdminGenProductName(lng, dv, pr, ful) {
  for (let i = 1; i <= 8; i++) {
    database.ref(lng + '/page/genproduct/' + i + '/nazvanie/').on('value', (snapshot) => {
      const value = snapshot.val().replace(/<br>/g, "\n");
      // console.log(value);
      document.getElementById(dv + i).innerHTML = value;
    });
  }
}

function loadAdminGenPlus(lng, dv, dv2, pos, pls) {
  for (let i = 1; i <= 3; i++) {
    database.ref(lng + '/page/genplus/' + i + '/zagolovok').on('value', (snapshot) => {
      const value = snapshot.val().replace(/<br>/g, "\n");
      // console.log(value);

      document.getElementById(dv + i).innerHTML = value;
    });
    database.ref(lng + '/page/genplus/' + i + '/opisanie').on('value', (snapshot) => {
      const value = snapshot.val().replace(/<br>/g, "\n");
      // console.log(value);
      {
        document.getElementById(dv2 + i).innerHTML = value;
      }
    });
  }
}

function loadHistoryAdmin(lng, dv) {
  document.getElementById(dv).innerHTML = '';
  ln = 'Ru';
  yr = 'год';
  ttl = 'История компании';
  switch (lng) {
    case 'ru':
      ln = 'Ru';
      yr = 'год';
      ttl = 'История компании';
      break;
    case 'en':
      ln = 'En';
      yr = 'year';
      ttl = 'Company history';
      break;
    case 'kz':
      ln = 'Kz';
      yr = 'жыл';
      ttl = 'Компания тарихы';
      break;

    default:
      break;
  }
  document.getElementById('historytt').innerHTML = ttl;
  database.ref(lng + '/page/history/').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(item.zagolovok, item.opisanie);
      document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="swiper-slide">' +
        '<span class="age">' + item.zagolovok + ' ' + yr + '</span>' +
        '<span class="age_desc">' + item.opisanie + '</span>' +
        '</div>');
    }
  });
}

function loadPartners(dv) {
  document.getElementById(dv).innerHTML = '';
  database.ref('partners').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="swiper-slide"><div class="slide_partner" style="background-image: url(' + item.imageUrl + ')"></div></div>');
    }
  });
}

function loadContact(lng, dv, block) {
  $(dv).html('');
  ln = 'Ru';
  switch (lng) {
    case 'ru':
      ln = 'Ru';
      break;
    case 'en':
      ln = 'En';
      break;
    case 'kz':
      ln = 'Kz';
      break;

    default:
      break;
  }
  database.ref(lng + '/page/contact/' + block + '/').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(item.zagolovok, item.opisanie);
      if (block == 'number') {
        const parts = item.opisanie.split("<br>").filter(part => part !== "");
        nmr = "";
        for (let i = 0; i < parts.length; i++) {
          nmr += "<span class=\"info_desc01\">" + parts[i] + "</span>";
        }
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="contact_info">' +
          '<span class="info_title">' + item.zagolovok + '</span>' +
          nmr +
          '</div>');
      }
      else if (block == 'other') {
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="contact_info">' +
          '<span class="info_title">' + item.zagolovok + '</span>' +
          '<span class="info_desc02">' + item.opisanie + '</span>' +
          '</div>');
      }

    }
  });
}
function clearContact(dv) {
  document.getElementById(dv).innerHTML = "";
}
function loadImgCardContact(dv) {
  database.ref('contact/imageUrl').on('value', (snapshot) => {
    const value = snapshot.val();
    // console.log(value);

    document.getElementById(dv).style.backgroundImage = "url(" + value + ")";;
  });
}
function loadCardDate(dv, block) {
  database.ref('contact/' + block).on('value', (snapshot) => {
    const value = snapshot.val();
    // console.log(value);
    document.getElementById(dv).innerHTML = value;
  });
}
function loadCardDate2(lng, dv, block) {
  database.ref(lng + '/page/contact/' + block).on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);
    if (block == 'adres') { value = '<img src="img/location.png" alt="">' + value; }
    document.getElementById(dv).innerHTML = value;
  });
}
function translateTitle(lng, dv, tr) {
  txt = '';
  switch (lng) {
    case 'ru':
      txt = tr[0];
      break;
    case 'en':
      txt = tr[1];
      break;
    case 'kz':
      txt = tr[2];
      break;

    default:
      break;
  }
  document.getElementById(dv).innerHTML = txt;
}

function menuPage(lng) {
  let txt;
  switch (lng) {
    case 'ru':
      txt = menuRu;
      break;
    case 'en':
      txt = menuEn;
      break;
    case 'kz':
      txt = menuKz;
      break;
  }
  // Меню десктоп
  document.getElementById('genMenu').innerHTML = txt.gen;
  document.getElementById('aboutMenu').innerHTML = txt.about;
  document.getElementById('newsMenu').innerHTML = txt.news;
  document.getElementById('productMenu').innerHTML = txt.product + '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="10px" height="10px"  viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;"  xml:space="preserve"> <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>  </g></svg>';
  document.getElementById('product1Menu').innerHTML = txt.product1;
  document.getElementById('product2Menu').innerHTML = txt.product2;
  document.getElementById('product3Menu').innerHTML = txt.product3;
  document.getElementById('carerMenu').innerHTML = txt.carer;
  document.getElementById('contactMenu').innerHTML = txt.contact;
  // Меню мобильная
  document.getElementById('genMenuMobile').innerHTML = txt.gen;
  document.getElementById('aboutMenuMobile').innerHTML = txt.about;
  document.getElementById('newsMenuMobile').innerHTML = txt.news;
  document.getElementById('productMenuMobile').innerHTML = txt.product;
  document.getElementById('product1MenuMobile').innerHTML = txt.product1;
  document.getElementById('product2MenuMobile').innerHTML = txt.product2;
  document.getElementById('product3MenuMobile').innerHTML = txt.product3;
  document.getElementById('carerMenuMobile').innerHTML = txt.carer;
  document.getElementById('contactMenuMobile').innerHTML = txt.contact;
  // футер
  document.getElementById('genMenuFooter').innerHTML = txt.gen;
  document.getElementById('aboutMenuFooter').innerHTML = txt.about;
  document.getElementById('newsMenuFooter').innerHTML = txt.news;
  document.getElementById('productMenuFooter').innerHTML = txt.product;
  document.getElementById('carerMenuFooter').innerHTML = txt.carer;
  document.getElementById('contactMenuFooter').innerHTML = txt.contact;
  // Навигация
  document.getElementById('genMenuNav').innerHTML = txt.gen;
  document.getElementById('aboutMenuNav').innerHTML = txt.about;
  document.getElementById('newsMenuNav').innerHTML = txt.news;
  document.getElementById('productMenuNav').innerHTML = txt.product;
  document.getElementById('certifMenuNav').innerHTML = txt.certif;
  document.getElementById('partMenuNav').innerHTML = txt.partner;
  document.getElementById('contactMenuNav').innerHTML = txt.contact;

  document.getElementById('newsBlock').innerHTML = txt.news;
  document.getElementById('fNewsBlock').innerHTML = txt.fnews;
  document.getElementById('certBlock').innerHTML = txt.certif;
  document.getElementById('allCertif').innerHTML = txt.fcertif;
  document.getElementById('partnerBlock').innerHTML = txt.partner;
  document.getElementById('contactBlock').innerHTML = txt.contact;
  document.getElementById('too').innerHTML = txt.too;
  document.getElementById('titleMenuFooter').innerHTML = txt.titleMenuFuter;
  document.getElementById('titleMenuFooter2').innerHTML = txt.titleMenuFuter2;

  document.getElementById('adminp').innerHTML = txt.adminp;
  document.getElementById('perdate').innerHTML = txt.perdate;
  document.getElementById('polit').innerHTML = txt.polit;
  document.getElementById('razrab').innerHTML = txt.razrab;
}
function loadRekvizit(lng, dv) {
  document.getElementById(dv).innerHTML = '';
  nmr1 = "";
  database.ref(lng + '/page/rekvizit').once('value', (snapshot) => {
    data = snapshot.val();
    const parts = data.split("<br>").filter(part => part !== "");

    for (let i = 0; i < parts.length; i++) {
      nmr1 += "<li>" + parts[i] + "</li>";
    }
    document.getElementById(dv).innerHTML = (nmr1);
  });
}
function loadFooterContact(lng, dv, block) {
  console.log('yes');
  document.getElementById(dv).innerHTML = "";
  ln = 'Ru';
  zgl = 'Тел./факс'
  switch (lng) {
    case 'ru':
      ln = 'Ru';
      zgl = 'Тел./факс'
      break;
    case 'en':
      ln = 'En';
      zgl = 'Phon./fax'
      break;
    case 'kz':
      ln = 'Kz';
      zgl = 'Тел./факс'
      break;

    default:
      break;
  }
  cols = 1;
  database.ref(lng + '/page/contact/' + block + '/').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(item.zagolovok, item.opisanie);
      if (block == 'number') {
        if (cols < 2) {
          const parts = item.opisanie.split("<br>").filter(part => part !== "");
          nmr = "";
          for (let i = 0; i < 1; i++) {
            nmr += "<span class=\"footerCol_desc01\">" + parts[i] + "</span>";
          }
          document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="contact_info">' +
            '<span class="footerCol_title">' + zgl + ':</span>' +
            nmr +
            '</div>');
          if (window.location.toString().indexOf('contacts.htm') > 0) {
            document.getElementById('tel').innerHTML = nmr;
          }
          cols++;
        }

      }
      else if (block == 'other') {
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="contact_info">' +
          '<span class="footerCol_title">' + item.zagolovok + '</span>' +
          '<span class="footerCol_desc02">' + item.opisanie + '</span>' +
          '</div>');
        if (window.location.toString().indexOf('contacts.htm') > 0 && item.zagolovok === 'Email:') {
          document.getElementById('emailCont').innerHTML = item.opisanie;
        }
      }


    }
  });
}
function loadCert(dv, lng) {
  document.getElementById(dv).innerHTML = "";
  coli = 1;
  database.ref('certifacate').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      txt = "";
      switch (lng) {
        case 'ru':
          txt = item.ru;
          break;
        case 'en':
          txt = item.en;
          break;
        case 'kz':
          txt = item.kz;
          break;
        default:
          break;
      }
      // console.log(coli);
      if (coli < 4) {
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="card">' +
          '<div class="cert_card">' +
          '<img src="' + item.imageUrl + '" class="cert_photo">' +
          '<span class="cert_caption">' + txt + '</span>' +
          '</div>');

        coli++;
      }

    }
  });
}

// Страница все сертификаты
function loadCertPage() {
  myValue = 'ru';
  if (localStorage.getItem("glblng") != null) { myValue = localStorage.getItem("glblng"); }
  trasnlCertPage(myValue);
}

function trasnlCertPage(lng) {
  let txt;
  switch (lng) {
    case 'ru':
      txt = menuRu;
      break;
    case 'en':
      txt = menuEn;
      break;
    case 'kz':
      txt = menuKz;
      break;
  }
  document.getElementById('genSsil').innerHTML = txt.gen;
  document.getElementById('sertSsil').innerHTML = txt.certif;
  document.getElementById('sertTitle').innerHTML = txt.certif;
  loadCertFull('sertFullCard', myValue);
}
function loadCertFull(dv, lng) {
  //console.log('no');
  document.getElementById(dv).innerHTML = "";
  col = 1;
  database.ref('certifacate').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      txt = "";
      switch (lng) {
        case 'ru':
          txt = item.ru;
          break;
        case 'en':
          txt = item.en;
          break;
        case 'kz':
          txt = item.kz;
          break;
        default:
          break;
      }
      if (col < 9) {
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<a href="' + item.imageUrl + '" data-fancybox="gallery-a" data-fancybox data-caption="' + txt + '">' +
          '<img src="' + item.imageUrl + '" class="gallery-img"/>' +
          '<span class="gallery_caption">' + txt + '</span>' +
          '</a>');
        col++;
      }

    }
    //console.log(Math.ceil(col/8));
    bk = '';
    // bk='<div class="prev_page"> <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.98926 1.34985L2.48926 6.84985L7.98926 12.3499" stroke="#DBDBDB" stroke-width="3"/> </svg></div>';
    nx = '<div class="next_page" onclick="loadCertFullPage(\'sertFullCard\', \'' + lng + '\',2);"> <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.32324 17.3499L14.8232 11.8499L9.32324 6.34985" stroke="#DBDBDB" stroke-width="3"/> </svg></div>';
    clpg = '<div class="current_page active_page" onclick="loadCertFullPage(\'sertFullCard\', \'' + lng + '\',1);">1</div>';
    for (let i = 1; i < Math.ceil(col / 8); i++) {
      clpg += '<div class="current_page" onclick="loadCertFullPage(\'sertFullCard\', \'' + lng + '\',' + (i + 1) + ');">' + (i + 1) + '</div>';

    }
    document.getElementById('navCer').innerHTML = bk + clpg + nx;
  });

}
function loadCertFullPage(dv, lng, pg) {
  // console.log(pg);
  document.getElementById(dv).innerHTML = "";
  col = 1;
  database.ref('certifacate').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      txt = "";
      switch (lng) {
        case 'ru':
          txt = item.ru;
          break;
        case 'en':
          txt = item.en;
          break;
        case 'kz':
          txt = item.kz;
          break;
        default:
          break;
      }
      st = 8 * (pg - 1);
      ed = 9 * pg;
      console.log(st + ' | ' + ed);
      if (col > st && col < ed) {
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<a href="' + item.imageUrl + '" data-fancybox="gallery-a" data-fancybox data-caption="' + txt + '">' +
          '<img src="' + item.imageUrl + '" class="gallery-img"/>' +
          '<span class="gallery_caption">' + txt + '</span>' +
          '</a>');
      }
      col++;


    }
    console.log(Math.ceil(col / 8));
    bk = '';
    nx = '';
    if (pg != 1) { bk = '<div class="prev_page" onclick="loadCertFullPage(\'sertFullCard\', \'' + lng + '\',' + (pg - 1) + ');"> <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.98926 1.34985L2.48926 6.84985L7.98926 12.3499" stroke="#DBDBDB" stroke-width="3"/> </svg></div>'; }
    if (pg != Math.ceil(col / 8)) nx = '<div class="next_page" onclick="loadCertFullPage(\'sertFullCard\', \'' + lng + '\',' + (pg + 1) + ');"> <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.32324 17.3499L14.8232 11.8499L9.32324 6.34985" stroke="#DBDBDB" stroke-width="3"/> </svg></div>';
    clpg = '';
    for (let i = 1; i < Math.ceil(col / 8) + 1; i++) {
      if (i == pg) clpg += '<div class="current_page active_page" onclick="loadCertFullPage(\'sertFullCard\', \'' + lng + '\',' + (i) + ');">' + (i) + '</div>';
      else clpg += '<div class="current_page" onclick="loadCertFullPage(\'sertFullCard\', \'' + lng + '\',' + (i) + ');">' + i + '</div>';
    }
    document.getElementById('navCer').innerHTML = bk + clpg + nx;
  });

}

function loadNewsGenPage(lng, dv) {
  // document.getElementById(dv).innerHTML = "";
  document.getElementById(dv).innerHTML = "";
  coln = 1;
  var key = [];
  database.ref('news').once('value', (snapshot) => {
    const data = snapshot.val();
    var dataArray = Object.entries(data);

    // Сортируем массив по полю "dateNews"
    dataArray.sort(function (a, b) {
      var dateA = new Date(b[1].dateNews.split('.').reverse().join('.'));
      var dateB = new Date(a[1].dateNews.split('.').reverse().join('.'));
      return dateA - dateB;
    });
    it = 0;
    // Выводим отсортированные данные
    dataArray.forEach(function (item) {
      var value = item[1];
      if (it < 2) {
        opis = '';
        tit = '';
        btn = '';
        switch (lng) {
          case 'ru':
            opis = value.Opisanieru;
            tit = value.Titleru;
            btn = 'Читать полностью';
            break;
          case 'en':
            opis = value.Opisanieen;
            tit = value.Titleen;
            btn = 'More';
            break;
          case 'kz':
            opis = value.Opisaniekz;
            tit = value.Titlekz;
            btn = 'Толығырақ';
            break;

          default:
            break;
        }
        opis = truncateText(opis, 145);
        console.log(value.dateNews, tit, ' : ', opis);
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<a onclick="clickNews(\'' + item[0] + '\')">' +
          '<div class="news_card">' +
          '<div class="news_card-img" style = "background-image: url(' + value.imageUrl + ');"></div>' +
          '<div class="news_card-content">' +
          '<div class="news_card-desc">' +
          '<div>' +
          '<span class="news_title">' + tit + '</span>' +
          '<span class="news_caption">' + opis + '</span>' +
          '</div>' +
          '<span class="more_detail">' + btn +
          '<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M8.25 0.790283L4.5 4.54028L0.75 0.790283" stroke="black" stroke-width="2"/>' +
          '</svg>' +
          '</span>' +
          '</div>' +
          '<div class="news_card-date">' +
          '<span class="news_date">' + value.dateNews + '</span>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</a>'
        );
      }
      it++;

    });
    // console.log(key);
    //  console.log(data[key]); 
  });

}
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function clickNews(key) {
  localStorage.setItem("kewnews", key);
  window.location.href = "detailedNews.html";
}
function lngselNews(lng) {
  localStorage.setItem("glblng", lng);
  window.location.href = "detailedNews.html";
}
function loadNewsPage() {
  myValue = 'ru';
  if (localStorage.getItem("glblng") != null) { myValue = localStorage.getItem("glblng"); }
  // console.log(myValue);
  let txt;
  switch (myValue) {
    case 'ru':
      txt = menuRu;
      break;
    case 'en':
      txt = menuEn;
      break;
    case 'kz':
      txt = menuKz;
      break;
  }

  document.getElementById('genTit').innerHTML = txt.gen;
  document.getElementById('newsTit').innerHTML = txt.news;
  kkNew = localStorage.getItem("kewnews");
  console.log(kkNew);
  detailNews(kkNew, myValue);
  translateNews(myValue);
  loadRekvizit(myValue, 'rekvizitText');
  clearContact('footerContactCardNews');
  loadFooterContact(myValue, 'footerContactCardNews', 'number');
  loadFooterContact(myValue, 'footerContactCardNews', 'other');
}


function detailNews(kk, lng) {
  opis = '', titl = '';

  database.ref('news/' + kk).on('value', (snapshot) => {
    const value = snapshot.val();
    //console.log(lng);
    switch (lng) {
      case 'ru':
        opis = value.Opisanieru;
        titl = value.Titleru;
        break;
      case 'en':
        opis = value.Opisanieen;
        titl = value.Titleen;
        break;
      case 'kz':
        opis = value.Opisaniekz;
        titl = value.Titlekz;
        break;
    }
    //console.log(titl);

    document.getElementById('nameNewsTit').innerHTML = titl;
    ttline = '<h2 class="detail_news_title" id="detailNewsTitle">' + titl + '</h2>';
    dtline = '<span class="news_date_capt">Опубликовано: <span class="date_date" id="dateNews">' + value.dateNews + '</span></span>';
    console.log(dtline);
    const parts = opis.split("<br>").filter(part => part !== "");
    opisan = '';
    for (let i = 0; i < parts.length; i++) {
      opisan += '<span class="text_caption">' + parts[i] + "</span>";
    }
    document.getElementById('blockNews').innerHTML = '';
    document.getElementById('blockNews').innerHTML = ttline + dtline + opisan;
  });

}

function translateNews(lng) {
  let txt;
  switch (lng) {
    case 'ru':
      txt = menuRu;
      break;
    case 'en':
      txt = menuEn;
      break;
    case 'kz':
      txt = menuKz;
      break;
  }
  document.getElementById('genMenuFooter').innerHTML = txt.gen;
  document.getElementById('aboutMenuFooter').innerHTML = txt.about;
  document.getElementById('newsMenuFooter').innerHTML = txt.news;
  document.getElementById('productMenuFooter').innerHTML = txt.product;
  document.getElementById('carerMenuFooter').innerHTML = txt.carer;
  document.getElementById('contactMenuFooter').innerHTML = txt.contact;

  document.getElementById('too').innerHTML = txt.too;
  document.getElementById('titleMenuFooter').innerHTML = txt.titleMenuFuter;
  document.getElementById('titleMenuFooter2').innerHTML = txt.titleMenuFuter2;

  document.getElementById('adminp').innerHTML = txt.adminp;
  document.getElementById('perdate').innerHTML = txt.perdate;
  document.getElementById('polit').innerHTML = txt.polit;
  document.getElementById('razrab').innerHTML = txt.razrab;

  // Меню десктоп
  document.getElementById('genMenu').innerHTML = txt.gen;
  document.getElementById('aboutMenu').innerHTML = txt.about;
  document.getElementById('newsMenu').innerHTML = txt.news;
  document.getElementById('productMenu').innerHTML = txt.product + '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="10px" height="10px"  viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;"  xml:space="preserve"> <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>  </g></svg>';
  document.getElementById('product1Menu').innerHTML = txt.product1;
  document.getElementById('product2Menu').innerHTML = txt.product2;
  document.getElementById('product3Menu').innerHTML = txt.product3;
  document.getElementById('carerMenu').innerHTML = txt.carer;
  document.getElementById('contactMenu').innerHTML = txt.contact;
  // Меню мобильная
  document.getElementById('genMenuMobile').innerHTML = txt.gen;
  document.getElementById('aboutMenuMobile').innerHTML = txt.about;
  document.getElementById('newsMenuMobile').innerHTML = txt.news;
  document.getElementById('productMenuMobile').innerHTML = txt.product;
  document.getElementById('product1MenuMobile').innerHTML = txt.product1;
  document.getElementById('product2MenuMobile').innerHTML = txt.product2;
  document.getElementById('product3MenuMobile').innerHTML = txt.product3;
  document.getElementById('carerMenuMobile').innerHTML = txt.carer;
  document.getElementById('contactMenuMobile').innerHTML = txt.contact;
  database.ref(lng + '/page/contact/adres').on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);

    // document.getElementById('adres').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
    document.getElementById('adresMenu').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
  });

}
function lngselNewsMore(lng) {
  localStorage.setItem("glblng", lng);
  window.location.href = "News.html";
}
function moreNews(lng, dv, pg) {
  // document.getElementById(dv).innerHTML = "";
  document.getElementById(dv).innerHTML = "";
  document.getElementById('navNewsMore').innerHTML = "";
  coln = 1;
  var key = [];
  database.ref('news').once('value', (snapshot) => {
    const data = snapshot.val();
    var dataArray = Object.entries(data);

    // Сортируем массив по полю "dateNews"
    dataArray.sort(function (a, b) {
      var dateA = new Date(b[1].dateNews.split('.').reverse().join('.'));
      var dateB = new Date(a[1].dateNews.split('.').reverse().join('.'));
      return dateA - dateB;
    });
    it = 0;
    // Выводим отсортированные данные
    dataArray.forEach(function (item) {
      var value = item[1];
      st = 6 * (pg - 1);
      ed = 7 * pg;
      console.log(st + ' | ' + ed);
      it++;
      if (it > st && it < ed) {
        opis = '';
        tit = '';
        btn = '';
        switch (lng) {
          case 'ru':
            opis = value.Opisanieru;
            tit = value.Titleru;
            btn = 'Читать полностью';
            break;
          case 'en':
            opis = value.Opisanieen;
            tit = value.Titleen;
            btn = 'More';
            break;
          case 'kz':
            opis = value.Opisaniekz;
            tit = value.Titlekz;
            btn = 'Толығырақ';
            break;

          default:
            break;
        }
        opis = truncateText(opis, 145);
        // console.log(value.dateNews, tit, ' : ', opis);
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<a onclick="clickNews(\'' + item[0] + '\')">' +
          '<div class="news_card">' +
          '<div class="news_card-img" style = "background-image: url(' + value.imageUrl + ');"></div>' +
          '<div class="news_card-content">' +
          '<div class="news_card-desc">' +
          '<div>' +
          '<span class="news_title">' + tit + '</span>' +
          '<span class="news_caption">' + opis + '</span>' +
          '</div>' +
          '<span class="more_detail">' + btn +
          '<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M8.25 0.790283L4.5 4.54028L0.75 0.790283" stroke="black" stroke-width="2"/>' +
          '</svg>' +
          '</span>' +
          '</div>' +
          '<div class="news_card-date">' +
          '<span class="news_date">' + value.dateNews + '</span>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</a>'
        );
      }


    });
    console.log(it, '|', Math.ceil(it / 6));
    bk = '';
    nx = '';
    if (pg != 1) { bk = '<div class="prev_page" onclick="moreNews(\'' + lng + '\',\'page_news_cards\',' + (pg - 1) + ');"> <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.98926 1.34985L2.48926 6.84985L7.98926 12.3499" stroke="#DBDBDB" stroke-width="3"/> </svg></div>'; }
    if (pg != Math.ceil(it / 6)) nx = '<div class="next_page" onclick="moreNews(\'' + lng + '\',\'page_news_cards\',' + (pg + 1) + ');"> <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.32324 17.3499L14.8232 11.8499L9.32324 6.34985" stroke="#DBDBDB" stroke-width="3"/> </svg></div>';
    clpg = '';
    for (let i = 1; i < Math.ceil(it / 6) + 1; i++) {
      if (i == pg) clpg += '<div class="current_page active_page" onclick="moreNews(\'' + lng + '\',\'page_news_cards\',' + (i) + ');">' + (i) + '</div>';
      else clpg += '<div class="current_page" onclick="moreNews(\'' + lng + '\',\'page_news_cards\',' + (i) + ');">' + i + '</div>';
    }

    document.getElementById('navNewsMore').innerHTML = bk + clpg + nx;
    // console.log(key);
    //  console.log(data[key]); 
  });

  //   
  // });
}

function lodaMoreNews() {
  myValue = 'ru';
  if (localStorage.getItem("glblng") != null) { myValue = localStorage.getItem("glblng"); }
  moreNews(myValue, 'page_news_cards', 1);
  transPageNews(myValue);
  loadRekvizit(myValue, 'rekvizitText');
  clearContact('footerContactCard');
  loadFooterContact(myValue, 'footerContactCard', 'number');
  loadFooterContact(myValue, 'footerContactCard', 'other');
}
function lodaMoreVacan() {
  myValue = 'ru';
  if (localStorage.getItem("glblng") != null) { myValue = localStorage.getItem("glblng"); }
  loadVacan(myValue, 'fullVacan');

  database.ref('Imgvacan').on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);

    document.getElementById('imgVacan').style.backgroundImage = "url('" + value + "')";
  });
  transPageVacans(myValue);
  loadRekvizit(myValue, 'rekvizitText');
  clearContact('footerContactCard');
  loadFooterContact(myValue, 'footerContactCard', 'number');
  loadFooterContact(myValue, 'footerContactCard', 'other');
}
function loadVacan(lng, dv) {
  document.getElementById(dv).innerHTML = '';
  database.ref('vacans').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      title = '';
      opis = '';
      switch (lng) {
        case 'ru':
          title = item.Titleru;
          opis = item.Opisanieru;
          break;
        case 'en':
          title = item.Titleen;
          opis = item.Opisanieen;
          break;
        case 'kz':
          title = item.Titlekz;
          opis = item.Opisaniekz;
          break;

        default:
          break;
      }
      document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="accordion-item">' +
        '<button id="' + key + '" aria-expanded="false"  onclick="btnAccrd(\'' + key + '\')">' +
        '<span class="accordion-title">' + title + '</span>' +
        '<svg class="icon" aria-hidden="true" width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M27 14.7501L14.5001 2.24993L2 14.7501" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>    ' +
        '</button>' +
        '<div class="accordion-content">' +
        '<div class="list_work">' + opis +
        '</div>' +
        '</div>' +
        '</div>');
    }
  });
}


function btnAccrd(key) {
  if (window.location.href.endsWith("vacancy.html")) {
    var button = document.getElementById(key);
    var expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", !expanded);
  }
}

function loadServiMore() {
  myValue = 'ru';
  if (localStorage.getItem("glblng") != null) { myValue = localStorage.getItem("glblng"); }
  loadTitleServiMore('nameCatTitle', myValue);
  transPageServices(myValue);
  loadRekvizit(myValue, 'rekvizitText');
  clearContact('footerContactCard');
  loadFooterContact(myValue, 'footerContactCard', 'number');
  loadFooterContact(myValue, 'footerContactCard', 'other');
}

function loadTitleServiMore(dv, lng) {
  document.getElementById(dv).innerHTML = '';
  document.getElementById('vseproduct').innerHTML = '';
  database.ref('typeproduct').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      title = '';
      opis = '';
      switch (lng) {
        case 'ru':
          title = item.Titleru;
          opis = item.Opisanieru;
          break;
        case 'en':
          title = item.Titleen;
          opis = item.Opisanieen;
          break;
        case 'kz':
          title = item.Titlekz;
          opis = item.Opisaniekz;
          break;

        default:
          break;
      }
      document.getElementById(dv).insertAdjacentHTML('afterbegin', '<li><div class="vert_line"></div><a href="service01.html">' + title + '</a></li>');
      creatProductCard('vseproduct', key, title, lng);

    }
  });
}

function creatProductCard(dv, id, title, lng) {
  txt = '';
  t2p = [];
  t2pdate = [];
  kl = '';
  database.ref('product').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      if (item.typeProduct === id) {
        title2 = '';
        opis = '';
        var hasPotType = 'type2Product' in item;
        if (hasPotType) {
          kl = key;
          switch (lng) {
            case 'ru':
              title2 = item.Titleru;
              opis = item.Opisanieru;
              break;
            case 'en':
              title2 = item.Titleen;
              opis = item.Opisanieen;
              break;
            case 'kz':
              title2 = item.Titlekz;
              opis = item.Opisaniekz;
              break;

            default:
              break;
          }
          opis = opis.replace(/(<([^>]+)>)/gi, "");
          opis = truncateText(opis, 145);
          if (!t2p.includes(item.type2Product)) {
            txt += '<div class="accordion-item">' +
              '<button id="accordion-button-1" aria-expanded="false">' +
              '<span class="accordion-title" id="' + item.type2Product + 'title">' + item.type2Product + '</span>' +
              '<svg class="icon" aria-hidden="true" width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path d="M27 14.7501L14.5001 2.24993L2 14.7501" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
              '</svg>    ' +
              '</button>' +
              '' +
              '<div class="accordion-content" id="' + item.type2Product + 'productlist">' +
              '</div>' +
              '</div>';
            t2p.push(item.type2Product);
          }
          t2pdate.push(
            item,
          );

        }
        else {
          switch (lng) {
            case 'ru':
              title2 = item.Titleru;
              opis = item.Opisanieru;
              break;
            case 'en':
              title2 = item.Titleen;
              opis = item.Opisanieen;
              break;
            case 'kz':
              title2 = item.Titlekz;
              opis = item.Opisaniekz;
              break;

            default:
              break;
          }
          opis = opis.replace(/(<([^>]+)>)/gi, "");
          opis = truncateText(opis, 145);
          txt += '<div class="accordion-item">' +
            '<button id="' + key + 'acard" aria-expanded="false" onclick="btnAccrdProduct(\'' + key + '\')">' +
            '<span class="accordion-title">' + title2 + '</span>' +
            '<svg class="icon" aria-hidden="true" width="29" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M27 14.7501L14.5001 2.24993L2 14.7501" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>    ' +
            '</button>' +
            '' +
            '<div class="accordion-content" >' +
            '<div class="services_card">' +
            '<div class="services_img img_ad02" style="background-image:url(' + item.imageUrl + ')"></div>' +
            '<div class="services_caption">' +
            '<span class="services_card_title">' + title2 + '</span>' +
            '<div class="services_card_caption">' + opis + '</div>' +
            '<a href="" class="serv_detailed_btn">Подробнее</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        }

        // console.log(title+' | '+hasPotType);  // true

      }



    }
    // console.log(txt);
    document.getElementById(dv).insertAdjacentHTML('beforeend',
      '<div class="production_type">' +
      '<span class="services_tilte">' + title + '</span>' +
      '<div class="accordion" id="' + id + 'card">' +
      txt +
      '' +
      '</div>' +
      '</div>'
    );

    txt = '';
    console.log(t2p);
    console.log(t2pdate);
    typeProductTitle(kl, t2p, lng);
    console.log(kl);

  });




}

function typeProductTitle(kk, kk2, lng) {
  database.ref('typeproduct/-NVLmXHFXxOOGn4i3eSP/podtype/').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      title = '';
      opis = '';
      var hasPotType = key in kk2;
      if (hasPotType) {
        switch (lng) {
          case 'ru':
            title = item.Titleru;
            opis = item.Opisanieru;
            break;
          case 'en':
            title = item.Titleen;
            opis = item.Opisanieen;
            break;
          case 'kz':
            title = item.Titlekz;
            opis = item.Opisaniekz;
            break;

          default:
            break;
        }
        // document.getElementById(dv).insertAdjacentHTML('afterbegin','<li><div class="vert_line"></div><a href="service01.html">'+title+'</a></li>' );
        // creatProductCard('vseproduct',key,title,lng);
        document.getElementById('-NVLmXHFXxOOGn4i3eSPtitle').innerHTML = title;
        console.log(title);
      }

    }
  });
}

function btnAccrdProduct(key) {
  if (window.location.href.endsWith("services.html")) {
    var button = document.getElementById(key + 'acard');
    var expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", !expanded);
  }
}

function pageAbout() {
  myValue = 'ru';
  if (localStorage.getItem("glblng") != null) { myValue = localStorage.getItem("glblng"); }
  transPageAbout(myValue);
  pageAboutInfo(myValue);
  loadRekvizit(myValue, 'rekvizitText');
  clearContact('footerContactCard');
  loadFooterContact(myValue, 'footerContactCard', 'number');
  loadFooterContact(myValue, 'footerContactCard', 'other');
  loadDirector(myValue);
}

function pageAboutInfo(lng) {
  database.ref(lng + '/page/genabout/opisanie').on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);
    tt = '';
    partTitle = '';
    switch (lng) {
      case 'ru':
        tt = 'АтырауНефтеМаш';
        partTitle = 'Партнеры';
        break;
      case 'en':
        tt = 'AtyrauNefteMash';
        partTitle = 'Partners';
        break;
      case 'kz':
        tt = 'АтырауНефтеМаш';
        partTitle = 'Серіктестер';
        break;

      default:
        break;
    }
    document.getElementById('partnerTitle').innerHTML = partTitle;
    op = '<h2>' + tt + '</h2>' + value;
    document.getElementById('titleAbout').innerHTML = op;
  });
  database.ref(lng + '/page/genabout/zagolovokabout').on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);

    document.getElementById('zagolovok').innerHTML = value;
  });
  database.ref(lng + '/page/contact/adres').on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);

    document.getElementById('adres').innerHTML = value;
    document.getElementById('adresMenu').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
  });

  for (let i = 1; i <= 3; i++) {
    database.ref(lng + '/page/genplus/' + i + '/zagolovok').on('value', (snapshot) => {
      const value = snapshot.val().replace(/<br>/g, "\n");
      // console.log(value);

      document.getElementById('title' + i).innerHTML = value;
    });
    database.ref(lng + '/page/genplus/' + i + '/opisanie').on('value', (snapshot) => {
      const value = snapshot.val().replace(/<br>/g, "\n");
      // console.log(value);
      {
        document.getElementById('opisanie' + i).innerHTML = value;
      }
    });
  }
  document.getElementById('part').innerHTML = '';
  database.ref('partners').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      document.getElementById('part').insertAdjacentHTML('beforeend', '<div class="swiper-slide"><div class="slide_partner" style="background-image: url(' + item.imageUrl + ')"></div></div>');
    }
  });

}
function lngselAbout(lng) {
  localStorage.setItem("glblng", lng);
  window.location.href = "about.html";
}
function transPageAbout(lng) {
  let txt;
  switch (lng) {
    case 'ru':
      txt = menuRu;
      break;
    case 'en':
      txt = menuEn;
      break;
    case 'kz':
      txt = menuKz;
      break;
  }
  // Меню десктоп
  document.getElementById('genMenu').innerHTML = txt.gen;
  document.getElementById('aboutMenu').innerHTML = txt.about;
  document.getElementById('newsMenu').innerHTML = txt.news;
  document.getElementById('productMenu').innerHTML = txt.product + '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="10px" height="10px"  viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;"  xml:space="preserve"> <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>  </g></svg>';
  document.getElementById('product1Menu').innerHTML = txt.product1;
  document.getElementById('product2Menu').innerHTML = txt.product2;
  document.getElementById('product3Menu').innerHTML = txt.product3;
  document.getElementById('carerMenu').innerHTML = txt.carer;
  document.getElementById('contactMenu').innerHTML = txt.contact;
  // Меню мобильная
  document.getElementById('genMenuMobile').innerHTML = txt.gen;
  document.getElementById('aboutMenuMobile').innerHTML = txt.about;
  document.getElementById('newsMenuMobile').innerHTML = txt.news;
  document.getElementById('productMenuMobile').innerHTML = txt.product;
  document.getElementById('product1MenuMobile').innerHTML = txt.product1;
  document.getElementById('product2MenuMobile').innerHTML = txt.product2;
  document.getElementById('product3MenuMobile').innerHTML = txt.product3;
  document.getElementById('carerMenuMobile').innerHTML = txt.carer;
  document.getElementById('contactMenuMobile').innerHTML = txt.contact;
  // футер
  document.getElementById('genMenuFooter').innerHTML = txt.gen;
  document.getElementById('aboutMenuFooter').innerHTML = txt.about;
  document.getElementById('newsMenuFooter').innerHTML = txt.news;
  document.getElementById('productMenuFooter').innerHTML = txt.product;
  document.getElementById('carerMenuFooter').innerHTML = txt.carer;
  document.getElementById('contactMenuFooter').innerHTML = txt.contact;

  document.getElementById('adminp').innerHTML = txt.adminp;
  document.getElementById('perdate').innerHTML = txt.perdate;
  document.getElementById('polit').innerHTML = txt.polit;
  document.getElementById('razrab').innerHTML = txt.razrab;

  // Навигация
  document.getElementById('genMenuNav').innerHTML = txt.gen;
  document.getElementById('aboutMenuNav').innerHTML = txt.about;
  document.getElementById('too').innerHTML = txt.too;
  document.getElementById('titleMenuFooter').innerHTML = txt.titleMenuFuter;
  document.getElementById('titleMenuFooter2').innerHTML = txt.titleMenuFuter2;
  document.getElementById('titleDirector').innerHTML = txt.titledirector;
}
function loadDirector(lng) {
  document.getElementById('directorCard').innerHTML = '';
  database.ref('worker').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(key);
      // console.log(item.imageUrl);
      fio = '';
      post = '';
      {
        switch (lng) {
          case 'ru':
            fio = item.fioru;
            post = item.postru;
            break;
          case 'en':
            fio = item.fioen;
            post = item.posten;
            break;
          case 'kz':
            fio = item.fiokz;
            post = item.postkz;
            break;

          default:
            break;
        }
        // document.getElementById(dv).insertAdjacentHTML('afterbegin','<li><div class="vert_line"></div><a href="service01.html">'+title+'</a></li>' );
        // creatProductCard('vseproduct',key,title,lng);
        document.getElementById('directorCard').insertAdjacentHTML('beforeend',
          '<div class="manager">' +
          '                    <div class="manager_photo" style="background-image: url(' + item.imageUrl + ')"></div>' +
          '                    <span class="manager_name">' + fio + '</span>' +
          '                    <span class="manager_post">' + post + '</span>' +
          '                    <span class="manager_mail">' + item.email + '</span>' +
          '                    <span class="manager_phone">' + item.numberPhone + '</span>' +
          '                </div>'
        );
      }

    }
  });
}

function loadContacts() {
  myValue = 'ru';
  if (localStorage.getItem("glblng") != null) { myValue = localStorage.getItem("glblng"); }
  transPageContats(myValue);
  // pageAboutInfo(myValue);
  loadRekvizit(myValue, 'rekvizitText');
  clearContact('footerContactCard');
  loadFooterContact(myValue, 'footerContactCard', 'number');
  loadFooterContact(myValue, 'footerContactCard', 'other');
}
function transPageContats(lng) {
  let txt;
  telTitle = 'Тел./факс';
  ttMes = '';
  flName = '';
  num = '';
  Question = '';
  inName = '';
  inQues = '';
  ctTitle='';
  btnQues='';
  inEmail='';
  switch (lng) {
    case 'ru':
      txt = menuRu;
      telTitle = 'Тел./факс';
      ttMes = 'Для получения детальной<br>' +
        'информации воспользуйтесь<br>' +
        'формой обратной связи';
      flName = 'Имя Фамилия';
      num = 'Номер телефона';
      Question = 'Вопрос';
      inName = 'Введите имя';
      inQues = 'Ваш вопрос';
      ctTitle='Атырау';
      btnQues='Задать вопрос';
      inEmail='Введите эл.почту';
      break;
    case 'en':
      txt = menuEn;
      telTitle = 'Pho./fax';
      ttMes = 'For detailed information, <br> use the feedback form';
      flName = 'Full name';
      num = 'Phone number';
      Question = 'Question';
      inName = 'Enter a name';
      inQues = 'Your question';
      ctTitle='Atyrau';
      btnQues='Ask a question';
      inEmail='Enter your email';
      break;
    case 'kz':
      txt = menuKz;
      telTitle = 'Тел./факс';
      ttMes = 'Толық ақпарат алу үшін <br> кері байланыс <br> нысанын пайдаланыңыз';
      flName = 'Аты Тегі';
      num = 'Телефон нөмірі';
      Question = 'Сұрақ';
      inName = 'Атын енгізіңіз';
      inQues = 'Сіздің сұрағыңыз';
      ctTitle='Атырау';
      btnQues='Сұрақ қою';
      inEmail='Электрондық поштаны енгізіңіз';
      break;
  }
  // Меню десктоп
  document.getElementById('genMenu').innerHTML = txt.gen;
  document.getElementById('aboutMenu').innerHTML = txt.about;
  document.getElementById('newsMenu').innerHTML = txt.news;
  document.getElementById('productMenu').innerHTML = txt.product + '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="10px" height="10px"  viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;"  xml:space="preserve"> <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>  </g></svg>';
  document.getElementById('product1Menu').innerHTML = txt.product1;
  document.getElementById('product2Menu').innerHTML = txt.product2;
  document.getElementById('product3Menu').innerHTML = txt.product3;
  document.getElementById('carerMenu').innerHTML = txt.carer;
  document.getElementById('contactMenu').innerHTML = txt.contact;
  // Меню мобильная
  document.getElementById('genMenuMobile').innerHTML = txt.gen;
  document.getElementById('aboutMenuMobile').innerHTML = txt.about;
  document.getElementById('newsMenuMobile').innerHTML = txt.news;
  document.getElementById('productMenuMobile').innerHTML = txt.product;
  document.getElementById('product1MenuMobile').innerHTML = txt.product1;
  document.getElementById('product2MenuMobile').innerHTML = txt.product2;
  document.getElementById('product3MenuMobile').innerHTML = txt.product3;
  document.getElementById('carerMenuMobile').innerHTML = txt.carer;
  document.getElementById('contactMenuMobile').innerHTML = txt.contact;
  // футер
  document.getElementById('genMenuFooter').innerHTML = txt.gen;
  document.getElementById('aboutMenuFooter').innerHTML = txt.about;
  document.getElementById('newsMenuFooter').innerHTML = txt.news;
  document.getElementById('productMenuFooter').innerHTML = txt.product;
  document.getElementById('carerMenuFooter').innerHTML = txt.carer;
  document.getElementById('contactMenuFooter').innerHTML = txt.contact;

  document.getElementById('adminp').innerHTML = txt.adminp;
  document.getElementById('perdate').innerHTML = txt.perdate;
  document.getElementById('polit').innerHTML = txt.polit;
  document.getElementById('razrab').innerHTML = txt.razrab;

  // Навигация
  document.getElementById('genMenuNav').innerHTML = txt.gen;
  document.getElementById('contacts').innerHTML = txt.contact;
  document.getElementById('too').innerHTML = txt.too;
  document.getElementById('titleMenuFooter').innerHTML = txt.titleMenuFuter;
  document.getElementById('titleMenuFooter2').innerHTML = txt.titleMenuFuter2;

  document.getElementById('contactsTitle').innerHTML = txt.contact;
  document.getElementById('tooTitle').innerHTML = txt.too;
  document.getElementById('tleTitle').innerHTML = telTitle;

  database.ref(lng + '/page/contact/adres').on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);

    document.getElementById('adres').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
    document.getElementById('adresMenu').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
  });
  // Блок орбатной связи
  document.getElementById('titleMessage').innerHTML = ttMes;
  document.getElementById('fulName').innerHTML = flName;
  document.getElementById('numTitle').innerHTML = num;
  document.getElementById('Question').innerHTML = Question;
  document.getElementById('plhName').placeholder = inName;
  document.getElementById('plhQues').placeholder = inQues;
  document.getElementById('cityTitle').innerHTML = ctTitle;
  document.getElementById('btnQues').innerHTML = btnQues;
  document.getElementById('inEmail').placeholder = inEmail;

}
function lngselContacts(lng) {
  localStorage.setItem("glblng", lng);
  window.location.href = "contacts.html";
}
function transPageServices(lng) {
  let txt;
  switch (lng) {
    case 'ru':
      txt = menuRu;

      break;
    case 'en':
      txt = menuEn;

      break;
    case 'kz':
      txt = menuKz;

      break;
  }
  // Меню десктоп
  document.getElementById('genMenu').innerHTML = txt.gen;
  document.getElementById('aboutMenu').innerHTML = txt.about;
  document.getElementById('newsMenu').innerHTML = txt.news;
  document.getElementById('productMenu').innerHTML = txt.product + '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="10px" height="10px"  viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;"  xml:space="preserve"> <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>  </g></svg>';
  document.getElementById('product1Menu').innerHTML = txt.product1;
  document.getElementById('product2Menu').innerHTML = txt.product2;
  document.getElementById('product3Menu').innerHTML = txt.product3;
  document.getElementById('carerMenu').innerHTML = txt.carer;
  document.getElementById('contactMenu').innerHTML = txt.contact;
  // Меню мобильная
  document.getElementById('genMenuMobile').innerHTML = txt.gen;
  document.getElementById('aboutMenuMobile').innerHTML = txt.about;
  document.getElementById('newsMenuMobile').innerHTML = txt.news;
  document.getElementById('productMenuMobile').innerHTML = txt.product;
  document.getElementById('product1MenuMobile').innerHTML = txt.product1;
  document.getElementById('product2MenuMobile').innerHTML = txt.product2;
  document.getElementById('product3MenuMobile').innerHTML = txt.product3;
  document.getElementById('carerMenuMobile').innerHTML = txt.carer;
  document.getElementById('contactMenuMobile').innerHTML = txt.contact;
  // футер
  document.getElementById('genMenuFooter').innerHTML = txt.gen;
  document.getElementById('aboutMenuFooter').innerHTML = txt.about;
  document.getElementById('newsMenuFooter').innerHTML = txt.news;
  document.getElementById('productMenuFooter').innerHTML = txt.product;
  document.getElementById('carerMenuFooter').innerHTML = txt.carer;
  document.getElementById('contactMenuFooter').innerHTML = txt.contact;

  document.getElementById('adminp').innerHTML = txt.adminp;
  document.getElementById('perdate').innerHTML = txt.perdate;
  document.getElementById('polit').innerHTML = txt.polit;
  document.getElementById('razrab').innerHTML = txt.razrab;

  // Навигация
  document.getElementById('genMenuNav').innerHTML = txt.gen;
  document.getElementById('product').innerHTML = txt.product;
  document.getElementById('too').innerHTML = txt.too;
  document.getElementById('titleMenuFooter').innerHTML = txt.titleMenuFuter;
  document.getElementById('titleMenuFooter2').innerHTML = txt.titleMenuFuter2;

  document.getElementById('prdTitle').innerHTML = txt.product;
  // document.getElementById('tooTitle').innerHTML = txt.too;
  // document.getElementById('tleTitle').innerHTML = telTitle;

  database.ref(lng + '/page/contact/adres').on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);

    // document.getElementById('adres').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
    document.getElementById('adresMenu').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
  });


}
function transPageNews(lng) {
  let txt;
  switch (lng) {
    case 'ru':
      txt = menuRu;

      break;
    case 'en':
      txt = menuEn;

      break;
    case 'kz':
      txt = menuKz;

      break;
  }
  // Меню десктоп
  document.getElementById('genMenu').innerHTML = txt.gen;
  document.getElementById('aboutMenu').innerHTML = txt.about;
  document.getElementById('newsMenu').innerHTML = txt.news;
  document.getElementById('productMenu').innerHTML = txt.product + '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="10px" height="10px"  viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;"  xml:space="preserve"> <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>  </g></svg>';
  document.getElementById('product1Menu').innerHTML = txt.product1;
  document.getElementById('product2Menu').innerHTML = txt.product2;
  document.getElementById('product3Menu').innerHTML = txt.product3;
  document.getElementById('carerMenu').innerHTML = txt.carer;
  document.getElementById('contactMenu').innerHTML = txt.contact;
  // Меню мобильная
  document.getElementById('genMenuMobile').innerHTML = txt.gen;
  document.getElementById('aboutMenuMobile').innerHTML = txt.about;
  document.getElementById('newsMenuMobile').innerHTML = txt.news;
  document.getElementById('productMenuMobile').innerHTML = txt.product;
  document.getElementById('product1MenuMobile').innerHTML = txt.product1;
  document.getElementById('product2MenuMobile').innerHTML = txt.product2;
  document.getElementById('product3MenuMobile').innerHTML = txt.product3;
  document.getElementById('carerMenuMobile').innerHTML = txt.carer;
  document.getElementById('contactMenuMobile').innerHTML = txt.contact;
  // футер
  document.getElementById('genMenuFooter').innerHTML = txt.gen;
  document.getElementById('aboutMenuFooter').innerHTML = txt.about;
  document.getElementById('newsMenuFooter').innerHTML = txt.news;
  document.getElementById('productMenuFooter').innerHTML = txt.product;
  document.getElementById('carerMenuFooter').innerHTML = txt.carer;
  document.getElementById('contactMenuFooter').innerHTML = txt.contact;

  document.getElementById('adminp').innerHTML = txt.adminp;
  document.getElementById('perdate').innerHTML = txt.perdate;
  document.getElementById('polit').innerHTML = txt.polit;
  document.getElementById('razrab').innerHTML = txt.razrab;

  // Навигация
  document.getElementById('genMenuNav').innerHTML = txt.gen;
  document.getElementById('nwTitle').innerHTML = txt.news;
  document.getElementById('too').innerHTML = txt.too;
  document.getElementById('titleMenuFooter').innerHTML = txt.titleMenuFuter;
  document.getElementById('titleMenuFooter2').innerHTML = txt.titleMenuFuter2;

  document.getElementById('newTitle').innerHTML = txt.news;
  // document.getElementById('tooTitle').innerHTML = txt.too;
  // document.getElementById('tleTitle').innerHTML = telTitle;

  database.ref(lng + '/page/contact/adres').on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);

    // document.getElementById('adres').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
    document.getElementById('adresMenu').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
  });


}

function transPageVacans(lng) {
  let txt;
  switch (lng) {
    case 'ru':
      txt = menuRu;

      break;
    case 'en':
      txt = menuEn;

      break;
    case 'kz':
      txt = menuKz;

      break;
  }
  // Меню десктоп
  document.getElementById('genMenu').innerHTML = txt.gen;
  document.getElementById('aboutMenu').innerHTML = txt.about;
  document.getElementById('newsMenu').innerHTML = txt.news;
  document.getElementById('productMenu').innerHTML = txt.product + '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="10px" height="10px"  viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;"  xml:space="preserve"> <g> <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>  </g></svg>';
  document.getElementById('product1Menu').innerHTML = txt.product1;
  document.getElementById('product2Menu').innerHTML = txt.product2;
  document.getElementById('product3Menu').innerHTML = txt.product3;
  document.getElementById('carerMenu').innerHTML = txt.carer;
  document.getElementById('contactMenu').innerHTML = txt.contact;
  // Меню мобильная
  document.getElementById('genMenuMobile').innerHTML = txt.gen;
  document.getElementById('aboutMenuMobile').innerHTML = txt.about;
  document.getElementById('newsMenuMobile').innerHTML = txt.news;
  document.getElementById('productMenuMobile').innerHTML = txt.product;
  document.getElementById('product1MenuMobile').innerHTML = txt.product1;
  document.getElementById('product2MenuMobile').innerHTML = txt.product2;
  document.getElementById('product3MenuMobile').innerHTML = txt.product3;
  document.getElementById('carerMenuMobile').innerHTML = txt.carer;
  document.getElementById('contactMenuMobile').innerHTML = txt.contact;
  // футер
  document.getElementById('genMenuFooter').innerHTML = txt.gen;
  document.getElementById('aboutMenuFooter').innerHTML = txt.about;
  document.getElementById('newsMenuFooter').innerHTML = txt.news;
  document.getElementById('productMenuFooter').innerHTML = txt.product;
  document.getElementById('carerMenuFooter').innerHTML = txt.carer;
  document.getElementById('contactMenuFooter').innerHTML = txt.contact;

  document.getElementById('adminp').innerHTML = txt.adminp;
  document.getElementById('perdate').innerHTML = txt.perdate;
  document.getElementById('polit').innerHTML = txt.polit;
  document.getElementById('razrab').innerHTML = txt.razrab;

  // Навигация
  document.getElementById('genMenuNav').innerHTML = txt.gen;
  document.getElementById('ttVacan').innerHTML = txt.carer;
  document.getElementById('too').innerHTML = txt.too;
  document.getElementById('titleMenuFooter').innerHTML = txt.titleMenuFuter;
  document.getElementById('titleMenuFooter2').innerHTML = txt.titleMenuFuter2;

  document.getElementById('titleVacan').innerHTML = txt.carer;
  // document.getElementById('tooTitle').innerHTML = txt.too;
  // document.getElementById('tleTitle').innerHTML = telTitle;

  database.ref(lng + '/page/contact/adres').on('value', (snapshot) => {
    value = snapshot.val();
    // console.log(value);

    // document.getElementById('adres').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
    document.getElementById('adresMenu').innerHTML = value.substring(0, 19) + "<br>" + value.substring(19);
  });


}