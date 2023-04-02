const img = document.getElementById('product-detail')
const cardBody = document.querySelector('.card__right')

const getProduct = async () => {
	try {
		let response = await fetch('http://localhost:3000/products')

		let data = response.json()

		return data
	} catch (err) {
		console.log(err)
	}
}

const renderProductSingle = data => {
	const productID = getProductID()

	if (!Array.isArray(data)) return 'data is not array'

	let result = data.find(product => {
		return product.id === productID
	})

	const { image__url, name, price, gender, description, amount } = result

	img.setAttribute('src', image__url)
	img.setAttribute('alt', name)

	let card = `
        <div class="card-body">
            <h1 class="h2">${name}</h1>
            <h1 class="h2">${gender}</h1>
            <p class="h3 py-2">$${price}</p>
    
            

            <h6>${description ? 'Description: ' : ''}</h6>
            <p>${description ? description : ''}</p>
            <h6>Ngày thêm vào shop : 10/2</h6>
    

            <form>
                <input type="hidden" name="product-title" value="Activewear">
                <div class="row">
                    <div class="col-auto">
                    <ul class="list-inline pb-3">
                        <li class="list-inline-item text-right">
                            Quantity
                            <input type="hidden" name="product-quanity" id="product-quanity" value="${amount}">
                        </li>
                        <li class="list-inline-item"><span class="btn btn-success" id="btn-minus">-</span></li>
                        <li class="list-inline-item"><span class="badge bg-secondary" id="var-value">${amount}</span></li>
                        <li class="list-inline-item"><span class="btn btn-success" id="btn-plus">+</span></li>
                    </ul>
                </div>
            </div>
            <div class="row pb-3">
                <div class="col d-grid">
                    <button class="btn btn-success btn-lg" name="submit" value="buy">Buy</button>
                </div>
                <div class="col d-grid">
                    <button class="btn btn-success btn-lg" name="submit" value="addtocard">Add To Cart</button>
                </div>
            </div>
        </form>

    </div>
    `

	cardBody.innerHTML = card
}

const getProductID = () => {
	return JSON.parse(localStorage.getItem('targetID'))
}

document.addEventListener('DOMContentLoaded', () => {
	getProduct().then(data => renderProductSingle(data))
})

for (let i of products.data) {
	//Create Card
	let card = document.createElement('div')
	//Card should have category and should stay hidden initially
	card.classList.add('card', i.category, 'hide')
	//image div
	let imgContainer = document.createElement('div')
	imgContainer.classList.add('image-container')
	//img tag
	let image = document.createElement('img')
	image.setAttribute('src', i.image)
	imgContainer.appendChild(image)
	card.appendChild(imgContainer)
	//container
	let container = document.createElement('div')
	container.classList.add('container')
	//product name
	let name = document.createElement('h5')
	name.classList.add('product-name')
	name.innerText = i.productName.toUpperCase()
	container.appendChild(name)
	//price
	let price = document.createElement('h6')
	price.innerText = '$' + i.price
	container.appendChild(price)

	card.appendChild(container)
	document.getElementById('products').appendChild(card)
}

//parameter passed from button (Parameter same as category)
function filterProduct(value) {
	//Button class code
	let buttons = document.querySelectorAll('.button-value')
	buttons.forEach(button => {
		//check if value equals innerText
		if (value.toUpperCase() == button.innerText.toUpperCase()) {
			button.classList.add('active')
		} else {
			button.classList.remove('active')
		}
	})

	//select all cards
	let elements = document.querySelectorAll('.card')
	//loop through all cards
	elements.forEach(element => {
		//display all cards on 'all' button click
		if (value == 'all') {
			element.classList.remove('hide')
		} else {
			//Check if element contains category class
			if (element.classList.contains(value)) {
				//display element based on category
				element.classList.remove('hide')
			} else {
				//hide other elements
				element.classList.add('hide')
			}
		}
	})
}

//Search button click
document.getElementById('search').addEventListener('click', () => {
	//initializations
	let searchInput = document.getElementById('search-input').value
	let elements = document.querySelectorAll('.product-name')
	let cards = document.querySelectorAll('.card')

	//loop through all elements
	elements.forEach((element, index) => {
		//check if text includes the search value
		if (element.innerText.includes(searchInput.toUpperCase())) {
			//display matching card
			cards[index].classList.remove('hide')
		} else {
			//hide others
			cards[index].classList.add('hide')
		}
	})
})

//Initially display all products
window.onload = () => {
	filterProduct('all')
}
