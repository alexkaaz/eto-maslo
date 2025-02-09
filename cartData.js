

const cartData = () => {
    const cart = document.querySelector('.js-cart');
    const productList = document.querySelector('.js-main-product-card');
    const cartList = document.querySelector('.js-cart-list');
    const cartEmpty = document.querySelector('.cart-empty-container');
    const cartOrder = document.querySelector('.cart-order-container');

    const productInfo = {};
    
    const updateCartItemsCount = () => {
        
        cart.addEventListener('click', (event) => {

            let currentItems, minusBtn;

            if (event.target.matches('.js-minus') || event.target.matches('.js-plus')) {
                
                const counter = event.target.closest('.js-counter');
                
                currentItems = counter.querySelector('.js-current-item');

                minusBtn = counter.querySelector('.js-minus');
            }

            if (event.target.matches('.js-plus')) {
                currentItems.textContent = ++currentItems.textContent;
                minusBtn.removeAttribute('disabled');
                calculateTotalCartValue();
            }
            if (event.target.matches('.js-minus')) {
                if  (parseInt(currentItems.textContent) > 2 ) {
                    currentItems.textContent = --currentItems.textContent;
                } else {
                    currentItems.textContent = --currentItems.textContent;
                    minusBtn.setAttribute('disabled', true);
                }
                calculateTotalCartValue();
                
            }
        });
    };
    updateCartItemsCount();

    const addProductToCart = () => {
        productList.addEventListener('click', (event) => {
            if (event.target.classList.contains('js-buy-button')) {
                const product = event.target.closest('.js-main-product-card');
                const cartList = document.querySelector('.js-cart-list')

                const imageCard = product.querySelector('.js-image-card');
                const oilNameCard = product.querySelector('.js-title-card');
                const priceCard = product.querySelector('.js-price-card');
                const oilSizeCard = product.querySelector('.js-size-card')
                const linkCard = product.querySelector('.js-link-card');


                productInfo.id = linkCard.getAttribute('id');
                productInfo.oilName = oilNameCard.textContent;
                productInfo.price = priceCard.textContent;
                productInfo.photo = imageCard.src;
                productInfo.size = oilSizeCard.textContent;

                const productInCart = cartList.querySelector(`.hemp`);

                if (productInCart) {
                    const minusBtn = productInCart.querySelector('.js-minus');
                    const currentitemsProduct = productInCart.querySelector('.js-current-item');

                    minusBtn.removeAttribute('disabled');
                    currentitemsProduct.textContent = parseInt(currentitemsProduct.textContent) + 1;
                } else {
                    renderProductInCart();
                    
                }
                toggleCartStatus();
                calculateTotalCartValue();
            }
        });
    };
    addProductToCart();

    const renderProductInCart = () => {
        const li = document.createElement('li');
        li.classList.add('cart-product-card', 'js-product-cart', 'hemp')

        li.innerHTML = `
            <div class="${productInfo.id}">
                <div class="cart-product-img">
                    <a href="#">
                        <img src="${productInfo.photo}">
                    </a>
                </div>
                <div class="cart-product-info">
                    <div class="cart-product-name">
                        <h1>${productInfo.oilName}</h1>
                        <span class="cart-product-size">${productInfo.size}</span>
                        <span class="js-cart-price" data-price="${productInfo.price}">${productInfo.price}</span>
                        <span class="currency">Р.</span>
                    </div>
                    <div class="cart-counter js-counter">
                        <button type="button" class="minus-btn js-minus" disabled>-</button>
                        <div class="counter js-current-item">1</div>
                        <button type="button" class="plus-btn js-plus">+</button>
                    </div>
                </div>
                <button type="button" class="item-delete">
                    <svg class="js-remove" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#000"></path>
                    </svg>
                </button>
            </div>
        `;
        cartList.append(li);
    };

    const removeProductFromCart = () => {
        cartList.addEventListener('click', (event) => {
            if (event.target.classList.contains('js-remove')) {
                const cartItem = event.target.closest('.js-product-cart');
                cartItem.remove();
            }
            toggleCartStatus();
            calculateTotalCartValue();
        });
    };
    removeProductFromCart();

    const toggleCartStatus = () => {
        if (cart.querySelector('.js-product-cart')) {
            cartOrder.classList.remove('hidden');
            cartEmpty.classList.add('hidden');
        } else {
            cartOrder.classList.add('hidden');
            cartEmpty.classList.remove('hidden');
        }
    };
    toggleCartStatus();

    const calculateTotalCartValue = () => {
        const cartItems = document.querySelectorAll('.hemp');
        const cartTotalPrice = document.querySelector('.js-cart-total-price');

        let TotalCartValue = 0;

        cartItems.forEach((item) => {
            const itemCount = item.querySelector('.js-current-item');
            console.log(itemCount);

            const itemPrice = item.querySelector('.js-cart-price');
            console.log(itemPrice);

            const itemTotalPrice = parseInt(itemCount.textContent) * parseInt(itemPrice.dataset.price)
            console.log(itemTotalPrice);
            
            itemPrice.textContent = itemTotalPrice;

            TotalCartValue += itemTotalPrice;
        });

        cartTotalPrice.textContent = TotalCartValue;
    };
    calculateTotalCartValue();
};

cartData();
