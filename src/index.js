import Game from './game';

$(function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  new Game(ctx);
});