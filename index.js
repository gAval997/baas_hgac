$(() => {
	const apiKey = 'AIzaSyC72GZECOH_G_Pw6ExeoTcbw_6Vn1pc0OI';
	const projectId = 'bedu-firebase-hgac';
	const collections = {
		student: 'student'
	};

	firebase.initializeApp({
		apiKey,
		projectId,
	});

	var db_connection = firebase.firestore();

	const getStudents = () => {
		const connection = db_connection.collection(collections.student)
		.get()
		connection.then((response) => {
			const user_list = response;
			let table_builder = ``;

			response.forEach((doc) => {
				const { id } = doc;
				const data = doc.data();

				table_builder += (`<tr data-id="${id}">`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center; width: 10%;" class="first_name">${id}</td>`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center;" class="first_name">${data.first_name}</td>`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center;" class="last_name">${data.last_name}</td>`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center;" class="level">${data.level}</td>`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center;" class="email">${data.email}</td>`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center;" class="username">${data.username}</td>`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center;" class="address">${data.address}</td>`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center;" class="cellphone">${data.cellphone}</td>`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center;" class="phone">${data.phone}</td>`);
				table_builder += (`	<td style="border: 1px solid black; text-align: center;" class="group_id">${data.group_id}</td>`);
				table_builder += (`</tr>`);
			});
			$("#table_student tbody").html(table_builder);
		});
	};

	getStudents();

	$("body").on("selectstart", "#table_student", (e) => {
		return false
	});

	$("body").on("dblclick", "#table_student_container tbody tr", (e) => {
		const tr = $(e.target).closest("tr");

		const id = $(tr).data("id");
		const first_name = $(tr).find(".first_name").text();
		const last_name = $(tr).find(".last_name").text();
		const level = $(tr).find(".level").text();
		const email = $(tr).find(".email").text();
		const username = $(tr).find(".username").text();
		const address = $(tr).find(".address").text();
		const cellphone = $(tr).find(".cellphone").text();
		const phone = $(tr).find(".phone").text();
		const group_id = $(tr).find(".group_id").text();

		$("#update_id").val(id);
		$("#delete_id").val(id);
		$("#update_first_name").val(first_name);
		$("#update_last_name").val(last_name);
		$("#update_level").val(level);
		$("#update_email").val(email);
		$("#update_username").val(username);
		$("#update_address").val(address);
		$("#update_cellphone").val(cellphone);
		$("#update_phone").val(phone);
		$("#update_group_id").val(group_id);
	});

	$("body").on("click", "#btn_add_student", () => {
		const first_name = $("#new_first_name").val();
		const last_name = $("#new_last_name").val();
		const level = $("#new_level").val();
		const email = $("#new_email").val();
		const username = $("#new_username").val();
		const address = $("#new_address").val();
		const cellphone = $("#new_cellphone").val();
		const phone = $("#new_phone").val();
		const group_id = $("#new_group_id").val();

		add_user({
			first_name,
			last_name,
			level,
			email,
			username,
			address,
			cellphone,
			phone,
			group_id,
		});
	});

	$("body").on("click", "#btn_update_student", () => {
		const id = $("#update_id").val();
		const first_name = $("#update_first_name").val();
		const last_name = $("#update_last_name").val();
		const level = $("#update_level").val();
		const email = $("#update_email").val();
		const username = $("#update_username").val();
		const address = $("#update_address").val();
		const cellphone = $("#update_cellphone").val();
		const phone = $("#update_phone").val();
		const group_id = $("#update_group_id").val();

		update_user(id, {
			first_name,
			last_name,
			level,
			email,
			username,
			address,
			cellphone,
			phone,
			group_id,
		});
	});

	$("body").on("click", "#btn_delete_student", () => {
		const id = $("#delete_id").val();

		if (confirm("Seguro que desea eliminar a este estudiante?")) {
			remove_user(id);
		}
	});

	const add_user = (student_data) => {
		db_connection.collection(collections.student).add(student_data)
		.then((response) => {
			console.log("Document written with ID: ", response.id);
			getStudents();
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
		});
	};

	const update_user = (userId, data) => {
		db_connection.collection(collections.student).doc(userId).set(data, {
			merge: true
		});
		getStudents();
	}

	const remove_user = (userId) => {
		db_connection.collection(collections.student).doc(userId).delete();
		getStudents();
	}

	// const phones = (userId, remove, item) => {
	// 	const user = db_connection.collection(collection).doc(userId)
	//
	// 	if(remove){
	// 		user.update({
	// 			phones: firebase.firestore.FieldValue.arrayRemove(item)
	// 		});
	// 	} else {
	// 		user.update({
	// 			phones: firebase.firestore.FieldValue.arrayUnion(item)
	// 		});
	// 	}
	// }
	//
	//
	// const removeProperty = (userId, property) => {
	// 	const user = db_connection.collection(collection).doc(userId)
	// 	user.update({
	// 		[property]: firebase.firestore.FieldValue.delete()
	// 	})
	// }
	//
	// /* .doc specifies what document has to be worked on */
	// // removeAddres('7h7rLeJKGERkmBDnjuPa');
	// // phones('7h7rLeJKGERkmBDnjuPa', false, '1231231231');
	// // removeUser('Sfita8lkMwXgtzIGOuuz');
})
