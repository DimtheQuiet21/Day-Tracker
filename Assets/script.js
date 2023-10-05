// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var timeclock = dayjs();
var timeslot = document.getElementById("currentDay");
var currenthour = timeclock.$H
var statichour = currenthour; // This won't change in our time

// Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
// This is our clock at the top of the page.
setInterval(function () {
    timeclock = dayjs();
    $(timeslot).text(timeclock.format('MMM D, YYYY [at] hh[:]mm[:]ss A '));
    }, 1000);

// Let's make another interval that updates every hour on the hour.
setInterval(function(){
  currenthour = timeclock.$H // always be updating the dynamic hour
  if (currenthour !== statichour) {
    pageset (); // redo the page
  }
},1000) // We check every second, not too much of a task I hope.

function pageset (){
  statichour = currenthour; // update the static hour
  for (i = 7; i < 24; i++){
    var main = $('main');
    //var hourslot = document.createElement("div");
    var hourslot = $('<div class = "row time-block">');
    var hourtag =  $('<div class = "col-2 col-md-1 hour text-center py-3">');
    var textbox =  $('<textarea class = "col-8 col-md-10 description" rows = "3">');
    var hourbutton = $('<button class = "btn saveBtn col-2 col-md-1" aria-label = "save">');
    var buttonicon = $('<i class = "fas fa-save" aria-hidden = "true">');

    $(hourslot).attr("id", "hour-"+i);

    if (i> currenthour) {
      hourslot.addClass("future");
    } else if (i===currenthour) {
      hourslot.addClass("present");
    } else if (i < currenthour) {
      hourslot.addClass("past");
    };

    if (i === 0){
      hourtag.text("12:00 AM")
    } else if (i>=0 && i<=11){
      hourtag.text(i+":00 AM");
    } else if (i === 12){
      hourtag.text(i+":00 PM");
    } else if (i>12) {
      hourtag.text(i-12+":00 PM");
    };
  
    main.append(hourslot);
    hourslot.append(hourtag);
    hourslot.append(textbox);
    hourslot.append(hourbutton);
    hourbutton.append(buttonicon);
  };
}

//do one load of the page to get us started. But reload every hour.
pageset();

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
