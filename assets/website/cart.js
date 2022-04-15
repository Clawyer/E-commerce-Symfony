import "./styles/cart.sass";

const cart_item = JSON.parse(localStorage.getItem("cart")) || [];
cart_item.map((item) => {
  let item_html =
    `<div class="product">
			<div class="product-details">
				<div class="product-title"></div>` +
    item.label +
    `</div>
			</div>
			<div class="product-price">` +
    item.price +
    `</div>
			<div class="product-quantity">
				<input type="number" value="2" min="0">
			</div>
			<div class="product-removal">
				<button class="remove-product">
					Remove
				</button>
			</div>
			<div class="product-line-price">25.98</div>
		</div>`;

// $(".column-labels").after(item_html);
});

// const items = cart_item.map(item =>  )
console.log(cart_item);

/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.0;
var fadeTime = 300;

/* Assign actions */
$(".product-quantity input").change(function () {
  updateQuantity(this);
});

$(".product-removal button").click(function () {
  removeItem(this);
});

/* Recalculate cart */
function recalculateCart() {
  var subtotal = 0;

  /* Sum up row totals */
  $(".product").each(function () {
    subtotal += parseFloat($(this).children(".product-line-price").text());
  });

  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = subtotal > 0 ? shippingRate : 0;
  var total = subtotal + tax + shipping;

  /* Update totals display */
  $(".totals-value").fadeOut(fadeTime, function () {
    $("#cart-subtotal").html(subtotal.toFixed(2));
    $("#cart-tax").html(tax.toFixed(2));
    $("#cart-shipping").html(shipping.toFixed(2));
    $("#cart-total").html(total.toFixed(2));
    if (total == 0) {
      $(".checkout").fadeOut(fadeTime);
    } else {
      $(".checkout").fadeIn(fadeTime);
    }
    $(".totals-value").fadeIn(fadeTime);
  });
}

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children(".product-price").text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children(".product-line-price").each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}

/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
  });
}

/*
function play() {
  var audio = new Audio("./sound/train_sound.mp3");
  audio.play();

}


document.addEventListener("keydown", logKey);

function logKey(e) {
    play()
} */
