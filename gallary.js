const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;
let visibleImages = [];

// Open Image
function openImage(item) {
    visibleImages = Array.from(document.querySelectorAll(".gallery-item"))
        .filter(item => item.style.display !== "none");

    currentIndex = visibleImages.indexOf(item);

    modal.style.display = "flex";
    modalImg.src = item.querySelector("img").src;
}

// Gallery Image Click
galleryItems.forEach(item => {
    item.addEventListener("click", function () {
        openImage(this);
    });
});

// Close Modal
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// Next Image
nextBtn.addEventListener("click", function () {
    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    modalImg.src = visibleImages[currentIndex]
        .querySelector("img").src;
});

// Previous Image
prevBtn.addEventListener("click", function () {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    modalImg.src = visibleImages[currentIndex]
        .querySelector("img").src;
});

// Close when clicking outside image
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Filter Images
filterButtons.forEach(button => {
    button.addEventListener("click", function () {

        // Active Button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const filter = this.getAttribute("data-filter");

        galleryItems.forEach(item => {
            if (filter === "all" || item.classList.contains(filter)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// Keyboard Controls
document.addEventListener("keydown", function (e) {

    if (modal.style.display === "flex") {

        if (e.key === "ArrowRight") {
            nextBtn.click();
        }

        if (e.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    }
});