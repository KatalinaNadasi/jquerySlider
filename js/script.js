$(document).ready(function(){
  //set options
  var speed = 500; //fade speed
  var autoswitch = true; //auto slider options
  var autoswitchSpeed = 4000; // auto slider speed

  //add initial active class
  $('.slider').first().addClass('active');
  //hide slides
  $('.slider').hide();
  $('.active').show();

  //next handler
  $('#next').click(nextSlide);

  //previous handler
  $('#prev').click(previousSlide);

  // set autoswitch
  // if(autoswitch == true){
  //   setInterval(nextSlide, autoswitchSpeed);
  // }

  // switch to the next slide
  function nextSlide(){
    $('.active').removeClass('active').addClass('oldActive');
    if($('.oldActive').is(':last-child')){
      $('.slider').first().addClass('active');
    }else{
      $('.oldActive').next().addClass('active');
    }
  $('.oldActive').removeClass('oldActive');
  $('.slider').fadeOut(speed);
  $('.active').fadeIn(speed);
  }

  function previousSlide(){
    $('.active').removeClass('active').addClass('oldActive');
    if($('.oldActive').is(':first-child')){
      $('.slider').last().addClass('active');
    }else{
      $('.oldActive').prev().addClass('active');
    }
    $('.oldActive').removeClass('oldActive');
    $('.slider').fadeOut(speed);
    $('.active').fadeIn(speed);
  }

});

//Focus event
$(function(){
  var searchBar = $('#query');
  var icon = $('#search-btn');

  $(searchBar).focus(function(){
    $(this).animate({
      width: '100%'
    }, 400);
    $(icon).animate({
      right: '-2px'
    }, 400);
  });

  //Blur event
  $(searchBar).blur(function(){
    if(searchBar.val() == ''){
      $(searchBar).animate({
        width: '45%'
      }, 400);
      $(icon).animate({
        right: '274px'
      }, 400, function(){});
    }
  });
  $('#search-form').submit(function(e){
    e.preventDefault();
  })
})

function search(){
  //clear results
  $('#results').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();

  //run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyAooqgNg4nX1yemhMafbx6voR13GRr78mo'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;
        //Log Data
        console.log(data);

        $.each(data.items, function(i, item){
          //Get Output
          var output = getOutput(item);
          //Display Results
          $('#results').append(output);
        });
        //Next page and Previous page Buttons
        var buttons = getButtons(prevPageToken, nextPageToken);
        //Display Buttons
        $('#buttons').append(buttons);
      }
    );
}

//Build Output
function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  //Build Output String
  var output = '<li>' + '<div class="list-left">' + '<img src="'+thumb+'">' + '</div>' + '<div class="list-right">' + '<h3>' +title+ '</h3>' + '<small>By <span class="cTitle">'+channelTitle+'</span>on '+videoDate+'</small>' + '<p>'+description+'</p>' + '</div>' + '</li>' + '<div class="clearfix"></div>' + '';

  return output;
};

//Build the buttons
function getButtons(prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnOutput = '<div class="button-container">' + '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' + 'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnOutput = '<div class="button-container">' +
    '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'">' +
    'onclick="prevPage();">Previous Page</button>' +
    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'">' +
    'onclick="nextPage();">Next Page</button></div>';
  }

  return btnOutput;

}
