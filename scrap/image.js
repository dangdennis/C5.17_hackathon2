function generateImage() {
    'use strict';
    var video = document.querySelector('video')
      , canvas;
    var button = document.querySelector('.take_picture');


    /**
     * creates and image and removes it video tag from the div class
     */
    function takeSnapshot() {
        var img = document.querySelector('img') || document.createElement('img');
        var context;
        var width = video.offsetWidth, height = video.offsetHeight;

        canvas = canvas || document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, width, height);

        img.src = canvas.toDataURL('image/png');
        $('.video_display').append(img);
        $('video').remove();
      //call function for AJAX call to IBMWatson
      //processImage(img.src);'[;]'
    }

    //asks browser user if they can use their media devices
    if (navigator.mediaDevices) {
      // access the web cam
      navigator.mediaDevices.getUserMedia({video: true})
      // permission granted:
      //stream is equal to the idea of the userMedia amongst other things
        .then(function(stream) {
          console.log(stream);
          video.srcObject = stream;
          button.addEventListener('click', takeSnapshot);
        })
        // permission denied:
        .catch(function(error) {
          document.body.textContent = 'Could not access the camera. Error: ' + error.name;
        });
    }
  }