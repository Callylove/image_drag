let files = [];
let moveFiles = [];
let button = document.querySelector(".top button");
let form = document.querySelector("form");
let container = document.querySelector(".container");

let text = document.querySelector(".inner");
let browse = document.querySelector("#select");
let input = document.querySelector("form input");


// input field
browse.addEventListener("click", () => input.click());
input.addEventListener("change", ()=> {
let file = input.files;
for (let a of file){
    if(files.every(e => e.name != a.name)) files.push(a); 
}
form.reset();
showImages();

})


const showImages = () => {
    let images = '';
    files.forEach((img, del) => {
        images += ` <div class="image">
        <img src="${URL.createObjectURL(img)}" alt="image">
        <span onclick="delImages(${del})">&times;</span>
    </div>`
    })
    container.innerHTML = images;
    
    
}
const delImages = index => {
    files.splice(index, 1);
    showImages();
}
// form field
form.addEventListener("dragover", e => {
    e.preventDefault();

    form.classList.add("dragover");
    text.innerHTML = "Drop images here";
});
form.addEventListener("dragleave", e => {
    e.preventDefault();

    form.classList.remove("dragover");
    text.innerHTML = `Drag & drop image here or <span id="select">Browse</span>`;
});

form.addEventListener("drop", (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files;
    for (let a of file){
        if(files.every(e => e.name != a.name)) files.push(a); 
    }
    showImages();
   
    
})





