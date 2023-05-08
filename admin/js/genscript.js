
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
		// console.log(value);
		$(dv2).val(value);
	});

	database.ref(lng + '/page/genpage/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	if (lng == 'ru') {
		readico('br', lng, '#genIcoTextRu', '#capIcoTextRu')
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
// Загрузка с базы описание с иконками
function readico(block, lng, dv, dv2) {
	for (let i = 1; i <= 4; i++) {
		// Считывание данных из Firebase Realtime Database и отображение на странице
		database.ref(lng + '/page/genpageico/' + block + i + '/title').on('value', (snapshot) => {
			const value = snapshot.val().replace(/<br>/g, "\n");
			// console.log(value);
			$(dv + i).val(value);
		});

		database.ref(lng + '/page/genpageico/' + block + i + '/description').on('value', (snapshot) => {
			const value2 = snapshot.val().replace(/<br>/g, "\n");
			// console.log(snapshot.val());
			$(dv2 + i).val(value2);
		});

	}
}

function saveGenProductText(lng, dv) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref(lng + '/page/genproduct/zagolovok').set(textToSave);
	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}
function saveGenProductName(lng, dv, pr) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref(lng + '/page/genproduct/' + pr + '/nazvanie/').set(textToSave);
	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}
//   Загрузка с базы
function loadAdminGenProduct(lng, dv) {
	database.ref(lng + '/page/genproduct/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
}
function loadAdminGenProductName(lng, dv, pr) {
	database.ref(lng + '/page/genproduct/' + pr + '/nazvanie/').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
}
function loadAdminGenProductName(lng, dv, pr, ful) {
	for (let i = 1; i <= 8; i++) {
		database.ref(lng + '/page/genproduct/' + i + '/nazvanie/').on('value', (snapshot) => {
			const value = snapshot.val().replace(/<br>/g, "\n");
			// console.log(value);
			$(dv + i).val(value);
		});
	}

}
function saveGenAboutText(lng, dv, dv2) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).html();
	console.log(textToSave);
	console.log(textToSave2);
	database.ref(lng + '/page/genabout/').set({
		zagolovokabout: textToSave,
		opisanie: textToSave2
	});

	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}
function loadAdminGenAbout(lng, dv, dv2) {
	database.ref(lng + '/page/genabout/zagolovokabout').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	database.ref(lng + '/page/genabout/opisanie').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv2).html(value);
	});
}

function saveGenPlusText(lng, dv, dv2, pos) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	console.log(textToSave2);
	database.ref(lng + '/page/genplus/' + pos + '/').set({
		zagolovok: textToSave,
		opisanie: textToSave2
	});

	switch (lng) {
		case 'ru': alert("Данные изменен"); break;
		case 'en': alert("Data update"); break;
		case 'kz': alert("Мәліметтер өзгертілді"); break;
	}

}
function loadAdminGenPlus(lng, dv, dv2, pos) {
	database.ref(lng + '/page/genplus/' + pos + '/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	database.ref(lng + '/page/genplus/' + pos + '/opisanie').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv2).html(value);
	});
}

function loadAdminGenPlus(lng, dv, dv2, pos, pls) {
	for (let i = 1; i <= 3; i++) {
		database.ref(lng + '/page/genplus/' + i + '/zagolovok').on('value', (snapshot) => {
			const value = snapshot.val().replace(/<br>/g, "\n");
			// console.log(value);
			$(dv + i).val(value);
		});
		database.ref(lng + '/page/genplus/' + i + '/opisanie').on('value', (snapshot) => {
			const value = snapshot.val().replace(/<br>/g, "\n");
			// console.log(value);
			$(dv2 + i).html(value);
		});
	}

}

function scrit(idcard) {
	console.log(document.getElementById(idcard).style.display);
	stat = document.getElementById(idcard).style.display;
	disp = 'none';
	if (stat == 'block' || stat == '') disp = 'none';
	else {
		disp = 'block';
	}
	document.getElementById(idcard).style.display = disp;
}

function saveImgAbout(dv3) {

	const imageInput = document.getElementById(dv3);
	const reader = new FileReader();

	if (imageInput.files.length > 0) {
		const file = imageInput.files[0];
		reader.onload = function (event) {
			const fileData = event.target.result;
			const storageRef = firebase.storage().ref();
			const fileRef = storageRef.child('aboutImg/');
			fileRef.put(fileData).then(function (snapshot) {

				const storageRef = firebase.storage().ref();
				const fileRef = storageRef.child('aboutImg/');
				fileRef.getDownloadURL().then(function (url) {
					console.log("URL-адрес загруженного файла: " + url);
					database.ref('aboutImg/').set(url);
					alert("Загрузка файла успешно завершена");
				});
			});
		}

		reader.readAsArrayBuffer(file);

	} else {
		// Файл не был выбран
	}


}

function saveHistory(lng, dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).html();
	console.log(textToSave);
	console.log(textToSave2);
	database.ref(lng + '/page/history/' + textToSave + '/').set({
		zagolovok: textToSave,
		opisanie: textToSave2
	});

	switch (lng) {
		case 'ru': alert("Данные сохранены"); break;
		case 'en': alert("Data save"); break;
		case 'kz': alert("Мәліметтер сақталды"); break;
	}
	clearHistory(dv, dv2);
	loadHistoryAdmin(lng, dv3);
}

function clearHistory(dv, dv2) {
	$(dv).val("");
	$(dv2).html("");
}

function updateHistory(lng, year, dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).html();
	console.log(textToSave);
	console.log(textToSave2);
	database.ref(lng + '/page/history/' + textToSave + '/').set({
		zagolovok: textToSave,
		opisanie: textToSave2
	});

	switch (lng) {
		case 'ru': alert("Данные сохранены"); break;
		case 'en': alert("Data save"); break;
		case 'kz': alert("Мәліметтер сақталды"); break;
	}
	loadHistoryAdmin(lng, dv3);
}
function delHistory(lng, year, dv) {
	firebase.database().ref(lng + '/page/history/' + year).remove();
	switch (lng) {
		case 'ru': alert("Данные удалены"); break;
		case 'en': alert("Data delete"); break;
		case 'kz': alert("Мәліметтер жойылды"); break;
	}
	loadHistoryAdmin(lng, dv);
}
function loadHistoryAdmin(lng, dv) {
	$(dv).html('');
	ln = 'Ru';
	yr = 'год';
	switch (lng) {
		case 'ru':
			ln = 'Ru';
			yr = 'год';
			break;
		case 'en':
			ln = 'En';
			yr = 'year';
			break;
		case 'kz':
			ln = 'Kz';
			yr = 'жыл';
			break;

		default:
			break;
	}
	database.ref(lng + '/page/history/').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			console.log(item.zagolovok, item.opisanie);
			$(dv).append('<div class="card"> <div class="card-header"> <strong>' + item.zagolovok + '</strong> ' + yr + ' </div>' +
				'<div class="card-body card-block"> <form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
				'<div class="form-group" style="width: 50%;"><label for="exampleInputName2" class="pr-1  form-control-label">' + yr + '</label>' +
				' <input id="genHistoryTitle' + ln + item.zagolovok + '" type="number" class="form-control w100" value = "' + item.zagolovok + '">' +
				'</div> </form> <br> <div class="toolbar"> <a href="#" class="toolbar-b fas fa-bold" title="Жирный"></a>' +
				' <a href="#" class="toolbar-i fas fa-italic" title="Курсив"></a> <a href="#" class="toolbar-u fas fa-underline" title="Подчёркнутый">' +
				'</a> <a href="#" class="toolbar-s fas fa-strikethrough" title="Зачёркнутый"></a>' +
				' <a href="#" class="toolbar-sup fas fa-superscript" title="Верхний индекс"></a>' +
				' <a href="#" class="toolbar-sub fas fa-subscript" title="Нижний индекс"></a>' +
				' <a href="#" class="toolbar-ul fas fa-list-ul" title="Маркированный список"></a>' +
				' <a href="#" class="toolbar-ol fas fa-list-ol" title="Нумерованный список"></a>' +
				' <a href="#" class="toolbar-p" title="Параграф">p</a> <a href="#" class="toolbar-h1" title="Заголовок">H1</a>' +
				' <a href="#" class="toolbar-hr" title="Горизонтальная линия">hr</a>' +
				' <a href="#" class="toolbar-blockquote fas fa-quote-right" title="Цитата"></a>' +
				' <a href="#" class="toolbar-img far fa-image" title="Изображение"></a>' +
				' <a href="#" class="toolbar-a fas fa-link" title="Ссылка"></a>' +
				'<a href="#" class="toolbar-unlink fas fa-unlink" title="Удаление ссылки"></a>' +
				' <a href="#" class="toolbar-html" title="Вставить html">HTML</a> <a href="#" class="toolbar-text" title="Вставить текст">Text</a> <br> <a href="#" class="toolbar-left fas fa-align-left" title="по левому краю"></a> <a href="#" class="toolbar-center fas fa-align-center" title="по центру"></a> <a href="#" class="toolbar-right fas fa-align-right" title="по правому краю"></a> <a href="#" class="toolbar-justify fas fa-align-justify" title="по ширине"></a> <select class="toolbar-font"> <option selected="selected" disabled="disabled">Шрифт</option> <option value="arial">Arial</option> <option value="Courier New">Courier New</option> <option value="georgia">Georgia</option> <option value="impact">Impact</option> <option value="roboto">Tahoma</option> <option value="Times New Roman">Times New Roman</option> <option value="verdana">Verdana</option> </select> <select class="toolbar-size"> <option selected="selected" disabled="disabled">Размер</option> <option value="1">10px</option> <option value="2">12px</option> <option value="3">14px</option> <option value="4">16px</option> <option value="5">18px</option> <option value="6">21px</option> <option value="7">26px</option> </select> <span>Цвет</span> <input class="toolbar-color" type="color" value="#ff0000"> <span>Фон</span> <input class="toolbar-bg" type="color" value="#ffff00"> <br> <a href="#" class="toolbar-undo fas fa-undo" title="Отмена"></a> <a href="#" class="toolbar-redo fas fa-redo" title="Повтор"></a> <a href="#" class="toolbar-delete far fa-trash-alt" title="Удалить"></a> <a href="#" class="toolbar-selectAll">Выделить всё</a> <a href="#" class="toolbar-removeFormat">Очистить стили</a> <a href="#" class="toolbar-cut fas fa-cut" title="Вырезать"></a> <a href="#" class="toolbar-copy fas fa-copy" title="Копировать"></a> </div>' +
				' <div class="editor" contenteditable="true" id="genHistoryText' + ln + item.zagolovok + '">' + item.opisanie + '</div> </div> <div class="card-footer">' +
				' <button type="submit" class="btn btn-primary btn-sm" onclick="updateHistory(\'' + lng + '\',\'' + item.zagolovok + '\',\'#genHistoryTitle' + ln + item.zagolovok + '\',\'#genHistoryText' + ln + item.zagolovok + '\',\'' + dv + '\')"> <i class="fa fa-dot-circle-o"></i> Сохранить </button>' +
				' <button type="reset" class="btn btn-danger btn-sm" onclick="delHistory(\'' + lng + '\',\'' + item.zagolovok + '\',\'' + dv + '\')"> <i class="fa fa-ban"></i> Удалить </button> </div> </div>');
		}
	});
}

function addPartners() {
	var databaseRef = firebase.database().ref("partners");
	var storageRef = firebase.storage().ref();
	var fileInput = document.getElementById("imageAbout");
	var file = fileInput.files[0];
	if (file) {
		// генерируем случайный ключ для пути в базе данных
		var randomKey = databaseRef.push().key;
		var imageRef = storageRef.child("partners/" + randomKey + "/" + file.name);
		// загружаем файл в Storage
		imageRef.put(file).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// сохраняем путь в базе данных
				databaseRef.child(randomKey).set({
					imageUrl: url
				}).then(function () {
					loadPartners('#custom-nav-home2');
					alert("File uploaded and saved to database!");
				}).catch(function (error) {
					alert("Error saving to database: " + error.message);
				});
			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}

}

function loadPartners(dv) {
	$(dv).html('');
	database.ref('partners').once('value', (snapshot) => {
		const data = snapshot.val();
		for (const key in data) {
			const item = data[key];
			// console.log(key);
			// console.log(item.imageUrl);
			$(dv).append('<div class="card">' +
				'<div class="card-header">' +
				'<strong>Фотография</strong> партнера' +
				'</div>' +
				'<div class="card-body card-block">' +
				'<div class="form-group" style="width: 20%;"><label for="exampleInputEmail2"' +
				'class="px-1  form-control-label">Фотография</label> <img src="' + item.imageUrl + '" alt="">' +
				'</div>' +
				'</div>' +
				'<div class="card-footer">' +
				'<button type="submit" class="btn btn-primary btn-sm" onclick="delPartners(\'' + key + '\')">' +
				'<i class="fa fa-dot-circle-o"></i> удалить' +
				'</button>' +
				'</div>' +
				'</div>');
		}
	});
}

function delPartners(id) {
	firebase.database().ref('partners/' + id).remove();
	loadPartners('#custom-nav-home2');
	alert("Данные удалены");

}

function saveContact(lng, dv, dv2, pos) {
	var databaseRef = firebase.database().ref(lng + '/page/contact/' + pos);
	var randomKey = databaseRef.push().key;
	console.log(randomKey);
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	// console.log(textToSave);
	// console.log(textToSave2);
	database.ref(lng + '/page/contact/' + pos + '/' + randomKey+'/zagolovok').set(textToSave);
	database.ref(lng + '/page/contact/' + pos + '/' + randomKey+'/opisanie').set(textToSave2);
	switch (lng) {
		case 'ru': alert("Данные добавлены"); break;
		case 'en': alert("Add date"); break;
		case 'kz': alert("Мәліметтер қосылды"); break;
	}
	if (pos == 'number') {
		loadContact('ru', '#cardPhoneRu', 'number');
	}
	else if (pos == 'other') {
		loadContact('ru', '#cardOtherRu', 'other');
	}

}
function saveContact2(lng, dv, dv2, pos, randomKey) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	// console.log(textToSave);
	// console.log(textToSave2);
	database.ref(lng + '/page/contact/' + pos + '/' + randomKey+'/zagolovok').set(textToSave);
	database.ref(lng + '/page/contact/' + pos + '/' + randomKey+'/opisanie').set(textToSave2);

	switch (lng) {
		case 'ru': alert("Данные добавлены"); break;
		case 'en': alert("Add date"); break;
		case 'kz': alert("Мәліметтер қосылды"); break;
	}
	if (pos == 'number') {
		loadContact('ru', '#cardPhoneRu', 'number');
	}
	else if (pos == 'other') {
		loadContact('ru', '#cardOtherRu', 'other');
	}

}
function clearContact(dv, dv2) {
	$(dv).val("");
	$(dv2).html("");
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
				$(dv).append('<div class="card">' +
					'<div class="card-header">' +
					'<strong>' + item.zagolovok + '</strong>' +
					'</div>' +
					'<div class="card-body card-block">' +
					'<form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
					'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
					'class="pr-1  form-control-label">Заголовок</label><textarea ' +
					'id="' + key + 'Title' + ln + '1" class="form-control w100">' + item.zagolovok.replace(/<br>/g, "\n") + ' </textarea></div>' +
					'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
					'class="pr-1  form-control-label">Номер телефона</label><textarea ' +
					'id="' + key + 'Description' + ln + '1" class="form-control w100">' + item.opisanie.replace(/<br>/g, "\n") + ' </textarea>' +
					'</div>' +
					'</form>' +
					'</div>' +
					'<div class="card-footer">' +
					'<button type="submit" class="btn btn-primary btn-sm"' +
					'onclick="saveContact2(\'' + lng + '\',\'#' + key + 'Title' + ln + '1\',\'#' + key + 'Description' + ln + '1\',\'number\',\'' + key + '\')">' +
					'<i class="fa fa-dot-circle-o"></i> Сохранить' +
					'</button>' +
					'<button type="reset" class="btn btn-danger btn-sm"' +
					'onclick="clearContact(\'#' + key + 'Title' + ln + '1\',\'#' + key + 'Description' + ln + '1\')">' +
					'<i class="fa fa-ban"></i> Отменить' +
					'</button>' +
					'</div>' +
					'</div>');
			}
			else if (block == 'other') {
				$(dv).append('<div class="card">' +
					'<div class="card-header">' +
					'<strong>' + item.zagolovok + '</strong>' +
					'</div>' +
					'<div class="card-body card-block">' +
					'<form action="#" method="post" class="form-inline gap20 align-top fd-column">' +
					'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
					'class="pr-1  form-control-label">Заголовок</label><textarea ' +
					'id="' + key + 'Title' + ln + '1" class="form-control w100">' + item.zagolovok.replace(/<br>/g, "\n") + ' </textarea></div>' +
					'<div class="form-group" style="width: 50%;"><label for="exampleInputName2"' +
					'class="pr-1  form-control-label">Номер телефона</label><textarea ' +
					'id="' + key + 'Description' + ln + '1" class="form-control w100">' + item.opisanie.replace(/<br>/g, "\n") + ' </textarea>' +
					'</div>' +
					'</form>' +
					'</div>' +
					'<div class="card-footer">' +
					'<button type="submit" class="btn btn-primary btn-sm"' +
					'onclick="saveContact2(\'' + lng + '\',\'#' + key + 'Title' + ln + '1\',\'#' + key + 'Description' + ln + '1\',\'other\',\'' + key + '\')">' +
					'<i class="fa fa-dot-circle-o"></i> Сохранить' +
					'</button>' +
					'<button type="reset" class="btn btn-danger btn-sm"' +
					'onclick="clearContact(\'#' + key + 'Title' + ln + '1\',\'#' + key + 'Description' + ln + '1\')">' +
					'<i class="fa fa-ban"></i> Отменить' +
					'</button>' +
					'</div>' +
					'</div>');
			}

		}
	});
}
function addImgContact() {
	var databaseRef = firebase.database().ref("contact/imageUrl");
	var storageRef = firebase.storage().ref();
	var fileInput = document.getElementById("imageAbout");
	var file = fileInput.files[0];
	if (file) {
		// генерируем случайный ключ для пути в базе данных
		var imageRef = storageRef.child("contact/" + file.name);
		// загружаем файл в Storage
		imageRef.put(file).then(function (snapshot) {
			// получаем URL файла
			snapshot.ref.getDownloadURL().then(function (url) {
				// сохраняем путь в базе данных
				databaseRef.set(url).then(function () {
					// loadPartners('#custom-nav-home2');
					alert("File uploaded and saved to database!");
				}).catch(function (error) {
					alert("Error saving to database: " + error.message);
				});
			}).catch(function (error) {
				alert("Error getting download URL: " + error.message);
			});
		}).catch(function (error) {
			alert("Error uploading file: " + error.message);
		});
	}

}

function saveCardTitle(dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref('ru/page/contact/zagolovok').set(textToSave);
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave2);
	database.ref('en/page/contact/zagolovok').set(textToSave2);
	const textToSave3 = $(dv3).val().replace(/\n/g, "<br>");
	console.log(textToSave3);
	database.ref('kz/page/contact/zagolovok').set(textToSave3);
	alert("Данные изменен");

}
function loadCardTitle(dv, dv2, dv3) {
	database.ref('ru/page/contact/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv).val(value);
	});
	database.ref('en/page/contact/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv2).html(value);
	});
	database.ref('kz/page/contact/zagolovok').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv3).html(value);
	});
}
function saveCardAdres(dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref('ru/page/contact/adres').set(textToSave);
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave2);
	database.ref('en/page/contact/adres').set(textToSave2);
	const textToSave3 = $(dv3).val().replace(/\n/g, "<br>");
	console.log(textToSave3);
	database.ref('kz/page/contact/adres').set(textToSave3);
	alert("Данные изменен");

}
function loadCardAdres(dv, dv2, dv3) {
	database.ref('ru/page/contact/adres').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	database.ref('en/page/contact/adres').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv2).html(value);
	});
	database.ref('kz/page/contact/adres').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv3).html(value);
	});
}

function saveCardSsil(dv, dv2) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref('contact/insta').set(textToSave);
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave2);
	database.ref('contact/web').set(textToSave2);
	alert("Данные изменен");

}
function loadCardSsil(dv, dv2) {
	database.ref('contact/insta').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv).val(value);
	});
	database.ref('contact/web').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		$(dv2).html(value);
	});

}
function saveRekvizidCardAdres(dv, dv2, dv3) {
	const textToSave = $(dv).val().replace(/\n/g, "<br>");
	console.log(textToSave);
	database.ref('ru/page/rekvizit').set(textToSave);
	const textToSave2 = $(dv2).val().replace(/\n/g, "<br>");
	console.log(textToSave2);
	database.ref('en/page/rekvizit').set(textToSave2);
	const textToSave3 = $(dv3).val().replace(/\n/g, "<br>");
	console.log(textToSave3);
	database.ref('kz/page/rekvizit').set(textToSave3);
	alert("Данные изменен");

}
function loadRekvizidCardTitle(dv, dv2, dv3) {
	database.ref('ru/page/rekvizit').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv).val(value);
	});
	database.ref('en/page/rekvizit').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv2).html(value);
	});
	database.ref('kz/page/rekvizit').on('value', (snapshot) => {
		const value = snapshot.val().replace(/<br>/g, "\n");
		// console.log(value);
		// if(!value)
		$(dv3).html(value);
	});
}