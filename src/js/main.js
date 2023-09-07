const burgerButton = document.querySelector('.mobileNav__button')
const barsIcon = document.querySelector('.fa-bars')
const xIcon = document.querySelector('.fa-times')
const mobileNav = document.querySelector('.mobileNav__items')
const burgerItem = document.querySelectorAll('.mobileNav__item')
const body = document.querySelector('body')

const sections = document.querySelectorAll('.sectionNav')
const url = window.location.pathname

//mobileNav
const handleNav = () => {
	mobileNav.classList.toggle('active')
	//burgerButton.classList.toggle('active')
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
	console.log(section)
})

// const sections = document.querySelectorAll('.section') //pobranie wszystkich sekcji

// // intersection observer api  ASYNCHRONICZNIE OBSERWUJE ZMIANY
// const observer = new IntersectionObserver(
// 	entries => {								// pobiera array jako entries
// 		entries.forEach(entry => {
// 			const id = entry.target.id
// 			const navItem = document.querySelector(`.nav__item[href='#${id}']`)		//wyszukanie elementu nawigacji po id
// 			 //(entry.isIntersecting) ? navItem.classList.add('active') : navItem.classList.remove('active');
// 			 navItem.classList.toggle("active", entry.isIntersecting)			//krótszy zapis, toggle jako boolean
// 		})
// 	},
// 	{			//opcje
// 		//root 		domyślnie przeglądarka, musi być rodzic obserwowanego elementu
// 		rootMargin: "-5% 0% -95% 0%"	//margines jak w css zwiększa lub zmniejsza strony elementu przed spr intersekcji
// 		//threshold		od 0 do 1, w % ile elementu musi być widoczne żeby zaliczać do isIntersecting
// 	}
// )

// sections.forEach(section => {
// 	observer.observe(section)
// })
