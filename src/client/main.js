import $ from 'jquery'

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


  $('a[rel^="prettyPhoto"]').prettyPhoto({ animationSpeed: 'normal', social_tools: false })

  $('a.fancyzoom').fancyZoom({})
})
