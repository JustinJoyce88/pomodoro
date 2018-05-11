"use strict";

$(() => {
  let sesMins = parseInt($(".minutes").html());
  let sesSecs = 0;
  let breakMins = parseInt($(".break-minutes").html());
  let countdown;
  let isRunning = false;

  //SESSION CONTROL FUNCTIONS
  $("#min-minus").on("click", function() {
    if (!isRunning) {
      if (sesMins > 25) {
        $(".minutes").html((sesMins -= 1));
        $(".session-time").html(sesMins + ":00");
      }
    }
  });

  $("#min-plus").on("click", function() {
    if (!isRunning) {
      if (sesMins < 50) {
        $(".minutes").html((sesMins += 1));
        $(".session-time").html(sesMins + ":00");
      }
    }
  });

  //BREAK CONTROL FUNCTIONS
  $("#break-minus").on("click", function() {
    if (!isRunning) {
      if (breakMins > 5) {
        $(".break-minutes").html((breakMins -= 1));
        $(".break-time").html(breakMins + ":00");
      }
    }
  });

  $("#break-plus").on("click", function() {
    if (!isRunning) {
      if (breakMins < 10) {
        $(".break-minutes").html((breakMins += 1));
        $(".break-time").html(breakMins + ":00");
      }
    }
  });

  $("#start").on("click", function() {
    if (!countdown) {
      isRunning = true;
      sessionTimer(sesMins, sesSecs);
    }
  });

  $("#pause").on("click", function() {
    if (isRunning) {
      sesMins = $(".session-time")
        .html()
        .substr(0, 2);
      sesSecs = $(".session-time")
        .html()
        .substr(3, 5);
      clearInterval(countdown);
      countdown = "";
    }
  });

  $("#reset").on("click", function() {
    isRunning = false;
    clearInterval(countdown);
    countdown = "";
    sesMins = 25;
    sesSecs = 0;
    $(".minutes").html("25");
    $(".session-time").html("25:00");
    $(".break-minutes").html("5");
    $(".break-time").html("5:00");
  });

  //COUNTDOWNS
  const sessionTimer = (num, num2) => {
    let mins = num;
    let secs = num2 || 0;
    countdown = setInterval(() => {
      $(".session-time").html(`${mins}:${("0" + secs).slice(-2)}`);
      if (mins === 0 && secs === 0) {
        $(".session-time").html("0:00");
        clearInterval(countdown);
        document.getElementById("audio").play();
        breakTimer(breakMins);
      }
      if (secs === 0) {
        mins--;
        secs = 60;
      }
      secs--;
    }, 1000);
  };

const breakTimer = (num) => {
    let mins = num;
    let secs = 0;

    let countdown = setInterval(() => {
      $(".break-time").html(`${mins}:${("0" + secs).slice(-2)}`);
      if (mins === 0 && secs === 0) {
        $(".break-time").html("0:00");
        clearInterval(countdown);
        document.getElementById("audio").play();
      }
      if (secs === 0) {
        mins--;
        secs = 60;
      }
      secs--;
    }, 1000);
  };
  //END DOCUMENT READY
});
