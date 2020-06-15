const $body = document.querySelector("body");
const $videoWrapper = document.querySelector(".video__wrapper");
const $video = document.querySelector("#video");
const $playButton = document.querySelector(".brand__history--video");
const $pauseButton = document.querySelector(".video__wrapper .p-closed");

console.dir($pauseButton);

$playButton.addEventListener("click", () => {
  setTimeout(() => {
    $videoWrapper.classList.add("getUp");
  }, 500);
  $body.classList.add("video__in");
  $body.classList.remove("video__out");
  play();
});

$pauseButton.addEventListener("click", () => {
  pause();
});

$video.addEventListener("ended", () => {
  setTimeout(() => {
    pause();
  }, 500)
})

function play() {
  $video.play();
}
function pause() {
  $body.classList.add("video__out");
  $body.classList.remove("video__in");
  $videoWrapper.classList.remove("getUp");
  setTimeout(() => {
    $video.pause();
    $video.currentTime = 0;
  }, 500);
}

