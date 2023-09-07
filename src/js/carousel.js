const test = () => {
	$('.offers__cards').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: true,
		prevArrow: $('.prev'),
		nextArrow: $('.next'),

		responsive: [
			{
				breakpoint: 992,
				settings: 'unslick',
			},
		],
	})
}



document.addEventListener('DOMContentLoaded', test)
window.addEventListener('resize', test)
