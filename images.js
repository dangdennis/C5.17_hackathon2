/**
* Global variables
*/ 
var correctId = Math.floor((Math.random()*2)+1);
var correctAnswers = ['cat','dog','bird'];
var correctPicture = correctAnswers[correctId]
var count = 0;
var drunkScore = 0;

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
});

function generateImages(){
	//generates images
	var row = $('<div>').attr({
		'class':'col-md-12 row'
	});
	for(var imageId = 0; imageId < 4; imageId++){
		if(imageId == correctId){
			var img = $('<img>').attr({
				'src' : 'https://source.unsplash.com/800x700/?' + correctPicture,
				'class': 'img_sizing col-md-3',
				'data-id': imageId,
			});
			row.append(img);
		} else {	
			var img = $('<img>').attr({
				'src': 'https://source.unsplash.com/random/800x70'+imageId,
				'class': 'img_sizing col-md-3',
				'data-id': imageId
			});
		}
		row.append(img);
	}
	$('#container').append(row);
}


function checkPhoto(thePhoto){
	var compareId = $(thePhoto).attr('data-id');
	if (compareId == correctId){
		count+=3;
		drunkScore++;
		blurMore(count);
		if (drunkScore === 3) {
			hideImages();
			showBars();
		};
	} else {
		console.log('fuck you');
	}
}

/**************
* Blur Feature
***************/

function blurMore(num){
    var blurScale = num;
    $(".img_sizing").css("filter","blur("+blurScale+"px)");
}

function hideImages() {
	$("div.row").css("display","none");
	var display = $("<div>").addClass("")
}

function getDataFromServer(){
    $.ajax({
        //dataType: 'json',
        method: 'GET',
        data: {
            url: 'http://api.brewerydb.com/v2/locations?key=d767749e58ae17fbfafd5509629b2d36&locality=irvine',

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
            }
        },
        error: function(errr) {
            console.log("There was an error");
        }
    });
}

