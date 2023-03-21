const img = document.getElementById('product-detail')
const cardBody = document.querySelector('.card__right')

const renderProductSingle = () => {
    const data = getLocalStorage()
    const productID = getProduct()

    if (!Array.isArray(data)) return 'data is not array'

    let result = data.find((product) => {
        return product.id === productID
    })

    const { image__url, name, price, description, amount } = result

    img.setAttribute('src', image__url)
    img.setAttribute('alt', name)

    let card = `
        <div class="card-body">
            <h1 class="h2">${name}</h1>
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

const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('data'))
}

const getProduct = () => {
    return JSON.parse(localStorage.getItem('targetID'))
}

document.addEventListener('DOMContentLoaded', () => {
    renderProductSingle()
})