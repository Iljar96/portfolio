let validateForms = function(selector, rules, yaGoal) {

	new window.JustValidate(selector, {
		rules: rules,
		messages: {
      name: 'Enter your name',
      email: 'Enter valid e-mail'
    },
    focusWrongField: true,
		submitHandler: function(form) {

			let formData = new FormData(form);

			let xhr = new XMLHttpRequest();

			let ld = document.querySelector('.popup_load');

			let err = document.querySelector('.popup_error');

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						ld.classList.remove('_active');
						let msg = document.querySelector('.popup_message');
						console.log('Отправлено');

						msg.classList.add('_active');

						setTimeout(function(){
							msg.classList.remove('_active');
							body_lock_remove(100);
						}, 3500);

					} else {
						ld.classList.remove('_active');
						err.classList.add('_active');
						setTimeout(function(){
							err.classList.remove('_active');
							body_lock_remove(100);
						}, 3000);
					}
				}
			}

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			ld.classList.add('_active');
			
			body_lock_add(100);

			form.reset();

		}
	});
}

validateForms('.form', { email: {required: true, email: true}, name: {required: true} }, 'send goal');

