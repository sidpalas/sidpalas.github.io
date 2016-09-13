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
	//let videoFrame2 = this.ctx1.getImageData(0, 0, this.width, this.height);
	let videoFrame3 = this.ctx1.getImageData(0, 0, this.width, this.height);

	
    // for (let i = 0; i < l; i++) {
      // let r = videoFrame.data[i * 4 + 0];
      // let g = videoFrame.data[i * 4 + 1];
      // let b = videoFrame.data[i * 4 + 2];
    // if (g > 90 && r > 90 && b < 50)
        // videoFrame.data[i * 4 + 3] = 0;
    // }
	
	// for (let i = 0; i < l; i++) {
      // let rdiff = videoFrame2.data[i * 4 + 0]- backgroundvideoFrame.data[i * 4 + 0];
      // let gdiff = videoFrame2.data[i * 4 + 1]- backgroundvideoFrame.data[i * 4 + 1];
      // let bdiff = videoFrame2.data[i * 4 + 2]- backgroundvideoFrame.data[i * 4 + 2];
    // if (Math.abs(rdiff) < 30 && Math.abs(gdiff) <30 && Math.abs(bdiff) < 30)
        // videoFrame2.data[i * 4 + 3] = 0;
    // }
	
	for (let i = 0; i < l; i++) {  
		if ( i % 640*4 < 900 || i % 640*4 > 1600 || i < 640*4*20 || i > 640*4*100){
			videoFrame3.data[i * 4 + 3] = 0;
		} else if (i % 640*4 < 1100 || i % 640*4 > 1390 || i < 640*4*30 || i > 640*4*60) {
			videoFrame3.data[i * 4 + 3] = 120;
		}
    }
		
    //this.ctx1.putImageData(videoFrame, 0, 0);
	//this.ctx1.putImageData(videoFrame2, 0, 0);
	this.ctx1.putImageData(videoFrame3, 0, 0);

    return;
  },
  

};