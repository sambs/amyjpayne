$(function(){
  $('#contact-wrap').find('form').submit(function(){
    $.post(
      'thanks',
      $(this).serialize(),
      console.log,
      'html'
    )
    return false
  })

  $('#contact-link').click(function(){
    $('#contact-wrap').slideToggle('slow')
    return false
  })

  //$('a.fancyzoom').fancyZoom({
    //scaleImg: true,
    //closeOnClick: true,
    //directory: '/assets/fancyzoom/images',
  //})
})
