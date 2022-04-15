import "./styles/cart.sass";

import { findItem, getUniqueListBy } from "../app";

let promoCode;
let promoPrice;
let fadeTime = 150;

const product_html = (
  qt,
  brand,
  label,
  code,
  price,
  total
) => `<div class="basket-product">
			<div class="item">
				<div class="product-details">
					<h2>
						<strong>
							<span class="item-quantity">${qt}</span>
							<span class="item-brand">	${brand}</strong>
							<span class="item-label">${label}</h2>
					<p class="item-code">	${code}</p>
				</div>
			</div>
			<div class="price">${price}</div>
			<div class="quantity">
				<input type="number" value="${qt}" min="1" class="quantity-field">
			</div>
			<div class="subtotal">${total}</div>
			<div class="remove">
				<button>Remove</button>
			</div>
		</div>`;

const getItem_ = (dom_el) => {
  var productRow = $(dom_el).parent().parent();
  let brand = productRow.find(".item-brand").text().trim();
  let label = productRow.find(".item-label").text().trim();
  let code = productRow.find(".item-code").text().trim();
  let price = parseFloat(productRow.children(".price").text());
  let quantity = parseInt(productRow.find(".item-quantity").text().trim());
  let linePrice = price * quantity;

  let item = {
    label: label,
    brand: brand,
    price: price,
    quantity: quantity,
  };
  return item;
};
function render_product() {
  let qt;
  let brand;
  let label;
  let product_code;
  let price;
  let total;

  const cart_item = JSON.parse(localStorage.getItem("cart")) || [];
  cart_item.forEach((i) => {
    qt = i.quantity;
    brand = i.brand;
    label = i.label;
    product_code = Math.floor(Math.random() * 1000000);
    price = i.price;
    total = parseInt(price) * parseInt(qt);

    $(".basket-labels").after(
      product_html(qt, brand, label, product_code, price, total)
    );
  });
  recalculateCart();
}
render_product();

$(".quantity input").change(function () {
  updateQuantity(this);
});

$(".remove button").click(function () {
  // console.log(getItem_(this))
  removeItem(this);
});

$(document).ready(function () {
  updateSumItems();
});

$(".promo-code-cta").click(function () {
  promoCode = $("#promo-code").val();

  if (promoCode == "10off" || promoCode == "10OFF") {
    if (!promoPrice) {
      promoPrice = 10;
    } else if (promoCode) {
      promoPrice = promoPrice * 1;
    }
  } else if (promoCode != "") {
    alert("Invalid Promo Code");
    promoPrice = 0;
  }
  if (promoPrice) {
    $(".summary-promo").removeClass("hide");
    $(".promo-value").text(promoPrice.toFixed(2));
    recalculateCart(true);
  }
});

/* Recalculate cart */
function recalculateCart(onlyTotal) {
  var subtotal = 0;

  /* Sum up row totals */
  $(".basket-product").each(function () {
    subtotal += parseFloat($(this).children(".subtotal").text());
  });

  /* Calculate totals */
  var total = subtotal;

  //If there is a valid promoCode, and subtotal < 10 subtract from total
  var promoPrice = parseFloat($(".promo-value").text());
  if (promoPrice) {
    if (subtotal >= 10) {
      total -= promoPrice;
    } else {
      alert("Order must be more than £10 for Promo code to apply.");
      $(".summary-promo").addClass("hide");
    }
  }

  /*If switch for update only total, update only total display*/
  if (onlyTotal) {
    /* Update total display */
    $(".total-value").fadeOut(fadeTime, function () {
      $("#basket-total").html(total.toFixed(2));
      $(".total-value").fadeIn(fadeTime);
    });
  } else {
    /* Update summary display. */
    $(".final-value").fadeOut(fadeTime, function () {
      $("#basket-subtotal").html(subtotal.toFixed(2));
      $("#basket-total").html(total.toFixed(2));
      if (total == 0) {
        $(".checkout-cta").fadeOut(fadeTime);
      } else {
        $(".checkout-cta").fadeIn(fadeTime);
      }
      $(".final-value").fadeIn(fadeTime);
    });
  }
}

const updateQt = (item, qty) => {
  let old = findItem(item);
  old.quantity = qty;
  return old;
};

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  let productRow = $(quantityInput).parent().parent();
  let price = parseFloat(productRow.children(".price").text());
  let quantity = $(quantityInput).val();
  let linePrice = price * quantity;
  const item = getItem_(quantityInput);

  /* Update line price display and recalc cart totals */
  productRow.children(".subtotal").each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
  let old = JSON.parse(localStorage.getItem("cart")) || [];
  let cart_item = old.concat(updateQt(item, parseInt(quantity)));
  let cart = getUniqueListBy(cart_item, "label");
  localStorage.setItem("cart", JSON.stringify(cart));

  productRow.find(".item-quantity").text(quantity);
  updateSumItems();
}

function updateSumItems() {
  var sumItems = 0;
  $(".quantity input").each(function () {
    sumItems += parseInt($(this).val());
  });
  $(".total-items").text(sumItems);
}

/* Remove item from cart */
function removeItem(removeButton) {
  $(".badge").text(parseInt($(".badge").text()) - 1);
  const item = getItem_(removeButton);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((i) => i.label !== item.label);

  localStorage.setItem("cart", JSON.stringify(cart));

  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
    updateSumItems();
  });
}
