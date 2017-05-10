$(function() {

	function load(){
		set_criteres();
		get_ranking();
		get_NLP();
		get_Usecases();
	}

    load();

	function get_ranking(){
		$.post( "/stats/average/ranking", function( data ) {
			if(data.ranking < 1.6){
				$("#stats-average-ranking-panel").attr( "class", "panel panel-red" )
			}else if(data.ranking < 3.3){
				$("#stats-average-ranking-panel").attr( "class", "panel panel-yellow" )
			}else{
				$("#stats-average-ranking-panel").attr( "class", "panel panel-green" )
			}

			$("#stats-average-ranking-value").html(data.ranking);
			$("#stats-average-ranking-nb-users").html(data.nbUsers);
		});
	}

	function get_NLP(){
		$.post( "/stats/NLP/calls/total", function( data ) {
			$("#stats-NLP-calls").html(data.value);
		});
	}

	function get_Usecases(){
		$.post( "/stats/Usecases/calls/total", function( data ) {
			$("#stats-usecases-calls").html(data.value);
		});
	}

	function set_criteres(){
		$.post("/criteres/get", function( data ){
			var modulo = 0;
			for(var critere in data){
				var critereValues = data[critere];
				var critObjects = $("<div>", { class: "criteres_checkbox_container"});
				for(var v in critereValues){
					var val = critereValues[v];
					critObjects.append($("<div/>", { class: "checkbox"})
						.append($("<label>")
							.append(
								$("<input/>", {
									type: "checkbox",
									class: "critere_checkbox criteres__"+critere+"__"+val.value,
								}).data("critere", critere).data("value", val.value),
								$("<span/>").text(val.display)
							)
						)
					)
				}

				if(modulo % 4 == 0){
					$("#criteres-list").append($("<div/>", { class: "row" }))
				}
				$("#criteres-list div.row:last-child")
				.append($("<div/>", { class: "col-md-3" })
				.append(
					$("<h4/>", { class: "critere-h4"}).text(critere),
					critObjects
				))
				modulo += 1;
			}
			$("#criteres-list div.row:last-child")
				.append($("<div/>", { class: "col-md-3" })
					.append(
						$("<div/>"),
						$("<button/>", {
							class: "btn btn-primary btn-criteres-confirm",

						}).text("Valider les critères"), 
						$("<div/>", { class: "criteres_return_info"})
					)
				)
		})
	}

	function toogleCheckboxesCriters(){
		console.log("Click !")
		$(this).parent().find(".criteres_checkbox_container").each(function(){
	        $(this).find("input").each(function(){
	        	$(this).prop("checked", !$(this).prop("checked"));
	        });
		})
	}

	function confirm_criteres(){
		var criteres = {};
		$(".critere_checkbox").each(function(){
			var critere = $(this).data("critere")
			var value = $(this).data("value")
			if($(this).prop("checked")){
				if(!criteres[critere]){
					criteres[critere] = [ value ]
				}else{
					criteres[critere].push(value)
				}
			}
		})
		$.post( "/criteres/validate", criteres, function( returnData ) {
			console.log(returnData)
			$(".criteres_return_info").text(returnData.nbUsers+" utilisateurs impactés")
		}, "json");
		return false;
	}

	function addElement(id){
		$("#messages").append($("<div/>", {
				class: 'panel panel-default message__'+id,
			}).data("id", id).append(
				$("<div/>", {
					class: 'panel-heading'
				}).append(
					$("<h3/>", { class: "pull-left"}).text("Element n°"+id),
					$("<div/>", {class: "pull-right"}).append(
						$("<input/>", {
							type: "text",
							class: 'message__'+id+'__timeout',
							value: "0",
							placeholder: "Temporisation (millisecondes)"
						})
					),
					$("<div/>", { class: "clearfix" })
				),
				$("<div/>", {
					class: 'panel-body'
				}).append(
					$("<div/>", {
						class: 'form-group'
					}).append(
						$("<label/>", {
							for: "message__"+id+"__type",
							class: "col-sm-4 control-label"
						}).text("Type de message"),
						$("<div/>", {
							class: "col-sm-8"
						}).append(
							$("<select/>", {
								class: "form-control element-type",
								id: "message__"+id+"__type"
							}).append(
								$("<option/>", {
									value: "text"
								}).text("Texte"),
								$("<option/>", {
									value: "image"
								}).text("Image"),

								$("<option/>", {
									value: "video"
								}).text("Video"),

								$("<option/>", {
									value: "carousel"
								}).text("Carousel")
							)
						)
					),
					$("<div/>", {
						class: "message__"+id+"__contents"
					})
				)
			)
		)
		updateElement(false, id, "text")
	}

	function updateElement(err, id, type){
		if(id === undefined && type === undefined){
	    	var type = $(this).val();
	    	var id = $(this).attr('id').split("__")[1];
		}
	    if(type == "text"){
	    	$(".message__"+id+"__contents").html("");
	    	$(".message__"+id+"__contents").append(
				$("<label/>", {
					for: "message__"+id+"__text",
					class: "col-sm-4 control-label"
				}).text("Texte"),
				$("<div/>", {
					class: "col-sm-8"
				}).append(
					$("<input/>", {
						type: "text",
						class: "form-control",
						id: "message__"+id+"__text",
						placeholder: "Contenu du message"
					})
				)
			)
	    }else if(type == "image"){
	    	$(".message__"+id+"__contents").html("");
	    	$(".message__"+id+"__contents").append(
				$("<label/>", {
					for: "message__"+id+"__text",
					class: "col-sm-4 control-label"
				}).text("URL de l'image"),
				$("<div/>", {
					class: "col-sm-8"
				}).append(
					$("<input/>", {
						type: "text",
						class: "form-control",
						id: "message__"+id+"__image-url",
						placeholder: "URL de l'image"
					})
				)
			)
	    }else if(type == "video"){
	    	$(".message__"+id+"__contents").html("");
	    	$(".message__"+id+"__contents").append(
				$("<label/>", {
					for: "message__"+id+"__text",
					class: "col-sm-4 control-label"
				}).text("URL de la video"),
				$("<div/>", {
					class: "col-sm-8"
				}).append(
					$("<input/>", {
						type: "text",
						class: "form-control",
						id: "message__"+id+"__video-url",
						placeholder: "URL de la video"
					})
				)
			)

	    }else if(type == "carousel"){
	    	$(".message__"+id+"__contents").html("");
	    	$(".message__"+id+"__contents").append(
	    		$("<div/>", {
	    			id: "message__"+id+"__carousel"
	    		}).append(
	    			carousel_card(id, 1)
	    		),
	    		$("<div/>", {
	    			class: "control_form text-center col-md-12"
	    		}).append(
	    			$("<button/>", {
	    				class: "btn btn-default add_carousel_button"
	    			}).text("Ajouter un élément au carousel").data("id", id).data("card_id", 1)
	    		)
	    	);


	    }
	}

	function carousel_card(id, card_id){
		return $("<div/>", {
			class: "col-md-4 carousel_card message__"+id+"__carousel__"+card_id
		}).data("card_id", card_id).append(
			$("<div/>", {
				class: "panel panel-default"
			}).append(
				$("<div/>", {
					class: "panel-heading"
				}).text("Carte n°"+card_id),
				$("<div/>", {
					class: "panel-body"
				}).append(

					$("<input/>", {
						type: "text",
						class: "image-url form-control",
						placeholder: "URL de l'image"
					}),
					$("<input/>", {
						type: "text",
						class: "title form-control",
						placeholder: "Titre"
					}),
					$("<input/>", {
						type: "text",
						class: "subtitle form-control",
						placeholder: "Sous-titre",
					}),
					$("<input/>", {
						type: "text",
						class: "button_1 form-control",
						placeholder: "Premier bouton",
					}),
					$("<input/>", {
						type: "text",
						class: "button_1_url form-control",
						placeholder: "URL du premier bouton",
					}),
					$("<input/>", {
						type: "text",
						class: "button_2 form-control",
						placeholder: "Second bouton",
					}),
					$("<input/>", {
						type: "text",
						class: "button_2_url form-control",
						placeholder: "URL du second bouton",
					})
				)
			)
		)
	}

	function addCarouselCard(){
		var id = $(this).data("id");
		var card_id = $(this).data("card_id") + 1;
		if(card_id > 7){
			alert("Un carousel ne peut avoir que 7 cartes maximum")
		}else{
			$(this).data("card_id", card_id);
			$("#message__"+id+"__carousel").append(
				carousel_card(id, card_id)
			)
		}
		return false;
	}

	$("#criteres-list").on('click', ".critere-h4", toogleCheckboxesCriters)
	$("#criteres-list").on('click', ".criteres_checkbox_container input", function(){ $(".criteres_return_info").text("") })
	$("#criteres-list").on('click', ".btn-criteres-confirm", confirm_criteres)

	$("#messages").on('click', ".add_carousel_button", addCarouselCard);
	$("#messages").on('change', ".element-type", updateElement);

	var id = 1;
	updateElement(false, 1, $("#message__1__type").val())
	$("#add_element_to_msg").click(function(){
		id = id +1;
		addElement(id);
		return false;
	})

	$("#send_message").click(function(){
		var data = {
			elements: []
		};

		var mode = $("#nav-modes").data("mode");
		data.mode = mode;
		if(mode == "push"){
		var criteres = {};
			$(".critere_checkbox").each(function(){
				var critere = $(this).data("critere")
				var value = $(this).data("value")
				if($(this).prop("checked")){
					if(!criteres[critere]){
						criteres[critere] = [ value ]
					}else{
						criteres[critere].push(value)
					}
				}
			})
			data.criteres = criteres
		}

		$("#messages").children().each(function(){
			var element = {};
			var id = $(this).data("id");
			var type = $("#message__"+id+"__type").val();
			var timeout = $('.message__'+id+'__timeout').val();

			element.timeout = parseInt(timeout);
			element.type = type;
			if(type == "text"){
				element.text = $("#message__"+id+"__text").val();
			}else if(type == "image"){
				element.imageUrl = $("#message__"+id+"__image-url").val();

			}else if(type == "video"){
				element.videoUrl = $("#message__"+id+"__video-url").val();

			}else if(type == "carousel"){
				element.cards = []
				$("#message__"+id+"__carousel").children().each(function(){
					var card = {};
					var card_id = $(this).data("card_id");

					card.img = $(".message__"+id+"__carousel__"+card_id+" .image-url").val();
					card.title = $(".message__"+id+"__carousel__"+card_id+" .title").val();
					card.subtitle = $(".message__"+id+"__carousel__"+card_id+" .subtitle").val();
					card.button_1 = $(".message__"+id+"__carousel__"+card_id+" .button_1").val();
					card.button_1_url = $(".message__"+id+"__carousel__"+card_id+" .button_1_url").val();
					card.button_2 = $(".message__"+id+"__carousel__"+card_id+" .button_2").val();
					card.button_2_url = $(".message__"+id+"__carousel__"+card_id+" .button_2_url").val();
					element.cards.push(card);
				})
			}
			data.elements.push(element)
		})

		$.post( "/send/message/", data, function( returnData ) {
		  if(returnData.alert){
		  	location.reload();
		  }
		}, "json");
		console.log(data.elements);
		return false;
	})

	$(".switch-mode").click(function(){
		$(this).parent().parent().children().attr("class", "");
		$(this).parent().attr("class", "active");
		var mode = $(this).parent().data("mode");
		$("#nav-modes").data("mode", mode);
		if(mode == "push"){
			$("#push").show();
			$("#send_message").text("Envoyer le message");
		}else{
			$("#push").hide();
			$("#send_message").text("Définir ce message d'offre");
		}
		return false;
	})





});