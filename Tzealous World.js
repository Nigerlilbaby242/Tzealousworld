document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Display cart when the icon is clicked
    cartIcon.addEventListener('click', function () {
        console.log('Cart icon clicked'); // Debugging log
        cartModal.style.display = 'block';
        updateCartDisplay(); // Ensure this is called to refresh cart data
    });

    // Close the cart modal
    closeModal.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });

    // Add items to the cart
    const addToBagButtons = document.querySelectorAll('.add-to-bag-btn');
    addToBagButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log('Add to Bag button clicked'); // Debugging log

            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price').replace(/,/g, ''));
            const productImage = this.getAttribute('data-image');
            const sizeSelect = this.parentElement.querySelector('.size-select'); // Assuming size selection

            if (!sizeSelect || !sizeSelect.value) {
                alert('Please select a size.');
                return;
            }

            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
                size: sizeSelect.value
            };

            // Debugging log
            console.log('Adding product to cart:', product);

            // Add product to cart array
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert('Product added to cart!');
        });
    });

    // Update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Update cart display in modal
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let total = 0;

        console.log('Cart:', cart); // Debugging log

        // Loop through the cart items and display them
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            const productImage = document.createElement('img');
            const productDetails = document.createElement('span');
            const deleteButton = document.createElement('button');

            productImage.src = item.image;
            productDetails.textContent = `${item.name} - ₦${item.price.toLocaleString()} - Size: ${item.size}`;
            deleteButton.textContent = 'Remove';
            deleteButton.addEventListener('click', function () {
                removeItemFromCart(index);
            });

            listItem.appendChild(productImage);
            listItem.appendChild(productDetails);
            listItem.appendChild(deleteButton);
            cartItemsList.appendChild(listItem);

            total += item.price;
        });

        totalPriceElement.textContent = `Total: ₦${total.toLocaleString()}`;
    }

    // Remove item from cart
    function removeItemFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }

    // Initialize cart count on page load
    updateCartCount();
});

const productCards = document.querySelectorAll('.image-container');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.image1').style.animationPlayState = 'paused';
        card.querySelector('.image2').style.animationPlayState = 'paused';
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('.image1').style.animationPlayState = 'running';
        card.querySelector('.image2').style.animationPlayState = 'running';
    });
});


const navbar = document.querySelector(".header")
window.addEventListener("scroll", () => {
  this.scrollY > 100 ? navbar.classList.add("blue") : navbar.classList.remove("blue")
})