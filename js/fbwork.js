const database = firebase.database();
// database.ref('page/genpage/opisanie').on('value', (snapshot) => {
// 	const value = snapshot.val();
// 	console.log(value);
// 	$('#geneditoropsinie').text(value);
//   });


  database.ref('page/genpage/zagolovok').on('value', (snapshot) => {
	const value = snapshot.val();
	console.log(value);
    //  $('#gentitle').text(value);
     document.getElementById('gentitle').innerHTML = value;
  });