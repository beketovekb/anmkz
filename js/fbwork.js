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
  translateTitle(myValue,'webCardContactTitle',['Вэб-сайт','Website','Вэб-сайт']);
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