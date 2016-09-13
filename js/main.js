 let processor = {
  timerCallback: function() {
    this.computevideoFrame();
    let self = this;
    setTimeout(function () {
        self.timerCallback();
      }, 0);
  },

  doLoad: function() {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
	this.c2 = document.getElementById("c2");
    this.ctx2 = this.c2.getContext("2d");
  },
  
  captureBackground: function(){
	this.width = this.video.videoWidth;
	this.height = this.video.videoHeight;
    this.ctx2.drawImage(this.video, 0, 0, this.width, this.height);
	this.timerCallback();
	
  },  

  computevideoFrame: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
	let backgroundvideoFrame = this.ctx2.getImageData(0, 0, this.width, this.height);
	let videoFrame = this.ctx1.getImageData(0, 0, this.width, this.height);
	let l = videoFrame.data.length / 4;
	let width = this.width;
	let height = this.height;
	let videoFrame3 = this.ctx1.getImageData(0, 0, this.width, this.height);
	
	for (let i = 0; i < width; i++) {  
		for (let j = 0; j < height; j++ ){
			k = 640*j + i; 
			if ( i  < 200 || i > 400  || j < 90 || j > 400){
				videoFrame3.data[k * 4 + 3] = 0; // background
			} else if (i < 250 || i > 350 || j < 130 || j > 300) {
				videoFrame3.data[k * 4 + 3] = 120; //semi-transparent
			}
		}
    }
		
    //this.ctx1.putImageData(videoFrame, 0, 0);
	//this.ctx1.putImageData(videoFrame2, 0, 0);
	this.ctx1.putImageData(videoFrame3, 0, 0);

    return;
  },
  

};