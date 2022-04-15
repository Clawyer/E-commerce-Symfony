/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "./website/styles/reset.css";
import "./styles/app.scss";
import "./website/styles/footer.sass";
require("./website/styles/header.sass");
import "./bootstrap";

// MODAL LOGIN

$(".articles--text h2 + span ").after(
  `<button class="addtocart">
					<div class="pretext">
          ADD TO CART
          <i class="fas fa-cart-plus"></i>
					</div>
				</button>`
);

$(".sign-in-modal").on("click", function () {
  $(".sign-in-modal").removeClass("active");
  $(".inner--sign-in-modal").removeClass("active");
});

$(".inner--sign-in-modal").on("click", function (e) {
  e.stopPropagation();
});

$(".close-login").on("click", function () {
  $(".sign-in-modal").removeClass("active");
  $(".inner--sign-in-modal").removeClass("active");
});

/* MODAL */
$(".modal-sign").on("click", function () {
  const loc = location.pathname;
  let active = JSON.parse(localStorage.getItem("active")) ? true : false;
  if (active) return (location.href = "/account");
  if (loc == "/account" && active) return (location.href = "/account");
  $(".sign-in-modal").addClass("active");
  $(".inner--sign-in-modal").addClass("active");
  setTimeout(function () {
    $(".overlay").removeClass("sign-up-side");
    $(".overlay").addClass("sign-in-side");
    $(".tab-sign-up").removeClass("active");
    $(".tab-sign-in").addClass("active");
    $(".content-sign-up").removeClass("active");
    $(".content-sign-in").addClass("active");
  }, 400);
});

$(".inner--sign-in-modal .close-modal").on("click", function () {
  $(".sign-in-modal").removeClass("active");
  $(".inner--sign-in-modal").removeClass("active");
});

$(".val-info .tab").on("click", function () {
  if ($(this).hasClass("tab-sign-in") == true) {
    $(".overlay").removeClass("sign-up-side");
    $(".overlay").addClass("sign-in-side");
    $(".tab-sign-up").removeClass("active");
    $(".tab-sign-in").addClass("active");
    $(".content-sign-up").removeClass("active");
    $(".content-sign-in").addClass("active");
  } else {
    $(".overlay").removeClass("sign-in-side");
    $(".overlay").addClass("sign-up-side");
    $(".tab-sign-in").removeClass("active");
    $(".tab-sign-up").addClass("active");
    $(".content-sign-in").removeClass("active");
    $(".content-sign-up").addClass("active");
  }
});

//Greetings
$(".input-firstname").keyup(function () {
  var getText = $(this).val();
  $(".greetings-name").html(getText);
});

$(".input-lastname").keyup(function () {
  var getText = $(this).val();
  $(".greetings-surname").html(getText);
});
const register = (e) => {
  e.preventDefault();
  const register_i = $(".content-sign-up .input-control input");
  let infos_arr = {};
  let infos = register_i.map(
    (i) => (infos_arr[register_i[i].name] = register_i[i].value)
  );

  let old = JSON.parse(localStorage.getItem("login")) || [];
  let new_data = old.concat([infos_arr]);
  localStorage.setItem("login", JSON.stringify(new_data));
  localStorage.setItem("active", JSON.stringify(infos_arr));
  location.href = "/account"
};

const login = (e) => {
  e.preventDefault();

  const logs = $(".content-sign-in .input-control input");
  const email = logs[0].value;
  const pwd = logs[1].value;
  let data = JSON.parse(localStorage.getItem("login")) || [];
  const resp = data.map((e) =>
    e.email == email && e.password == pwd ? true : false
  );
  const bool = resp.includes(true);
  if (bool) {
    const id = resp.indexOf(true);
    localStorage.setItem("active", JSON.stringify(data[id]));
    location.href = "/account";
  }
  $(".wrong").show();
};
$(".register--btn").click(register);
$(".login--btn").click(login);
const signOut = (e) => {
  localStorage.removeItem("active");
  location.href = "/";
};
$(".sign-out").click(signOut);

// CART
$(".badge").text(
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")).length
    : 0
);

const button = $(".addtocart");
const done = $(".done");

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

const updateQty = (item, qty) => {
  let old = findItem(item);
  old.quantity += qty;
  return old;
};

const findItem = (item) => {
  let arr = JSON.parse(localStorage.getItem("cart")) || [];
  return arr.find((i) => i.label === item.label);
  // return typeof k !== "undefined" ? true : false
};
// console.log(JSON.parse(localStorage.getItem("cart")).concat(updateQty(item,5)));

const empty = (array) => typeof array === "undefined" || array.length == 0;

const handleCart = (e) => {
  let item = e.target.closest(".articles--text");
  let brand = $(item).find(".brand")[0].outerText;
  let name = item.children[0].outerText.split(brand)[1].trim();
  let price = item.children[1].outerText.split(" ")[0];
  let cart = [];
  let old = JSON.parse(localStorage.getItem("cart")) || [];
  let new_item = false;

  let infos_arr = {
    label: name,
    brand: brand,
    price: price,
    quantity: 1,
  };

  new_item = typeof findItem(infos_arr) !== "undefined" ? false : true;

  // IF TRUE ? old + new quantity item ELSE OLD
  new_item == true
    ? (old = old.concat(infos_arr))
    : (old = old.concat([updateQty(infos_arr, 1)]));

  cart = getUniqueListBy(old.sort(), "label");

  // OLD VERSION
  // !new_item
  //   ? (cart = getUniqueListBy(old.reverse(), "label"))
  //   : typeof old !== "undefined" && old.length > 0
  //   ? (cart = getUniqueListBy(old.concat([infos_arr]).reverse(), "label"))
  //   : (cart = [infos_arr]);

  localStorage.setItem("cart", JSON.stringify(cart));

  $(".badge").text(cart.length);
};

button.click(handleCart);

export { updateQty, findItem, getUniqueListBy };
