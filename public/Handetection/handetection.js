const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.9, // confidence threshold for predictions.
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  naviagtor.mozGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
let model;

handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObject = stream;
        setInterval(runDetection, 100);
      },
      (err) => console.log(err)
    );
  }
});

function runDetection() {
  model.detect(video).then((predictions) => {
    console.log(predictions);
    model.renderPredictions(predictions, canvas, context, video);
    if (predictions.length > 0) {
      audio.play();
    } else {
      audio.pause();
    }
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});

audio.onended = function () {
  alert("Song has ended");
  alert(
    "You've jumpstarted your day! Come back tomorrow and feel better again! 😃"
  );
  window.location.replace("https://ourbothacksproject.web.app");
};
