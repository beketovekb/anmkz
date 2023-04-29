const database = firebase.database();
// database.ref('page/genpage/opisanie').on('value', (snapshot) => {
// 	const value = snapshot.val();
// 	console.log(value);
// 	$('#geneditoropsinie').text(value);
//   });

function loadLng() {
  if (localStorage.getItem("glblng") != null) { myValue = localStorage.getItem("glblng"); }
  //alert(myValue);
  gentt();
  readico(myValue);
}

function gentt() {
  database.ref(myValue + '/page/genpage/zagolovok').on('value', (snapshot) => {
    const value = snapshot.val();
    console.log(value);
    document.getElementById('gentitle').innerHTML = value;
  });
  database.ref(myValue + '/page/genpage/opisanie').on('value', (snapshot) => {
    const value = snapshot.val();
    console.log(value);
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
  database.ref(lng + '/page/genpageico/' + block+i + '/title').on('value', (snapshot) => {
    const value = snapshot.val();
    console.log(value);
    document.getElementById('tb'+i).textContent = value;
  });

  database.ref(lng + '/page/genpageico/' + block+i + '/description').on('value', (snapshot) => {
    const value = snapshot.val();
    console.log(value);
    document.getElementById('cb'+i).textContent = value;
  });
  database.ref(lng + '/page/genpageico/' + block+i + '/ico').on('value', (snapshot) => {
    const value = snapshot.val();
    console.log(value);
    document.getElementById('ib'+i).src = value;
  });
  }
}
