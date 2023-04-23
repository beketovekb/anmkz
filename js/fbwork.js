const database = firebase.database();
// database.ref('page/genpage/opisanie').on('value', (snapshot) => {
// 	const value = snapshot.val();
// 	console.log(value);
// 	$('#geneditoropsinie').text(value);
//   });

function loadLng() {
  if(localStorage.getItem("glblng")!=null)
  {myValue = localStorage.getItem("glblng");}
  //alert(myValue);
  gentt();
  }

  function gentt()
  {
    database.ref(myValue+'/page/genpage/zagolovok').on('value', (snapshot) => {
      const value = snapshot.val();
      console.log(value);
         document.getElementById('gentitle').innerHTML = value;
      });
  }
  