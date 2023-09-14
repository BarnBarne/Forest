const username = document.querySelector('.name')
const mail = document.querySelector('.mail')
const message = document.querySelector('.message')
const submitBtn = document.querySelector('.contactForm-btn')
const popup = document.querySelector('.contactForm__popup')
const popupInput = popup.querySelector('p')
const closePopupBtn = document.querySelector('.close-popup-btn')
const shadow = document.querySelector('.popup-shadow')

const SERVICE_ID = 'service_l858f2f'
const TEMPLATE_ID = 'template_t90nc2j'

emailjs.init("_dqu9XrzksE67Bx0z");


//CHECK FORM
const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.errorMsg')
	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków`)
	}
}

const checkMail = mail => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (re.test(mail.value)) {
		clearError(mail)
	} else {
		showError(mail, 'E-mail jest niepoprawny')
	}
}

const checkInput = input => {
	const re = /^(?![_. '])(?!.*[_. ']{2})[a-zA-Z0-9/sąćężźłóń']+(?<![_. '])$/
	if (re.test(input.value)) {
		clearError(input)
	} else {
		showError(input, `Niepoprawna ${input.previousElementSibling.innerText.slice(0, -1)}`)
	}
}

const checkErrors = input => {
	let errorCount = 0
	input.forEach(el => {
		if (el.parentElement.classList.contains('error')) {
			errorCount++
		}
	})
	if (errorCount === 0) {
		popup.classList.add('show-popup')
		shadow.classList.add('show-shadow')
		popupMsg('Wysyłanie...')
		sendMail()
	}
}

const clearForm = input => {
	input.forEach(el => {
		el.value = ''
	})
}

const popupMsg = input => {
	popupInput.textContent = input
}

const closePopup = () => {
	popup.classList.remove('show-popup')
	shadow.classList.remove('show-shadow')
	if (popupInput.textContent === 'Poprawnie wysłano wiadomość!') {
		clearForm([username, mail, message])
	}
}

const sendMail = () => {
	let params = {
		name: username.value,
		email: mail.value,
		message: message.value,
	}

	emailjs
		.send(SERVICE_ID, TEMPLATE_ID, params)
		.then(() => {
			popupMsg('Poprawnie wysłano wiadomość!')
		})
		.catch(() => {
			popupMsg('Nie udało się wysłać wiadomości, spróbuj za chwilę.')
		})
}

submitBtn.addEventListener('click', e => {
	e.preventDefault()

	const formInputs = [username, mail, message]

	checkForm(formInputs)
	checkMail(mail)
	checkInput(username)
	checkInput(message)
	checkLength(username, 3)
	checkLength(message, 10)
	checkErrors(formInputs)
})

closePopupBtn.addEventListener('click', e => {
	e.preventDefault()

	closePopup()
})

window.addEventListener('click', e => (e.target === shadow ? closePopup() : false))
