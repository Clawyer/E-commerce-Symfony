import "./styles/products.sass";


const products = document.getElementsByClassName("articles");
for (let i = 0; i < 8; i++) {
  products[i].children[0].classList[1] == "0"
    ? products[i].setAttribute("data-filter", "female")
    : products[i].setAttribute("data-filter", "male");
}
const filters = document.querySelectorAll(".filter");
const male = document.querySelectorAll(
  `.section--articles-container [data-filter='male']`
);
const female = document.querySelectorAll(
  `.section--articles-container [data-filter='female']`
);

function sort_male(gender){

    let selectedFilter = filter.getAttribute("data-filter");
    let itemsToHide = document.querySelectorAll(
      `.section--articles-container .articles:not([data-filter=`+gender+`])`
    );
    let itemsToShow = document.querySelectorAll(
      `.section--articles-container [data-filter=` + gender + `]`
    );

    console.log(itemsToShow);
    if (selectedFilter == "all") {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll(
        ".section--articles-container [data-filter]"
      );
    }

    itemsToHide.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("show");
    });

    itemsToShow.forEach((el) => {
      el.classList.remove("hide");
      el.classList.add("show");
    });
}


filters.forEach((filter) => {
  filter.addEventListener("click", function () {
    let selectedFilter = filter.getAttribute("data-filter");
    let itemsToHide = document.querySelectorAll(
      `.section--articles-container .articles:not([data-filter='${selectedFilter}'])`
    );
    let itemsToShow = document.querySelectorAll(
      `.section--articles-container [data-filter='${selectedFilter}']`
    );

    console.log(itemsToShow);
    if (selectedFilter == "all") {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll(
        ".section--articles-container [data-filter]"
      );
    }

    itemsToHide.forEach((el) => {
      el.classList.add("hide");
      el.classList.remove("show");
    });

    itemsToShow.forEach((el) => {
      el.classList.remove("hide");
      el.classList.add("show");
    });
  });
});
