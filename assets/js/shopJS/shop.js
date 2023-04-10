const productList = document.querySelector('.container__products')

const getProduct = async () => {
	try {
		let response = await fetch('http://localhost:3000/products')

		let data = response.json()

		return data
	} catch (err) {
		console.log(err)
	}
}

const getProduct1 = async gender => {
	try {
		let response = await fetch(
			`http://localhost:3000/products?gender=${gender}`,
		)

		let data = response.json()

		return data
	} catch (err) {
		console.log(err)
	}
}

const getCart = async () => {
	try {
		let response = await fetch('http://localhost:3000/cart')

		let data = response.json()

		return data
	} catch (err) {
		console.log(err)
	}
}

const updateProduct = async (body, id) => {
	try {
		let response = await fetch(`http://localhost:3000/cart/${id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		let data = response.json()

		return data
	} catch (err) {
		console.log(err)
	}
}

const postAddToCart = async body => {
	try {
		let response = await fetch('http://localhost:3000/cart', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		let data = response.json()

		return data
	} catch (err) {
		console.log(err)
	}
}

var cart = []

const addCart = data => {
	const btns = document.querySelectorAll('.addCart')

	btns.forEach(btn => {
		btn.addEventListener('click', e => {
			const value = data.find(value => {
				return value.id === e.target.dataset.id
			})
			if (value) {
				getCart().then(data => {
					const check = data.find(product => {
						return product.id === value.id
					})

					if (!check) {
						postAddToCart(value)
					} else {
						if (typeof check.amount === 'string') {
							check.amount = parseInt(check.amount)
						}
						check.amount += 1
						updateProduct(check, check.id)
					}
				})
			}
		})
	})
}

const renderProduct = data => {
	if (!Array.isArray(data)) return 'data is not array'
	let result = ''
	data.forEach(product => {
		const { id, image__url, name, gender, price } = product

		result += `
        <div class="col-md-4">
            <div class="card mb-4 product-wap rounded-0">
            <div class="card rounded-0">
                <img class="card-img rounded-0 img-fluid" src=${image__url} alt=${name}>
                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul class="list-unstyled product__cart--btn">
                        <li><a class="btn btn-success text-white" href="#"><i class="far fa-heart"></i></a></li>
                        <li><a class="btn btn-success text-white mt-2" href="shop-single.html" data-id=${id}><i class="far fa-eye"></i></a></li>
                        <li><a class="btn btn-success text-white mt-2 addCart" data-id=${id}><i class="fas fa-cart-plus"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="card-body">
                <a href="shop-single.html" class="h3 text-decoration-none">${name}</a>
                <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                    <li>M/L/X/XL</li>
                    <li class="pt-2">
                        <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                        <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                        <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                        <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                        <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                    </li>
                </ul>
                <ul class="list-unstyled d-flex justify-content-center mb-1">
                    <li>
                        <i class="text-warning fa fa-star"></i>
                        <i class="text-warning fa fa-star"></i>
                        <i class="text-warning fa fa-star"></i>
                        <i class="text-muted fa fa-star"></i>
                        <i class="text-muted fa fa-star"></i>
                    </li>
                </ul>
                <p class="text-center mb-0">$${price}</p>
                <p class="text-center mb-0">${gender}</p>
            </div>
        </div>
    </div>
        `
	})
	productList.innerHTML = result

	addCart(data)
}

const singleProduct = () => {
	const listBtn = document.querySelectorAll('.product__cart--btn li a')

	listBtn.forEach(btn => {
		btn.addEventListener('click', e => {
			localStorage.setItem('targetID', JSON.stringify(e.target.dataset.id))
		})
	})
}

const filter = () => {
	const genderBtn = document.querySelectorAll('.gender__btn')

	genderBtn.forEach(btn => {
		btn.addEventListener('click', e => {
			let gender = e.target.dataset.value

			if (gender === 'all') {
				getProduct().then(data => {
					renderProduct(data)
					singleProduct()
					filter()
				})
			} else {
				getProduct1(gender).then(data => {
					renderProduct(data)
					singleProduct()
					filter()
				})
			}
		})
	})
}

const saveLocalStorage = data => {
	localStorage.setItem('data', JSON.stringify(data))
}

const getLocalStorage = () => {
	return JSON.parse(localStorage.getItem('data'))
}

document.addEventListener('DOMContentLoaded', () => {
	getProduct().then(data => {
		renderProduct(data)
		singleProduct()
		filter()
	})

	// getProduct1('Nam').then(data => renderProduct(data))
})
