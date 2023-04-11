const productTotal = document.querySelector('.product__total')
const sumTotal = document.querySelector('.sum__total')
const provisional = document.querySelector('.provisional')
const transportFee = document.querySelector('.transportFee')

const getCart = async () => {
	try {
		let response = await fetch('http://localhost:3000/cart')

		let data = response.json()

		return data
	} catch (err) {
		console.log(err)
	}
}

const totalProduct = data => {
	if (!Array.isArray(data)) return console.log('data phải là một mảng')

	let totalSum = data.reduce((accumulator, currentValue) => {
		let sumAProduct = currentValue.price * currentValue.amount
		return accumulator + sumAProduct
	}, 0)

	productTotal.innerHTML = totalSum + '.000đ'
}

const total = () => {
	let productValue = productTotal.textContent.slice(0, -1)
	let provisionalValue = provisional.textContent.slice(0, -1)
	let transportFeeValue = transportFee.textContent.slice(0, -1)

	sumTotal.innerHTML =
		parseInt(productValue) +
		parseInt(provisionalValue) +
		parseInt(transportFeeValue) +
		'.000đ'
}

document.addEventListener('DOMContentLoaded', () => {
	getCart()
		.then(data => {
			totalProduct(data)
		})
		.then(() => {
			total()
		})
})
