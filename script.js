const accessKey = "geiuLdbKQz_EriPJZBRp52xlWgUq-qstOpUeYHnpUAk";
const searchForm = document.getElementById("form");
const input = document.getElementById("input");
const images = document.getElementById("images");
const showMoreBtn = document.getElementById("showMore");
let keyword = "";
let page = 1;

async function searchImage() {
    keyword = input.value;
    const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(URL);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        images.innerHTML = ""; // Corrected to clear the images container, not the form
    }

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html; // Corrected property name
        imageLink.target = "_blank";
        imageLink.appendChild(image);

        images.appendChild(imageLink);
    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});
