import "./index.css";


const navEl = document.querySelector('.nav');
const hamburgerEl = document.querySelector('.hamburger');
const navItemEls = document.querySelectorAll('.nav__item');

hamburgerEl.addEventListener('click', () => {
  navEl.classList.toggle('nav--open');
  hamburgerEl.classList.toggle('hamburger--open');
});

navItemEls.forEach(navItemEl => {
  navItemEl.addEventListener('click', () => {
    navEl.classList.remove('nav--open');
    hamburgerEl.classList.remove('hamburger--open');
  });
});

window.addEventListener('scroll', function() {
    var bottomBar = document.getElementById('bottomBar');
    if (window.scrollY > 0) {
      bottomBar.style.backgroundColor = 'white'; // Change background color
      bottomBar.style.color = 'black'; // Change text color
    } else {
      bottomBar.style.backgroundColor = 'black'; // Change background color back
      bottomBar.style.color = 'white'; // Change text color back
    }
  });


  
  	
// Tab-Pane change function
function tabChange() {
  var tabs = $('.nav-tabs > li');
  var active = tabs.filter('.active');
  var next = active.next('li').length? active.next('li').find('a') : tabs.filter(':first-child').find('a');
  next.tab('show');
}

$('.tab-pane').hover(function() {
  clearInterval(tabCycle);
}, function() {
  tabCycle = setInterval(tabChange, 5000);
});

// Tab Cycle function
var tabCycle = setInterval(tabChange, 5000)
  
// Tab click event handler
$(function(){
  $('.nav-tabs a').click(function(e) {
      e.preventDefault();
      clearInterval(tabCycle);
      $(this).tab('show')
      tabCycle = setInterval(tabChange, 5000);
  });
});

var next = 0;
var timeout = 1000;

var scrollBlock = () => {
	$(window).bind("mousewheel DOMMouseScroll MozMousePixelScroll", (event) => {
		$(window).unbind("mousewheel DOMMouseScroll MozMousePixelScroll");
		$(window).bind("mousewheel DOMMouseScroll MozMousePixelScroll",freeze);
		setTimeout(scrollBlock,timeout);
		
		var st = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
		console.log(st);
		if (st <= 0 ) {
			// downscroll code
			next = next == $(".slide-content").length-1 ? next : (next += 1);
			animateWall();
			animateWallInner();
			$("html, body").animate(
				{
					scrollTop: $(".slide-content")
						.eq(next)
						.offset().top
				},
				{ duration: timeout}
			);
			
			
		} else {
			// upscroll code
			next = next == 0 ? next : next -= 1;
			animateWall();
			animateWallInner();
			$("html, body").animate(
				{
					scrollTop: $(".slide-content")
						.eq(next)
						.offset().top
				},
				{ duration: timeout}
			);
			
		}
		
	});
};

var freeze = () => {
	$("html, body").
					scrollTop = $(".slide-content")
						.eq(next)
						.offset().top;
};

var animateWall = () => {
	$(".slide-wall").eq(next-1).animate(
				{
					top: '0vh',
					height: '100vh'
				},
				{ duration: timeout}
			);
			$(".slide-wall").eq(next-1).animate(
				{
					top: '100vh',
					height: '0vh'
				},
				{ duration: timeout}
			);
};
var animateWallInner = () => {
	$(".slide-wall__inner").eq(next-1).animate(
				{
					
					height: '100vh'
				},
				{ duration: timeout/5 }
			);
			$(".slide-wall__inner").eq(next-1).animate(
				{
					
					height: '0vh'
				},
				{ duration: timeout}
			);
};

scrollBlock();

let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}



$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});


