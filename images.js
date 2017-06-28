function generateImages(){
	//generates images
	var correctId = Math.floor((Math.random()*2)+1);
    var correctAnswers = ['cat','dog','bird'];
    var correctPicture = correctAnswers[correctId]
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
		}
		else{
		//add IMGURL from AJAX call
		//'https://source.unsplash.com/400x300/?' + correctPicture;

		var img = $('<img>').attr({
			'src': 'https://source.unsplash.com/random/800x70'+imageId,
			'class': 'img_sizing col-md-3',
			'onclick': 'checkPhoto()',
			'data-id': imageId
		});
		row.append(img);
		}

	}

	// if(imageId == 5 && )
	$('#container').append(row);
	return correctId;


}

function checkPhoto(correctId){
	var correctId = generateImages();
	console.log(correctId);
}
function blurMore(num){
    var windowCondition = 4;
    var score = 0;
    var blurScale = num;
    $("body").css("filter","blur("+blurScale+"px)");
}