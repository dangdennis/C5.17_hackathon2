/**
* Global variables
*/ 
var correctId = Math.floor((Math.random()*2)+1);
var correctAnswers = ['cat','dog','bird'];
var correctPicture = correctAnswers[correctId]
var blurCount = 0;
var drunkScore = 0;
var imageCounter = 4;
var global_result;

/****************
* Document Ready
*****************/

$(document).ready(function(){
	$(window).on('load', function(){
		$('#drunk_modal').modal('show');
	});
	$('#drunk_check').on('click', function(){
		$('#container').removeClass('hidden');
		generateImages();
	});
	$('div').on('click', '.img_sizing', function(){
		checkPhoto(this);
	});
	$('#youtubeButton').on('click',function() {
		getYTVideos();
	})
});

/*************************************
* Appends Unsplash API photos to dom
**************************************/

function generateImages(){
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
					'query' : 'cat',
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
					blurMore(blurCount);
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
					blurMore(blurCount);
				},
				error: function(err) {
					console.log('non-randomId image error',err);
				}
			})	
		}
	}
	$('#container').append(row);
}

/**************
* Checks photo
***************/

function checkPhoto(thePhoto){
	var compareId = $(thePhoto).attr('data-id');
	if (drunkScore === 3) {
			hideImages();
			$('#youtubeButton').css('display','block');
			// showBars();
	} else if (compareId == correctId){
		blurCount+=2.5;
		drunkScore++;
		$("#refresh").remove();
		reset();
		generateImages();
	} else if (compareId !== correctId) {
		drunkScore--;
		console.log('GTFO, youre too drunk');
		// if (drunkScore < 0){
			// $("#refresh").remove();
	}
}

/******
* Blur 
*******/

function blurMore(num){
    var blurScale = num;
    $(".img_sizing").css("filter","blur("+blurScale+"px)");
}

function hideImages() {
	$(".img_sizing").css("display","none");
}

/*******
* Reset 
*******/
function reset() {
	correctId = Math.floor((Math.random()*2)+1);
	correctPicture = correctAnswers[correctId]
}

function getYTVideos() {
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
            global_result = result;
            for(var i=0; i<global_result.video.length; i++){
                var dog_video = 'https://www.youtube.com/embed/' + global_result.video[i].id;
                var video = $('<iframe>').attr('src', dog_video);
                $("#main").append(video);
                var video_title = global_result.video[i].title;
                var title = $('<h1>').attr('src', video_title);
                $("#main").append(video_title);
            }
        }
    });
    console.log('End of click function');   		
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