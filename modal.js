(function() {
    "use strict";
    
    const modal = document.querySelector("#addBookModal");
    const body = document.querySelector("body");

    document.querySelector(".modalBtn").addEventListener("click", function() {

        modal.classList.add("show", "modal-zIndex");
        modal.style.display = "block";
        modal.style.paddingRight = "15px";

        const backdrop = document.createElement("div")
        backdrop.classList.add("modal-backdrop", "fade", "show")
        body.classList.add("modal-open");
        body.appendChild(backdrop)
    })

    document.querySelector(".close").addEventListener("click", function() {
        modal.classList.remove("show", "modal-zIndex")
        modal.style.display = "none";
        modal.style.paddingRight = "0px";
        document.querySelector(".modal-backdrop").classList.remove("show", "fade", "modal-backdrop");
    })
})()