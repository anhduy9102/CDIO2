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

const renderProduct = (data) => {
    if (!Array.isArray(data)) return 'data is not array'
    let result = ''
    data.forEach(product => {
        const { id, image__url, name,gender, price } = product

        result += `
        <div class="col-md-4">
            <div class="card mb-4 product-wap rounded-0">
            <div class="card rounded-0">
                <img class="card-img rounded-0 img-fluid" src=${image__url} alt=${name}>
                <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul class="list-unstyled product__cart--btn">
                        <li><a class="btn btn-success text-white" href="#"><i class="far fa-heart"></i></a></li>
                        <li><a class="btn btn-success text-white mt-2" href="shop-single.html" data-id=${id}><i class="far fa-eye"></i></a></li>
                        <li><a class="btn btn-success text-white mt-2" href="shop-single.html" data-id=${id}><i class="fas fa-cart-plus"></i></a></li>
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
    });
    productList.innerHTML = result
}

const singleProduct = () => {
    const listBtn = document.querySelectorAll('.product__cart--btn li a')

    listBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            localStorage.setItem('targetID', JSON.stringify(e.target.dataset.id))
        })
    })
}

const saveLocalStorage = (data) => {
    localStorage.setItem('data', JSON.stringify(data))
}

const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('data'))
}

document.addEventListener('DOMContentLoaded', () => {
    getProduct().then(data => {renderProduct(data); singleProduct()})
    
})


for (let i of products.data) {
    //Create Card
    let card = document.createElement("div");
    //Card should have category and should stay hidden initially
    card.classList.add("card", i.category, "hide");
    //image div
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    //img tag
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);
    //container
    let container = document.createElement("div");
    container.classList.add("container");
    //product name
    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);
    //price
    let price = document.createElement("h6");
    price.innerText = "$" + i.price;
    container.appendChild(price);
  
    card.appendChild(container);
    document.getElementById("products").appendChild(card);
  }
  
  //parameter passed from button (Parameter same as category)
  function filterProduct(value) {
    //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
      //check if value equals innerText
      if (value.toUpperCase() == button.innerText.toUpperCase()) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  
    //select all cards
    let elements = document.querySelectorAll(".card");
    //loop through all cards
    elements.forEach((element) => {
      //display all cards on 'all' button click
      if (value == "all") {
        element.classList.remove("hide");
      } else {
        //Check if element contains category class
        if (element.classList.contains(value)) {
          //display element based on category
          element.classList.remove("hide");
        } else {
          //hide other elements
          element.classList.add("hide");
        }
      }
    });
  }
  
  //Search button click
  document.getElementById("search").addEventListener("click", () => {
    //initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
  
    //loop through all elements
    elements.forEach((element, index) => {
      //check if text includes the search value
      if (element.innerText.includes(searchInput.toUpperCase())) {
        //display matching card
        cards[index].classList.remove("hide");
      } else {
        //hide others
        cards[index].classList.add("hide");
      }
    });
  });
  
  //Initially display all products
  window.onload = () => {
    filterProduct("all");
  };