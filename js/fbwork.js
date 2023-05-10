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
  loadAdminGenPlus(myValue, 'plusTitle', 'plusDesc1', 'pos', 'pls');
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
      if (!value)
        document.getElementById(dv + i).innerHTML = value;
    });
    database.ref(lng + '/page/genplus/' + i + '/opisanie').on('value', (snapshot) => {
      const value = snapshot.val().replace(/<br>/g, "\n");
      // console.log(value);
      if (!value) {
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
  col = 1;
  database.ref(lng + '/page/contact/' + block + '/').once('value', (snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      const item = data[key];
      // console.log(item.zagolovok, item.opisanie);
      if (block == 'number') {
        if (col < 2) {
          const parts = item.opisanie.split("<br>").filter(part => part !== "");
          nmr = "";
          for (let i = 0; i < 1; i++) {
            nmr += "<span class=\"footerCol_desc01\">" + parts[i] + "</span>";
          }
          document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="contact_info">' +
            '<span class="footerCol_title">' + zgl + ':</span>' +
            nmr +
            '</div>');
          col++;
        }

      }
      else if (block == 'other') {
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="contact_info">' +
          '<span class="footerCol_title">' + item.zagolovok + '</span>' +
          '<span class="footerCol_desc02">' + item.opisanie + '</span>' +
          '</div>');
      }

    }
  });
}
function loadCert(dv, lng) {
  document.getElementById(dv).innerHTML = "";
  col=1;
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
      if(col<5)
      {
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<div class="card">' +
        '<div class="cert_card">' +
        '<img src="'+item.imageUrl+'" class="cert_photo">' +
        '<span class="cert_caption">'+txt+'</span>' +
        '</div>'); 
      }
      col++;
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
  console.log('no');
  document.getElementById(dv).innerHTML = "";
  col=1;
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
      if(col<9)
      {
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<a href="'+item.imageUrl+'" data-fancybox="gallery-a" data-fancybox data-caption="'+txt+'">'+
        '<img src="'+item.imageUrl+'" class="gallery-img"/>'+
        '<span class="gallery_caption">'+txt+'</span>'+
        '</a>');
        col++;
      }
      
    }
    //console.log(Math.ceil(col/8));
    bk='';
    // bk='<div class="prev_page"> <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.98926 1.34985L2.48926 6.84985L7.98926 12.3499" stroke="#DBDBDB" stroke-width="3"/> </svg></div>';
    nx='<div class="next_page" onclick="loadCertFullPage(\'sertFullCard\', \''+lng+'\',2);"> <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.32324 17.3499L14.8232 11.8499L9.32324 6.34985" stroke="#DBDBDB" stroke-width="3"/> </svg></div>';
    clpg='<div class="current_page active_page" onclick="loadCertFullPage(\'sertFullCard\', \''+lng+'\',1);">1</div>';
    for (let i = 1; i < Math.ceil(col/8); i++) {
      clpg +='<div class="current_page" onclick="loadCertFullPage(\'sertFullCard\', \''+lng+'\','+(i+1)+');">'+(i+1)+'</div>';
      
    }
    document.getElementById('navCer').innerHTML = bk+clpg+nx;
  });
  
}
function loadCertFullPage(dv, lng, pg) {
  // console.log(pg);
  document.getElementById(dv).innerHTML = "";
  col=1;
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
      st = 8*(pg-1);
      ed = 9*pg;
      console.log(st +' | '+ed);
      if(col>st && col<ed)
      {
        document.getElementById(dv).insertAdjacentHTML('beforeend', '<a href="'+item.imageUrl+'" data-fancybox="gallery-a" data-fancybox data-caption="'+txt+'">'+
        '<img src="'+item.imageUrl+'" class="gallery-img"/>'+
        '<span class="gallery_caption">'+txt+'</span>'+
        '</a>');
      }
      col++;
      
      
    }
    console.log(Math.ceil(col/8));
    bk='';
    nx='';
    if(pg!=1)
    {bk='<div class="prev_page" onclick="loadCertFullPage(\'sertFullCard\', \''+lng+'\','+(pg-1)+');"> <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.98926 1.34985L2.48926 6.84985L7.98926 12.3499" stroke="#DBDBDB" stroke-width="3"/> </svg></div>';}
    if(pg!=Math.ceil(col/8))nx='<div class="next_page" onclick="loadCertFullPage(\'sertFullCard\', \''+lng+'\','+(pg+1)+');"> <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.32324 17.3499L14.8232 11.8499L9.32324 6.34985" stroke="#DBDBDB" stroke-width="3"/> </svg></div>';
    clpg='';
    for (let i = 1; i < Math.ceil(col/8)+1; i++) {
      if(i==pg)clpg+='<div class="current_page active_page" onclick="loadCertFullPage(\'sertFullCard\', \''+lng+'\','+(i)+');">'+(i)+'</div>';
      else clpg +='<div class="current_page" onclick="loadCertFullPage(\'sertFullCard\', \''+lng+'\','+(i)+');">'+i+'</div>';
    }
    document.getElementById('navCer').innerHTML = bk+clpg+nx;
  });
  
}