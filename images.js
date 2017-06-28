function generateImages(){
	//generates images
	var row = $('<div>').attr({
		'class':'col-md-12'
	});
	for(var imageId = 0; imageId < 5; imageId++){
		// var correctId = Math.floor(Math.random(0,4)+1);
		// if(imageId = correctId){
		// 	var img $('<img>').attr({
		// 		'src' : //ajax call
		// 		'class': 'img_sizing col-md-2',
		// 		'data-id': imageId
		// 	})
		// }
		//add IMGURL from AJAX call
		//var imgUrl;

		var img = $('<img>').attr({
			'src': 'https://source.unsplash.com/random/400x30'+imageId,
			'class': 'img_sizing col-md-2',
			'data-id': imageId
		});
		row.append(img);

	}

	// if(imageId == 5 && )
	$('#container').append(row);

}
