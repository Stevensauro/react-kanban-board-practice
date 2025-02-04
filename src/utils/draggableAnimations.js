class AnimateSlides {
  constructor(elmnt) {
    this.slideDown = new KeyframeEffect(
        elmnt,
        [{ transform: "translateY(0%)" }, { transform: "translateY(105%)" }],
        { duration: 500, fill: "forwards", composite: 'replace'}
      );
    this.slideUp = new KeyframeEffect(
        elmnt,
        [{ transform: "translateY(105%)" }, { transform: "translateY(0%)" }],
        { duration: 500, fill: "forwards", composite: 'replace'}
      );
  }

  createAnimation(type, timeline) {
    return type === "slideDown"
      ? new Animation(this.slideDown, timeline)
      : new Animation(this.slideUp, timeline);
  }
}

export default AnimateSlides;
