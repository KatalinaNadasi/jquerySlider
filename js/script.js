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

  // set autoswitch slider
  if(autoswitch == true){
    setInterval(nextSlide, autoswitchSpeed);
  }

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
