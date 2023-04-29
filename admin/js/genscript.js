
$('body').on('keydown', function () {
	//console.log("Ok");
	editorText = $('#geneditorru').html();
	$('#editorTextru').text(editorText);
	editorText2 = $('#geneditoropsinieru').html();
	$('#editorTextOpisanieru').text(editorText2);
});

$('#savegenru').click(function () {
	if (confirm('Вы уверены?')) {
		// если пользователь нажал "да"
		alert('Вы выбрали "да".');
	} else {
		// если пользователь нажал "нет" или закрыл диалоговое окно
		alert('Вы выбрали "нет".');
	}
});



const database = firebase.database();
const storage = firebase.storage();

function saveGenText(lng, dv, dv2) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref(lng + '/page/genpage').set({
		zagolovok: textToSave
	});

	console.log(textToSave2);
	database.ref(lng + '/page/genpage/opisanie').set(textToSave2);
	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}


//   Загрузка с базы
function loadAdminGen(lng, dv, dv2) {
	database.ref(lng + '/page/genpage/opisanie').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		console.log(value);
		$(dv2).val(value);
	});

	database.ref(lng + '/page/genpage/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		console.log(value);
		$(dv).val(value);
	});
	if(lng == 'ru'){
	for (let index = 1; index <= 4; index++) {
		readico('br'+index,lng,'#genIcoTextRu'+index,'#capIcoTextRu'+index)
	}
}
}

// Сохранения описание с икноками

function saveico(block, lng, dv, dv2, dv3) {
	const title = $(dv).val().replace(/\n/g, "<br>");
	const description = $(dv2).val().replace(/\n/g, "<br>");
	const imageInput = document.getElementById(dv3);
	const reader = new FileReader();

	// Сохранение данных в Firebase Realtime Database и Storage при изменении

	database.ref(lng + '/page/genpageico/' + block + '/title').set(title);
	database.ref(lng + '/page/genpageico/' + block + '/description').set(description);


	if (imageInput.files.length > 0) {
		const file = imageInput.files[0];
		reader.onload = function (event) {
			const fileData = event.target.result;
			const storageRef = firebase.storage().ref();
			const fileRef = storageRef.child(lng + '/page/genpageico/' + block + '/imageUrl/' + block);
			fileRef.put(fileData).then(function (snapshot) {
				console.log("Загрузка файла успешно завершена");
				const storageRef = firebase.storage().ref();
				const fileRef = storageRef.child(lng + '/page/genpageico/' + block + '/imageUrl/' + block);
				fileRef.getDownloadURL().then(function (url) {
					console.log("URL-адрес загруженного файла: " + url);
					database.ref(lng + '/page/genpageico/' + block + '/ico').set(url);
				});
			});
		}

		reader.readAsArrayBuffer(file);

	} else {
		// Файл не был выбран
	}


}

function readico(block, lng, dv, dv2) {
	// Считывание данных из Firebase Realtime Database и отображение на странице
	database.ref(lng + '/page/genpageico/' + block + '/title').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		console.log(value);
		$(dv).val(value);
	});

	database.ref(lng + '/page/genpagecio/' + block + '/description').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		console.log(value);
		$(dv2).val(value);
	});

	//   database.ref('page/genpage/'+block+'/imageUrl').on('value', (snapshot) => {
	// 	const imageUrl = snapshot.val();
	// 	if (imageUrl) {
	// 	  // Отображение изображения на странице
	// 	  const imageElement = document.createElement('img');
	// 	  imageElement.src = imageUrl;
	// 	  document.body.appendChild(imageElement);
	// 	}
	//   });
}