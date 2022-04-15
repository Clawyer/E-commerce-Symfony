import "./styles/account.sass";

let title = $('.profil h3');
let active = JSON.parse(localStorage.getItem("active"));
title.html("Welcome back "+ active.firstname +" "+ active.lastname +" !")