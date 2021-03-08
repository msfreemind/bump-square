import View from './view';

$(function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  new View(ctx);
});