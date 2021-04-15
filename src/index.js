import Game from './game';

$(function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  if (detectMobile()) {
    $('.softkey-container-1').css("display", "flex");
    $('.softkey-container-2').css("display", "flex");
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

  if (isTablet) screen.orientation.lock("portrait-primary");

  $('.softkey-a').on("touchstart", simulateAPress);
  $('.softkey-a').on("touchend", simulateARelease);
  $('.softkey-s').on("touchstart", simulateSPress);
  $('.softkey-s').on("touchend", simulateSRelease);
  $('.softkey-d').on("touchstart", simulateDPress);
  $('.softkey-d').on("touchend", simulateDRelease);

  new Game(ctx);
});

function simulateAPress(e) {
  e.preventDefault();

  const evt = new KeyboardEvent('keydown', { 'code': 'KeyA' });
  window.dispatchEvent(evt);
}

function simulateARelease() {
  const evt = new KeyboardEvent('keyup', { 'code': 'KeyA' });
  window.dispatchEvent(evt);
}

function simulateSPress(e) {
  e.preventDefault();

  const evt = new KeyboardEvent('keydown', { 'code': 'KeyS' });
  window.dispatchEvent(evt);
}

function simulateSRelease() {
  const evt = new KeyboardEvent('keyup', { 'code': 'KeyS' });
  window.dispatchEvent(evt);
}

function simulateDPress(e) {
  e.preventDefault();

  const evt = new KeyboardEvent('keydown', { 'code': 'KeyD' });
  window.dispatchEvent(evt);
}

function simulateDRelease() {
  const evt = new KeyboardEvent('keyup', { 'code': 'KeyD' });
  window.dispatchEvent(evt);
}

function detectMobile() {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}