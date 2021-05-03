import Game from './game';

$( async function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  
  await new Promise(r => setTimeout(r, 500));

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.onorientationchange = function() { 
    const  orientation = window.orientation; 

    switch(orientation) { 
      case 0:
      case 90:
      case -90: 
        window.location.reload(); 
        break; 
    } 
  };

  if (detectMobile()) {
    $('.softkey-container-1').css("display", "flex");
    $('.softkey-container-2').css("display", "flex");
    canvas.width = 1000;
    canvas.height = 800;
  } else if (window.innerWidth > 1915) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight > 800 ? window.innerHeight : 800;
  } else {
    canvas.width = 1000;
    canvas.height = 800;
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