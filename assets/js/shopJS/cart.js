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
                    <a id="delete_1" data-sp-ma=${id} class="btn btn-danger btn-delete-sanpham">
                        <i class="fa fa-trash" aria-hidden="true"></i> Xóa
                    </a>
                </td>
            </tr>
        `
	})
	Cart.innerHTML = result
}

document.addEventListener('DOMContentLoaded', () => {
	getCart().then(data => {
		renderCart(data)
	})
})
