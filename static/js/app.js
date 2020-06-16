import API from "./api.js";

const api = new API();

const $body = document.querySelector("body");
const $videoWrapper = document.querySelector(".video__wrapper");
const $video = document.querySelector("#video");
const $playButton = document.querySelector(".brand__history--video");
const $pauseButton = document.querySelector(".video__wrapper .p-closed");

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
    $body.classList.remove("video__out");
  }, 400);
}

class Slide {
  constructor(slide) {
    this.slide = slide;
    this.initialState = 1;
    this.isInterval = "";
    this.slideAmount = this.slide.length;
    this.$heroLook = document.querySelector(".hero__look");
    this.$heroImage = this.$heroLook.querySelector("img");
    this.$heroDetail = document.querySelector(".hero__detail");
    this.$heroTitle = this.$heroDetail.querySelector(".hero__title");
    this.$heroDescription = this.$heroDetail.querySelector(
      ".hero__description"
    );
    this.$heroBtn = this.$heroDetail.querySelector(".btn");

    this.$sliderLeft = document.querySelector(".slider__btn--left");
    this.$sliderRight = document.querySelector(".slider__btn--right");
    this.$dotLeft = document.querySelector(".hero__dot--left");
    this.$dotRight = document.querySelector(".hero__dot--right");

    this.$dotLeft.addEventListener("click", (e) => {
      let $currentDot = document.querySelector(".hero__dot--active");

      if ($currentDot != e.target || $currentDot != e.target.parentElement) {
        $currentDot.classList.remove("hero__dot--active");
        this.$dotLeft.classList.add("hero__dot--active");
        this.changeSlide("left");
      }
    });
    this.$dotRight.addEventListener("click", (e) => {
      let $currentDot = document.querySelector(".hero__dot--active");

      if ($currentDot != e.target || $currentDot != e.target.parentElement) {
        $currentDot.classList.remove("hero__dot--active");
        this.$dotRight.classList.add("hero__dot--active");
        this.changeSlide("right");
      }
    });
    this.$sliderLeft.addEventListener("click", () => {
      this.changeSlide("left");
    })
    this.$sliderRight.addEventListener("click", () => {
      this.changeSlide("right");
    })

    this.render();
    this.automaticSlide();
  }

  getSlide() {
     return this.slide[this.initialState - 1];
  }
  getPosition(action) {
    (action == "sum") ? ++this.initialState : --this.initialState;

    if (this.initialState > this.slideAmount) {
      return 1;
    } else if (this.initialState < 1) {
      return 2;
    } else {
      return this.initialState;
    }
  }
  changeSlide(type) {
    clearInterval(this.isInterval)
    if (type == "left") {
      this.initialState = this.getPosition("rest")
    } else {
      this.initialState = this.getPosition("sum")
    }
    this.$heroDetail.classList.remove("hero__detail--in");
    this.$heroDetail.classList.add("hero__detail--out");

    this.$heroLook.classList.remove("hero__look--in")
    this.$heroLook.classList.add("hero__look--out")
    
    setTimeout(() => {
      this.$heroDetail.classList.add("hero__detail--in");
      this.$heroDetail.classList.remove("hero__detail--out");
      this.$heroLook.classList.remove("hero__look--out")
      this.$heroLook.classList.add("hero__look--in")
      this.render();
      this.automaticSlide();
    }, 400)
    
  }

  automaticSlide() {
    this.isInterval = setInterval(() => {
      this.changeSlide("right");
    }, 6000)
  }

  buildTitle(title) {
    return `${title}`;
  }
  buildDescription(description) {
    return `${description}`;
  }
  buildBtn(btn) {
    return `${btn}`;
  }
  buildLook(look) {
    return `<img src="${look}" />`
  }

  render() {
    let { title, images, description, btn } = this.getSlide();

    this.$heroTitle.innerHTML = this.buildTitle(title);
    this.$heroLook.innerHTML = this.buildLook(images);
    this.$heroDescription.innerHTML = this.buildDescription(description);  
    this.$heroBtn.innerHTML = this.buildBtn(btn);

  }
}

async function initApp() {
  const slideData = await api.getSlides();
  const slide = new Slide(slideData);

  $playButton.addEventListener("click", () => {
    setTimeout(() => {
      $videoWrapper.classList.add("getUp");
    }, 500);
    $body.classList.add("video__in");
    $body.classList.remove("video__out");
    play();
    clearInterval(slide.isInterval);
  });
  
  $pauseButton.addEventListener("click", () => {
    pause();
    slide.automaticSlide();
  });
  
  $video.addEventListener("ended", () => {
    setTimeout(() => {
      pause();
      slide.automaticSlide();
    }, 500);
  });

}

initApp();
