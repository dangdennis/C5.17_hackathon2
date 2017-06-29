$(document).ready(function(){
    $('button').click(function(){
        console.log('click initiated');
        $.ajax({
            key: 'AIzaSyAyUXMhECYPlriSTzeqEMIyjtE7JxV3cJo',
            dataType: 'json',
            url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            method: 'post',
            data: {
                maxResults: 10,
                type: 'video',
                q: 'dog',
            },
            success: function(result) {
                console.log('AJAX Success function called, with the following result:', result);
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
    });
});