/* globals communicate */
this.scroll = (function () {
  communicate.register('scrollUp', scrollUp);
  communicate.register('scrollDown', scrollDown);
  communicate.register('scrollLeft', scrollLeft);
  communicate.register('scrollRight', scrollRight);

  const scrollAmount = 0.9;

  function scrollVertically(dy, smooth) {
    window.scrollBy({
      left: 0,
      top: dy,
      behavior: smooth ? 'smooth' : 'auto',
    });
    return true;
  }

  function scrollHorizontally(dx, smooth) {
    window.scrollBy({
      left: dx,
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
    return true;
  }

  function scrollLeft() {
    return scrollHorizontally(-scrollAmount * window.innerHeight, true);
  }

  function scrollRight() {
    return scrollHorizontally(scrollAmount * window.innterHeight, true);
  }

  function scrollUp() {
    return scrollVertically(-scrollAmount * window.innerHeight, true);
  }

  function scrollDown() {
    return scrollVertically(scrollAmount * window.innerHeight, true);
  }
}());
