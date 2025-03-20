const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "ramen1.jpeg", rating: 5, comment: "Delicious!" },
    { id: 2, name: "Miso Ramen", restaurant: "Menya", image:"ramen2.jpeg", rating: 4, comment: "Very flavorful!" },
    { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image:"ramen3.jpeg", rating: 3, comment:"Very cutesy!" }
];

function displayRamens() {
    const ramenMenu = document.getElementById("ramen-menu");
    ramenMenu.innerHTML = '';
    ramens.forEach(ramen => {
        const imgElement = document.createElement("img");
        imgElement.src = ramen.image;
        imgElement.alt = `${ramen.name} image`;
        imgElement.title = `${ramen.name} - Click to view details`;

        imgElement.addEventListener('click', () => {
            handleClick(ramen);
        });

        ramenMenu.appendChild(imgElement);
    });
}

function handleClick(ramen) {
    const ramenDetail = document.getElementById('ramen-detail');
    ramenDetail.innerHTML = '';

    const ramenName = document.createElement('h2');
    ramenName.textContent = ramen.name;
    ramenDetail.appendChild(ramenName);

    const ramenRestaurant = document.createElement('p');
    ramenRestaurant.textContent = `Restaurant: ${ramen.restaurant}`;
    ramenDetail.appendChild(ramenRestaurant);

    if (ramen.rating) {
        const ramenRating = document.createElement('p');
        ramenRating.textContent = `Rating: ${ramen.rating} / 5`;
        ramenDetail.appendChild(ramenRating);
    }

    if (ramen.comment) {
        const ramenComment = document.createElement('p');
        ramenComment.textContent = `Comment: ${ramen.comment}`;
        ramenDetail.appendChild(ramenComment);
    }

    addEditOptions(ramen);
}

function addEditOptions(ramen) {
    const ramenDetail = document.getElementById('ramen-detail');
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";

    editButton.addEventListener('click', () => {
        const ratingInput = document.createElement('input');
        ratingInput.type = 'number';
        ratingInput.value = ramen.rating;
        ratingInput.min = 1;
        ratingInput.max = 5;

        const commentInput = document.createElement('textarea');
        commentInput.value = ramen.comment || '';

        ramenDetail.innerHTML = '';
        ramenDetail.appendChild(ratingInput);
        ramenDetail.appendChild(commentInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = "Save";
        saveButton.addEventListener('click', () => {
            ramen.rating = parseInt(ratingInput.value);
            ramen.comment = commentInput.value;
            handleClick(ramen);
        });

        ramenDetail.appendChild(saveButton);
    });

    ramenDetail.appendChild(editButton);
}

function addSubmitListener() {
    const form = document.getElementById('ramen-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('ramen-name').value;
        const restaurant = document.getElementById('ramen-restaurant').value;
        const image = document.getElementById('ramen-image').value;
        const rating = document.getElementById('ramen-rating').value;
        const comment = document.getElementById('ramen-comment').value;

        const newRamen = {
            id: ramens.length + 1,
            name,
            restaurant,
            image,
            rating: rating ? parseInt(rating) : null,
            comment
        };

        ramens.push(newRamen);
        displayRamens();
    });
}

function init() {
    displayRamens();
    addSubmitListener();

    if (ramens.length > 0) {
        handleClick(ramens[0]);
    }
}

document.addEventListener('DOMContentLoaded', init);
