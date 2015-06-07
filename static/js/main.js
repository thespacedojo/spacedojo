$(document).ready(function() {
	console.log("Hello!");
      
	var scroll_start = 0;
	var startchange = $('#startchange');
	var offset = startchange.offset();

	if (startchange.length){
		$(document).scroll(function() { 
		  scroll_start = $(this).scrollTop();
		  if(scroll_start > offset.top) {
		      $(".navbar").removeClass('alt');
		      $(".logo-light").fadeOut('fast', function() {
		      	$(".logo-dark").fadeIn('fast');
		      });
		   } else {
		      $('.navbar').addClass('alt');
		      $(".logo-dark").fadeOut('100', function() {
		      	$(".logo-light").fadeIn('100');
		      });
		   }
		});
	}

	// inner-page smooth scrolling
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - 180
	        }, 1500);
	        return false;
	      }
	    }
	  });
	});
});