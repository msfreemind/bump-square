import Game from './game';

$(function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  if (detectMobile()) {
    $('.softkey-container-1').css("display", "flex");
    $('.softkey-container-2').css("display", "flex");
  }

  $('.softkey-a').on("touchstart", simulateAPress);
  $('.softkey-a').on("touchend", simulateARelease);
  $('.softkey-s').on("touchstart", simulateSPress);
  $('.softkey-s').on("touchend", simulateSRelease);
  $('.softkey-d').on("touchstart", simulateDPress);
  $('.softkey-d').on("touchend", simulateDRelease);

  new Game(ctx);
});

function simulateAPress() {
  const evt = new KeyboardEvent('keydown', { 'code': 'KeyA' });
  window.dispatchEvent(evt);
}

function simulateARelease() {
  const evt = new KeyboardEvent('keyup', { 'code': 'KeyA' });
  window.dispatchEvent(evt);
}

function simulateSPress() {
  const evt = new KeyboardEvent('keydown', { 'code': 'KeyS' });
  window.dispatchEvent(evt);
}

function simulateSRelease() {
  const evt = new KeyboardEvent('keyup', { 'code': 'KeyS' });
  window.dispatchEvent(evt);
}

function simulateDPress() {
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