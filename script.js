// Gives the next box the focus
$('#new-text').focus();

// Clears and resets all click event listeners
function clickUpdate(){
    $('p').unbind('click');
    $('p').click(function(){
        $(this).toggleClass('done');
    });
}

function closeUpdate(){
    $('.close').unbind('click');
    $('.close').click(function(){
        //$(this).parent().toggle();
        $(this).parent().remove();
        $('#new-text').focus();
    });
}

// Adds text to a new bullet point
function addNew(){
    const lines = $('#new-text').val().split(/\r\n|\r|\n/).filter(line => line.trim() !== '');
    for (let line of lines) {
        $('ul').append('<li><p>' + line + '</p><span class="close">x</span></li>');
    }
    $('#new-text').val('');
    //$('#new-text').toggle();
    clickUpdate();
    closeUpdate();
}

// only is really useful if there are items already on list
clickUpdate();
closeUpdate();

// Closes text if empty. If it has content it runs addNew()
$('#new-button').click(function(){
    if($('#new-text').val() == ''){
        $('#new-text').animate({width:'toggle'});
        $('#new-text').focus();
    }else{
        addNew();
    }
});

/* Runs when text looses focus. Not working right.
$('#new-text').focusout(function(){
    if($('#new-text').val() == ''){
        //$('#new-text').animate({width:'toggle'});
    }
}); */


$('#new-text').keypress(function(e) {
  if(e.which == 13) {
      $('#new-button').click();
  }
});

$('#title').keypress(function(e) {
  if(e.which == 13) {
      $('#new-text').focus();
  }
});


var confirmOnPageExit = function (e)
{
    // If we haven't been passed the event get the window.event
    e = e || window.event;

    var message = 'You have checklist items that will not be saved.';

    // For IE6-8 and Firefox prior to version 4
    if (e)
    {
        e.returnValue = message;
    }

    // For Chrome, Safari, IE8+ and Opera 12+
    return message;
};


$('body').mousemove(function(){
  if(document.getElementsByTagName('li').length > 0){
    window.onbeforeunload = confirmOnPageExit;
    console.log("pagesave on");
  }
  else{
    window.onbeforeunload = null;
    console.log("pagesave off");
  }
});
