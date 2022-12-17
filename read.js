const urlparam = window.location.search.split("=")[1];
console.log("urlparam", urlparam)

const article = JSON.parse(localStorage.getItem("articles"));
let obj = article.find(o => o.ID == urlparam);

console.log("obj", obj);

const title = document.getElementById("heading");
const i = document.getElementById("image");
const author = document.getElementById("author");
const summary = document.getElementById("summary");
const link = document.getElementById("link");
i.innerHTML = `<img src=${obj.Image} style="width:100%">`
title.innerHTML = `<h1>${obj.title}</h1>`
author.innerHTML = `<h6>${"by "+obj.authors}</h6>`
summary.innerHTML = `<p>${obj.summary}</p>`
link.innerHTML = `<a href=${obj.Link} target=_blank>Read full article here <i class="fa-solid fa-up-right-from-square"></i></a>`
