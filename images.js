function generateImages(){
	//generates images
	var correctId = Math.floor(Math.random(0,3)+1);
	var correctImg = ['cat','dog','lake'];
	var row = $('<div>').attr({
		'class':'col-md-12 row'
	});
	for(var imageId = 0; imageId < 4; imageId++){
		// 
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
			'src': 'https://source.unsplash.com/random/800x70'+imageId,
			'class': 'img_sizing col-md-3',
			'data-id': imageId
		});
		row.append(img);

	}

	// if(imageId == 5 && )
	$('#container').append(row);

}
