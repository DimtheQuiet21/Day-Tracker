// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var timeclock = dayjs();
var timeslot = document.getElementById("currentDay");
var currenthour = timeclock.$H;
var currentday = timeclock.$D;
var statichour = currenthour; // This is set on page load and stays the same until changed.
var staticday = ''; //We need to reset the page on every day. This needs to be stored in the local 
var main = $('main');
var storedwork = JSON.parse(localStorage.getItem("work-to-do"));
var timebar = $('<div class = "col-8 col-md-10 timebar">');
var blankbar =$('<div class = "col-2 col-md-1 blankbar">')
var currentslot = '';


function resetpage (){
  for (i = 7; i < 24; i++){
    var hourremove = $("#hour-"+i);
    hourremove.remove();
  };
  $(currentslot).append(blankbar);
  $(currentslot).append(timebar);  
  };

function pageset (){
  statichour = currenthour; // update the static hour
  for (i = 7; i < 21; i++){
    var hourslot = $('<div class = "row time-block">');
    var hourtag =  $('<div class = "col-2 col-md-1 hour text-center py-3">');
    var textbox =  $('<textarea class = "col-8 col-md-10 description" rows = "3">');
    var hourbutton = $('<button class = "btn saveBtn col-2 col-md-1" aria-label = "save">');
    var buttonicon = $('<i class = "fas fa-save" aria-hidden = "true">');

    $(hourslot).attr("id", "hour-"+i);

    $(hourbutton).on("click",function (event){
      event.preventDefault(); 
      if (storedwork === null) {
        storedwork = []; // This gives us a spot IF storedwork had no stored data
      };
      var workhour = $(this).parent().attr("id"); // this gets the id of the hour
      var work = $(this).siblings("textarea").val(); //this gets the value of the text area 
      storedwork.push([workhour,work]); 
      localStorage.setItem("work-to-do", JSON.stringify(storedwork));
      localStorage.setItem("daysaved",currentday)
    });

    if (i> currenthour) {
      hourslot.addClass("future");
    } else if (i===currenthour) {
      hourslot.addClass("present");
      currentslot = "#"+$(hourslot).attr("id");
      console.log(currentslot)
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
  if (storedwork !== null){ //If the page loads and there is something in the stored.work
    if (localStorage.getItem("daysaved") !== currentday.toString()){ //If the day is different, remove all the data from memory. It's a NEW DAY :D
        localStorage.removeItem("work-to-do");//If it's not the same day as when you put in the data, kill that data.
    } else {
      for (i =0; i< storedwork.length; i++){
        var workhourtext = "#"+storedwork[i][0];
        var worktext = storedwork[i][1];
        $(workhourtext).children("textarea").val(worktext);
      }
    };
  };
}


//do one load of the page to get us started. But reload every hour.
resetpage();
pageset();

$(currentslot).append(blankbar); //We run this once on page load, but for the rest of the time, it's all done with reset.
$(currentslot).append(timebar);  

// Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
// This is our clock at the top of the page.
setInterval(function () {
  timeclock = dayjs();
  $(timeslot).text(timeclock.format('MMM D, YYYY [at] hh[:]mm[:]ss A '));
  timebar.attr("style","bottom: "+(10-(timeclock.minute()/60)*10)+"vh")//sets the position of the scroll bar
  }, 1000);

// Let's make another interval that updates every hour on the hour.
setInterval(function(){
currenthour = timeclock.$H // always be updating the dynamic hour
if (currenthour !== statichour) {
  resetpage();
  pageset (); // redo the page
}
},1000) // We check every second, not too much of a task I hope.


