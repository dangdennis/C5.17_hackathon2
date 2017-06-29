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
			$('div').on('click', '.img_sizing', function(){
				self.checkPhoto(this);
			});
			$('#youtubeButton').on('click',function() {
				self.getYTVideos();
			})
		});		
	};

	/*************************************
	* Appends Unsplash API photos to dom
	**************************************/
	self.generateImages = function(){
		//generates images
		var row = $('<div>').attr({
			'class':'col-xs-12 row',
			'id': 'refresh'
		});
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
						var img = $('<img>').attr({
							'src' : ""+src,
							'class': 'img_sizing col-xs-6 col-md-3',
							'data-id': correctId
						});
						row.append(img);
						console.log('answer ajax called for imageId');
						self.blurMore(blurCount);
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
						var img = $('<img>').attr({
						'src': ''+src,
						'class': 'img_sizing col-xs-6 col-md-3',
						'data-id': imageId
						});
						row.append(img);
						self.blurMore(blurCount);
					},
					error: function(err) {
						console.log('non-randomId image error',err);
					}
				})	
			}
		}
		$('#container').append(row);
	};

	/**************
	* Checks photo
	***************/

	self.checkPhoto = function(thePhoto){
		var compareId = $(thePhoto).attr('data-id');
		if (drunkScore === 3) {
				self.hideImages();
		} else if (compareId == correctId){
			blurCount+=2.5;
			drunkScore++;
			$("#refresh").remove();
			self.reset();
			self.generateImages();
			blurMore(blurCount);
		} else if (compareId !== correctId) {
			drunkScore--;
			console.log('GTFO, youre too drunk');
			if (drunkScore < 0){
				$("#refresh").css('display','none');
				$('#youtubeButton').css('display','block');
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

	self.getYTVideos = function() {
	    console.log('click initiated');
	    $.ajax({
	        key: 'AIzaSyAyUXMhECYPlriSTzeqEMIyjtE7JxV3cJo',
	        dataType: 'json',
	        url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
	        method: 'post',
	        data: {
	            maxResults: 3,
	            type: 'video',
	            q: 'Don\t Drink and Drive'
	        },
	        success: function(result) {
	            console.log('Youtube AJAX success', result);
	            for(var i=0; i<result.video.length; i++){
	                var video_url = 'https://www.youtube.com/embed/' + result.video[i].id;
	                var video = $('<iframe>').attr({
	                	'src': video_url,
	                	'class': 'col-md-4'
	                	});
	                $("#main").append(video);
	                var video_title = result.video[i].title;
	                var title = $('<h1>').attr({
	                	'src' : video_title,
	                	'class': 'col-md-4'
	                	});
	                $("#main").append(video_title);
	            }
	        },
	        error: function(err) {
	        	console.log('youtube ajax error', err);
	        }
	    });
	    console.log('End of click function');   		
	}	

	self.init();
}

/* Brian Kim's API pull from breweryDB
function getDataFromServerFullerton(){
            $.ajax({
                method: 'GET',
                data: {
                    url: "http://api.brewerydb.com/v2/locations?key=d767749e58ae17fbfafd5509629b2d36&region=CA"
                },
                url:'proxy.php',
                success: function(result){
                    var brewery = JSON.parse(result);
                    for(var i = 0; i < brewery.data.length; i++){
                        var row = $("<tr>");
                        var name = $("<td>").text(brewery.data[i].brewery.name);
                        var address = $("<td>").text(brewery.data[i].streetAddress);
                        var phone = $("<td>").text(brewery.data[i].phone);
                        $("tbody").append(row);
                        $(row).append(name, address, phone);
                        $('.location').text("CA");
                    }
                },
                error: function(errr) {
                    console.log("There was an error");
                }
            });
        }
        $(document).ready(function(){
            getDataFromServerFullerton();
        })
*/
/*
<body>
    <div class="container">
        <div class="container page-header" style="text-align: center">
            <h1>Nearest Bars
                <small class="pull-right">Location: <span class="location"></span></small>
            </h1>
        </div>
        <div class="bar-list col-md-9 col-xs-12" style="left: 182px">
            <table class="bar-list table">
                <thead>
                <tr>
                    <th>Bar Name</th>
                    <th>Bar Address</th>
                    <th>Bar Number</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</body>
*/