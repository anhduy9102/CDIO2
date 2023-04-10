const Cart = document.getElementById('datarow')

const getCart = async () => {
	try {
		let response = await fetch('http://localhost:3000/cart')

		let data = response.json()

		return data
	} catch (err) {
		console.log(err)
	}
}

const deleteProduct = async id => {
	try {
		let response = await fetch(`http://localhost:3000/cart/${id}`, {
			method: 'DELETE',
		})

		let data = response.json()

		return data
	} catch (err) {
		console.log(err)
	}
}

const renderCart = data => {
	if (!Array.isArray(data)) return 'data is not array'
	let result = ''
	data.forEach(product => {
		const { id, image__url, name, price, amount } = product

		result += `
            <tr>
                <td>${id}</td>
                <td>
                    <img src=${image__url} class="hinhdaidien">
                </td>
                <td>${name}</td>
                <td class="text-right">${amount}</td>
                <td class="text-right">${price}</td>
                <td class="text-right">${
									parseInt(price) * parseInt(amount)
								}</td>
                <td>
                    <a id="delete_1" data-product=${id} class="btn btn-danger btn-delete-sanpham">
                        <i class="fa fa-trash" aria-hidden="true"></i> Xóa
                    </a>
                </td>
            </tr>
        `
	})
	Cart.innerHTML = result

	removeProduct()
}

const removeProduct = () => {
	const btns = document.querySelectorAll('.btn-delete-sanpham')

	btns.forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			let productId = e.target.dataset.product

			deleteProduct(productId)
		})
	})
}

document.addEventListener('DOMContentLoaded', () => {
	getCart().then(data => {
		renderCart(data)
	})
})
