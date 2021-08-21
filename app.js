const form = document.querySelector('#searchForm');
const input = document.querySelector('#input');
form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        const searchTerm = form.elements.query.value;
        // query string object
        const config = { params: { q: searchTerm } };
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
        makeImages(res.data);
        form.elements.query.value = '';
    } catch (err) {
        console.log(err);
    }
});

const makeImages = (results) => {
    for (let result of results) {
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}

const clearImages = () => {
    const allImages = document.querySelectorAll('img');
    for (let image of allImages) {
        image.remove();
    }
}

const button = document.querySelector('#clear');
button.addEventListener('click', clearImages);
// user can clear all images by either clicking the button or perform the next query
input.addEventListener('keydown', clearImages);