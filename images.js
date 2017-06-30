var dontDrink = new Drunk();

function Drunk() {

	var self = this;

	self.init = function() {
		self.eventHandlers();
	}

	/*******************
	* Declared variables
	********************/ 
	var correctId = Math.floor((Math.random()*3)+1);
	var correctAnswers = ['cat','dog','bird','headphones'];
	var correctPicture = correctAnswers[correctId];
	var blurCount = 0;
	var drunkScore = 0;
	var map;

	/****************
	* Document Ready
	*****************/
	self.eventHandlers = function() {
		$(document).ready(function(){
			$(window).on('load', function(){
				$('#drunk_modal').modal('show');
			});
			$('#drunk_check').on('click', function(){
				$('#container').removeClass('hidden');
				self.generateImages();
			});
		});		
	};

	/*************************************
	* Appends Unsplash API photos to dom
	keys = [
	dennis: 'd349d0fb3f9aa57463894e9d910e3cb8bfac189eade38d25cab16c02c1b014bc',
	insoo: 'eb63abf97e8fe63d45015fb63221b0206196e2667e3c81c5b89d8316b98b89d3',
	brian: '06a9e2bde3eea55d75a73907d11f3ab2e142536b832a5879e6d12f318a469c07',
	howard: '63e09a26ab40332e112ecee256b44d00d17393ba22688913825458af2923a860'

	]
	**************************************/
	self.generateImages = function(){
		//generates images
		for(var imageId = 0; imageId < 4; imageId++){
			if(imageId == correctId){
				$.ajax({
					method: 'GET',
					dataType: 'json',
					data: {
						'client_id' : 'd349d0fb3f9aa57463894e9d910e3cb8bfac189eade38d25cab16c02c1b014bc',
						'query' : correctAnswers[imageId],
						'w' : 800,
						'h' : 600
					},
					url: 'https://api.unsplash.com/photos/random/?',
					success: function(response) {
						console.log(response);
						var src = response.urls.custom;
						var wrapper = $("<div>", {
							'class': 'wrapper_size col-md-6'
						});
						var img = $('<img>',{
							'class': 'img_sizing col-md-12',
							'src' : ""+src,
							'data-id': correctId
						});
						var credit = $('<p>',{
							'class' : 'img_description'
							}).text(`<${response.user.first_name} ${response.user.last_name}/Unsplash>`);
						wrapper.append(credit);
						wrapper.append(img);
						$('.row').append(wrapper);
						console.log('answer ajax called for imageId');
						self.blurMore(blurCount);
						wrapper.on('click', '.img_sizing', function(){
							self.checkPhoto(this);
						});
						$('.correctPicture').text(correctPicture);
					},
					error: function(err) {
						console.log('imageId not working',err);
					}
				})
			} else {
				$.ajax({
					method: 'GET',
					dataType: 'json',
					data: {
						'client_id' : 'd349d0fb3f9aa57463894e9d910e3cb8bfac189eade38d25cab16c02c1b014bc',
						'w' : 800,
						'h' : 600
					},
					url: 'https://api.unsplash.com/photos/random/',
					success: function(response) {
						var src = response.urls.custom;
						var wrapper = $("<div>",{
							'class' : 'wrapper_size col-md-6'
						});
						var img = $('<img>').attr({
						'src': ''+src,
						'class': 'img_sizing col-md-12',
						'data-id': imageId
						});
						if(response.user.last_name === null) {
							var credit = $('<p>',{
							'class' : 'img_description'
							}).text(`<${response.user.first_name}/Unsplash>`);
						}
						else{
							 var credit = $('<div>',{
							'class' : 'img_description'
							}).text(`<${response.user.first_name} ${response.user.last_name}/Unsplash>`);
						}
						wrapper.append(credit);
						wrapper.append(img);
						$('.row').append(wrapper);
						self.blurMore(blurCount);
						wrapper.on('click', '.img_sizing', function(){
							self.checkPhoto(this);
						});
					},
					error: function(err) {
						console.log('non-randomId image error',err);
					}
				})	
			}
		}
	};

	/**************
	* Checks photo
	***************/

	self.checkPhoto = function(thePhoto){
		var compareId = $(thePhoto).attr('data-id');
		if (compareId == correctId){
			blurCount+=2;
			drunkScore++;
			$("#refresh").empty();
			if (drunkScore === 3) {
				$('#container h3').addClass('hidden');
				$('#googleMapContainer').removeClass('hidden');
				$('#map').removeClass('hidden');
				getLocation();
				return;
			}
			self.reset();
			self.generateImages();
			self.blurMore(blurCount);
		} else if (compareId !== correctId) {
			drunkScore--;
			blurCount-=2;
			debugger;
			self.blurMore(blurCount);
			console.log('GTFO, youre too drunk');
			if (drunkScore < 0){
				$("#refresh").css('display','none');
				self.getYTVideos();
			}
		}
	}

	/******
	* Blur 
	*******/

	self.blurMore = function(num){
	    var blurScale = num;
	    $(".img_sizing").css("filter","blur("+blurScale+"px)");
	}

	self.hideImages = function() {
		$("#refresh").css("display","none");
	}

	/*******
	* Reset 
	*******/
	self.reset = function() {
		correctId = Math.floor((Math.random()*2)+1);
		correctPicture = correctAnswers[correctId];
	}

	/***************
	* Youtube Videos 
	****************/
	self.getYTVideos = function() {
	    console.log('click initiated');
	    $.ajax({
	        key: 'AIzaSyAyUXMhECYPlriSTzeqEMIyjtE7JxV3cJo',
	        dataType: 'json',
	        url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
	        method: 'post',
	        data: {
	            maxResults: 1,
	            type: 'video',
	            q: 'Stop drinking and driving because'
	        },
	        success: function(result) {
	            console.log('Youtube AJAX success', result);
	            for(var i=0; i<result.video.length; i++){
	                var video_url = 'https://www.youtube.com/embed/' + result.video[i].id + "?autoplay=1";
	                var video = $('<iframe>').attr({
	                	'src': video_url,
	                	'class': 'col-md-4',
	                	allowfullscreen: '',
	                	});
	                $("#container").append(video);
	                var video_title = result.video[i].title;
	                var title = $('<h1>',{'class' : 'col-md-4'}).text(video_title);
	                $("#container").append(title);
	            }
	        },
	        error: function(err) {
	        	console.log('youtube ajax error', err);
	        }
	    });
	    console.log('End of click function');   		
	};	

	/***************
	* Initiate Map
	****************/
	// self.initMap = function(position) {
	//     var california = {lat: position.coords.latitude, lng: position.coords.longitude};

	//     map = new google.maps.Map(document.getElementById('map'), {
	//         center: california,
	//         zoom: 17
	//     });

	//     var service = new google.maps.places.PlacesService(map);
	//     service.nearbySearch({
	//         location: california,
	//         radius: 10000,
	//         type: ['bar']
	//     }, self.processResults);
	// };

	// self.processResults = function(results, status, pagination) {
	//     if (status !== google.maps.places.PlacesServiceStatus.OK) {
	//         return;
	//     } else {
	//         self.createMarkers(results);

	//         if (pagination.hasNextPage) {
	//             var moreButton = document.getElementById('more');

	//             moreButton.disabled = false;

	//             moreButton.addEventListener('click', function() {
	//                 moreButton.disabled = true;
	//                 pagination.nextPage();
	//             });
	//         }
	//     }
	// }

	// self.createMarkers = function(places) {
	//     var bounds = new google.maps.LatLngBounds();

	//     for (var i = 0, place; place = places[i]; i++) {
	//         var image = {
	//             url: place.icon,
	//             size: new google.maps.Size(71, 71),
	//             origin: new google.maps.Point(0, 0),
	//             anchor: new google.maps.Point(17, 34),
	//             scaledSize: new google.maps.Size(25, 25)
	//         };

	//         var marker = new google.maps.Marker({
	//             map: map,
	//             icon: image,
	//             title: place.name,
	//             position: place.geometry.location
	//         });
 //            var row = $("<tr>");
 //            var name = $("<td>").text(place.name);
 //            var address = $("<td>").text(place.vicinity);
 //            $("tbody").append(row);
 //            $(row).append(name, address);

	//         bounds.extend(place.geometry.location);
	//     }
	//     map.fitBounds(bounds);
	// }


	// self.getLocation = function(){
	//     navigator.geolocation.getCurrentPosition(self.initMap);
	// }

	self.init();
}
