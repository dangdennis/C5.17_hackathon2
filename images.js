/**
* Global variables
*/ 

$(document).ready(function(){
	$(window).on('load', function(){
		$('#drunk_modal').modal('show');
	});
	$('#drunk_check').on('click', function(){
		$('#container').removeClass('hidden');
		generateImages();
	});
	$('.img_sizing').on('click',function(){
		console.log('hel');
	})
});

function generateImages(){
	var correctId = Math.floor((Math.random()*2)+1);
	var correctAnswers = ['cat','dog','bird'];
	var correctPicture = correctAnswers[correctId];
	// Generates images
	var row = $('<div>').attr({
		'class':'col-md-12 row'
	});
	for(var imageId = 0; imageId < 4; imageId++){
		if(imageId == correctId){
			var img = $('<img>').attr({
				'src' : 'https://source.unsplash.com/800x700/?' + correctPicture,
				'class': 'img_sizing col-md-3',
				'data-id': imageId,
				'onclick': 'checkPhoto()'
			});
			row.append(img);
		} else {
		var img = $('<img>').attr({
			'src': 'https://source.unsplash.com/random/800x70'+imageId,
			'class': 'img_sizing col-md-3',
			'onclick': 'checkPhoto()',
			'data-id': imageId
		});
		row.append(img);
		}
	}
	$('#container').append(row);
}

function checkPhoto(correctId){
}

function blurMore(num){
    var windowCondition = 4;
    var score = 0;
    var blurScale = num;
    $("body").css("filter","blur("+blurScale+"px)");
}