function send_form(){

	if ($('#uname').val() == "" || $('#psw').val() == ""){
		var html_message = '<div class="alert alert-danger" role="alert" id="error_message">' + 'Certains champs ne sont pas remplis' + '</div>'
		$("#error_message").html(html_message);
	} else {
		$.post('/login', {
			username : $('#uname').val(),
			password : $('#psw').val()
		}, function(response){

			if (response.success){
				load_page('admin_page');
			} else {
				var html_message = '<div class="alert alert-danger" role="alert" id="error_message">' + 'Identifiant ou mot de passe incorrect' + '</div>'
				$("#error_message").html(html_message);
			};


		});
	}
};