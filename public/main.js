import {fbapp, functions, auth} from "./data/fbase.js";
import {BDSSignon} from "./components/signon.js";
import {BDSManageUsers} from "./components/manageusers.js";

document.addEventListener("DOMContentLoaded", (e) => {
    emailjs.init("8OLiCZvohFJPEq_TW");
});

document.querySelector("#signon").addEventListener("click", (e) => {
    console.log("signon clicked!");
    const signon = document.querySelectorAll(".signon");
    signon[0].classList.add("active");
    signon[1].classList.remove("active");
});

document.body.addEventListener("click", (e) => {

});