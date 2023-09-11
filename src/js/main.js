const burgerButton = document.querySelector('.mobileNav__button')
const barsIcon = document.querySelector('.ti-menu-2')
const xIcon = document.querySelector('.ti-x')
const mobileNav = document.querySelector('.mobileNav__items')
const burgerItem = document.querySelectorAll('.mobileNav__item')
const body = document.querySelector('body')

const sections = document.querySelectorAll('.sectionNav')
const url = window.location.pathname

//mobileNav
const handleNav = () => {
	mobileNav.classList.toggle('active')
	barsIcon.classList.toggle('hide')
	xIcon.classList.toggle('hide')

	body.classList.toggle('scrollLock')
}

burgerButton.addEventListener('click', handleNav)
burgerItem.forEach(item => {
	item.addEventListener('click', handleNav)
})

//NAV
if (url.includes('/contact.html')) {
	document.querySelector(`.nav__item[href="contact.html"]`).classList.add('active')
} else if (url.includes('/offers.html')) {
	document.querySelector('.nav__item[href="index.html#offers"]').classList.add('active')
}

const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			const id = entry.target.id
			const navItem = document.body.querySelector(`.nav__item[href='index.html#${id}']`)
			navItem.classList.toggle('active', entry.isIntersecting)
		})
	},
	{
		rootMargin: '-5% 0% -95% 0%',
	}
)

sections.forEach(section => {
	observer.observe(section)
})
