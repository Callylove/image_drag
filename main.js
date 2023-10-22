const files = [];
const button = document.querySelector(".top button");
const form = document.querySelector("form");
const container = document.querySelector(".container");
const text = document.querySelector(".inner");
const browse = document.querySelector("#select");
const input = document.querySelector("form input");

// input field
browse.addEventListener("click", () => input.click());
input.addEventListener("change", () => {
  const newFiles = Array.from(input.files);
  for (const file of newFiles) {
    if (!files.some((existingFile) => existingFile.name === file.name)) {
      files.push(file);
    }
  }
  form.reset();
  showImages();
});

const showImages = () => {
  const images = files.map((img, del) => `
    <div class="image">
      <img src="${URL.createObjectURL(img)}" alt="image">
      <span onclick="delImages(${del})">&times;</span>
    </div>
  `).join('');
  container.innerHTML = images;
};

const delImages = (index) => {
  files.splice(index, 1);
  showImages();
};

// form field
form.addEventListener("dragover", (e) => {
  e.preventDefault();
  form.classList.add("dragover");
  text.innerHTML = "Drop images here";
});

form.addEventListener("dragleave", (e) => {
  e.preventDefault();
  form.classList.remove("dragover");
  text.innerHTML = `Drag & drop image here or <span id="select">Browse</span>`;
});

form.addEventListener("drop", (e) => {
  e.preventDefault();
  const newFiles = Array.from(e.dataTransfer.files);
  for (const file of newFiles) {
    if (!files.some((existingFile) => existingFile.name === file.name)) {
      files.push(file);
    }
  }
  showImages();
});
