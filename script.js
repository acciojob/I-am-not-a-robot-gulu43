document.addEventListener("DOMContentLoaded", function () {
    let main_val = document.querySelector("#main_id");
    let btn_ret = document.querySelector("#reset");
    let verify_btn = document.querySelector("#verify");
    let result_msg = document.querySelector("#result"); // Message area

    // Clear previous content
    main_val.innerHTML = '';

    // Create and append 5 original image divs
    let imgClasses = ["img1", "img2", "img3", "img4", "img5"];
    let imgs = imgClasses.map(cls => {
        let div = document.createElement("div");
        div.classList.add(cls, "img");
        main_val.appendChild(div);
        return div;
    });

    // Pick a random image and duplicate it
    let randomeIndex = Math.floor(Math.random() * imgs.length);
    let randomeImg = imgs[randomeIndex].cloneNode(true);
    randomeImg.classList.add("img6");
    main_val.appendChild(randomeImg);

    let full_arry = [...imgs, randomeImg];
    let selectedImages = [];
    let final_ans = 0;

    main_val.addEventListener("click", function (event) {
        if (event.target.classList.contains("img")) {
            event.target.classList.toggle("selected");

            let selected = document.querySelectorAll(".selected");
            if (selected.length > 2) {
                selected[0].classList.remove("selected");
            }

            selectedImages = [...document.querySelectorAll(".selected")].map(el => el.classList[0]);

            btn_ret.style.display = selectedImages.length > 0 ? "block" : "none";
            verify_btn.style.display = selectedImages.length === 2 ? "block" : "none";

            if (selectedImages.length === 2) {
                final_ans = selectedImages[0] === selectedImages[1] ? 1 : 0;
            }
        }
    });

    // **Verify Button Click**
    verify_btn.addEventListener("click", function () {
        if (selectedImages.length === 2) {
            if (final_ans === 1) {
                result_msg.textContent = "You are a human. Congratulations!";
                result_msg.style.color = "green";
            } else {
                result_msg.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
                result_msg.style.color = "red";
            }
            verify_btn.style.display = "none"; // Hide verify button after checking
        }
    });

    // **Reset Button Click**
    btn_ret.addEventListener("click", function () {
        document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
        btn_ret.style.display = "none";
        verify_btn.style.display = "none";
        result_msg.textContent = ""; // Clear the result message
        selectedImages = [];
    });
});
