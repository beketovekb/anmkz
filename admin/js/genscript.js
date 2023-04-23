
$('body').on('keydown', function() {
	//console.log("Ok");
	editorText = $('#geneditorru').html();
	$('#editorTextru').text(editorText);
	editorText2 = $('#geneditoropsinieru').html();
	$('#editorTextOpisanieru').text(editorText2);
  });

  $( '#savegenru' ).click( function() {
    if ( confirm( 'Вы уверены?' ) ) {
      // если пользователь нажал "да"
      alert( 'Вы выбрали "да".' );
    } else {
      // если пользователь нажал "нет" или закрыл диалоговое окно
      alert( 'Вы выбрали "нет".' );
    }
  });



  const database = firebase.database();

  function saveGenText() {
	const textToSave = $('#geneditorru').html();
	console.log(textToSave);
	database.ref('ru/page/genpage').set({
	  zagolovok: textToSave
	});
	alert("Заголовок изменен");
  }
  function saveGenTextOpisanie(lng, dv) {
	const textToSave = $(dv).html();
	console.log(textToSave);
	database.ref(lng+'/page/genpage/opisanie').set(textToSave);
	alert("Описание изменено");
  }

//   Загрузка с базы
function loadAdminGen(lng, dv,dv2){
  database.ref(lng+'/page/genpage/opisanie').on('value', (snapshot) => {
	const value = snapshot.val();
	console.log(value);
	$(dv).text(value);
  });

  database.ref(lng+'/page/genpage/zagolovok').on('value', (snapshot) => {
	const value = snapshot.val();
	console.log(value);
	$(dv2).text(value);
  });
}