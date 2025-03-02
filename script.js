//your code here
const imageUrls = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg"
];

let images = [...imageUrls];
let duplicate = images[Math.floor(Math.random() * images.length)];
images.push(duplicate);
images.sort(() => Math.random() - 0.5);

const main = document.getElementById("main_id");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const resultPara = document.getElementById("para");

let selectedImages = [];

images.forEach((src, index) => {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add("img");
    img.dataset.index = index;
    img.addEventListener("click", selectImage);
    main.appendChild(img);
});

function selectImage(event) {
    let img = event.target;
    if (!img.classList.contains("selected")) {
        img.classList.add("selected");
        selectedImages.push(img);
    } else {
        img.classList.remove("selected");
        selectedImages = selectedImages.filter(i => i !== img);
    }

    resetBtn.style.display = selectedImages.length > 0 ? "block" : "none";
    verifyBtn.style.display = selectedImages.length === 2 ? "block" : "none";
}

resetBtn.addEventListener("click", () => {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";
    resultPara.textContent = "";
});

verifyBtn.addEventListener("click", () => {
    verifyBtn.style.display = "none";
    if (selectedImages.length === 2 && selectedImages[0].src === selectedImages[1].src) {
        resultPara.textContent = "You are a human. Congratulations!";
    } else {
        resultPara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
});