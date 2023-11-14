// JavaScript Document
			// create local database firestore variable
			var db = firebase.apps[0].firestore();
			var auth = firebase.apps[0].auth();

			// create local from webpage inputs
			const txtNombre = document.querySelector('#txtNombre');
			const txtEmail = document.querySelector('#txtEmail');
			const txtContra = document.querySelector('#txtContra');

			// create local insert button
			const btnInsUser = document.querySelector('#btnInsUser');

			// assign button listener
			btnInsUser.addEventListener('click', function () {
				auth.createUserWithEmailAndPassword(txtEmail.value, txtContra.value)
					.then((userCredential) => {
						const user = userCredential.user;
						const creationTime = firebase.firestore.FieldValue.serverTimestamp(); // marca de tiempo de creación

						db.collection("datosUsuarios").add({
							"idemp": user.uid,
							"usuario": txtNombre.value,
							"email": user.email,
							"fechaCreacion": creationTime, 
                			"ultimoAcceso": creationTime
						}).then(function (docRef) {
							alert("Usuario agregado satisfactoriamente");
							limpiar();
						}).catch(function (FirebaseError) {
							alert("Error al registrar datos del usuario." + FirebaseError);
						});
					})
					.catch((error) => {
						alert("Error al agregar el nuevo usuario: " + error.message);
					});
			});

			function actualizarUltimoAcceso(userId) {
				const userRef = db.collection("datosUsuarios").doc(userId);
				const lastAccessTime = firebase.firestore.FieldValue.serverTimestamp(); // marca de tiempo del servidor para último acceso
			
				return userRef.update({
					"ultimoAcceso": lastAccessTime
				})
				.then(() => {
					console.log("Último acceso actualizado con éxito");
				})
				.catch((error) => {
					console.error("Error al actualizar último acceso: ", error);
				});
			}

			
			function limpiar(){
				txtNombre.value = '';
				txtEmail.value = '';
				txtContra.value = '';
				txtNombre.focus();
			}