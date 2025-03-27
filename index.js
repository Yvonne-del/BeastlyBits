// Function to hide all sections and show one
function showSection(sectionId, event) {
    if (event && event.preventDefault) event.preventDefault();
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}


document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "https://pawprint-c702.onrender.com";
    const mammalList = document.getElementById("land");
    const birdList = document.getElementById("sky");
    const reptileList = document.getElementById("rocks");
    const fishList = document.getElementById("water");
    const insectList = document.getElementById("flower");
    const likedSection = document.getElementById("liked"); // Liked animals section

    // Load liked animals from local storage
    let likedAnimals = JSON.parse(localStorage.getItem("likedAnimals")) || {};

    // GET animal information
    async function getAnimals() {
        const res = await fetch(`${baseURL}/animals`);
        const data = await res.json();

        data.forEach(item => {
            const showAnimal = createAnimalCard(item);
            
            // Append to the correct category
            if (item.category === "mammal") mammalList.appendChild(showAnimal);
            else if (item.category === "bird") birdList.appendChild(showAnimal);
            else if (item.category === "reptile") reptileList.appendChild(showAnimal);
            else if (item.category === "fish") fishList.appendChild(showAnimal);
            else if (item.category === "insect") insectList.appendChild(showAnimal);

            // If the animal was previously liked, add it to the liked section
            if (likedAnimals[item.id]) {
                addToLikedSection(item);
            }
        });
    }

    // Function to create an animal card
    function createAnimalCard(item) {
        const showAnimal = document.createElement("div");
        showAnimal.classList.add("animal-card");
        showAnimal.innerHTML = `
            <img src="${item.image_url}" alt="${item.name}" class="animal-img">
            <h3 class="animal-name">${item.name}</h3>
            <p class="animal-scientific"><em>${item.scientific_name}</em></p>
            <p class="animal-habitat"><strong>Habitat:</strong> ${item.habitat}</p>
        `;

        // Likes Container
        const likesContainer = document.createElement("div");
        likesContainer.classList.add("likes-container");

        let numberOfLike = document.createElement("p");
        numberOfLike.classList.add("likes-count");
        numberOfLike.textContent = `Likes: ${item.likes}`;

        let likeButton = document.createElement("button");
        likeButton.type = "button";
        likeButton.classList.add("like-button");
        likeButton.textContent = "Like";

        // Update the button's state based on the current state of the likedAnimals object
        if (likedAnimals[item.id]) {
            likeButton.style.backgroundColor = "rgb(4, 143, 37)";
        } else {
            likeButton.style.backgroundColor = "rgb(51, 50, 50)";
        }

        likeButton.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            await updateLikes(item, numberOfLike, likeButton);
        });
        

        // Append likes and button inside container
        likesContainer.appendChild(numberOfLike);
        likesContainer.appendChild(likeButton);
        showAnimal.appendChild(likesContainer);

        showAnimal.addEventListener("click", () => showAnimalDetails(item));
        return showAnimal;
    }


      // Function to show detailed animal information
    function showAnimalDetails(item) {
        const detailsDiv = document.getElementById("animal-details");

        // Store the last visible section before hiding it
        lastSectionId = document.querySelector(".section:not([style*='display: none'])")?.id || "home";

        detailsDiv.innerHTML = `
            <div class="details-container">
                <img src="${item.image_url}" alt="${item.name}" class="detail-img">
                <div class="info">
                    <h3 class="animal-name">${item.name}</h3>
                    <p class="animal-scientific"><em>${item.scientific_name}</em></p>
                    <p class="animal-desc">${item.description}</p>
                    <p class="animal-habitat"><strong>Habitat:</strong> ${item.habitat}</p>
                    <p class="animal-diet"><strong>Diet:</strong> ${item.diet}</p>
                    <p class="animal-population"><strong>Population:</strong> ${item.population}</p>
                    <br>
                    <p class="animal-facts"><strong>Did you know?</strong><br>${item.fun_facts}</p>
                </div>
            </div>
        `;

        // Hide all category sections
        document.querySelectorAll(".section").forEach(section => {
            section.style.display = "none";
        });

        // Show the details section
        detailsDiv.style.display = "block";

        // Close button event to go back to the last section
        document.addEventListener("keydown", handleEscapeKey);

        // Function to handle Escape key
        function handleEscapeKey(event) {
            if (event.key === "Escape") {
                detailsDiv.style.display = "none";
                document.getElementById(lastSectionId).style.display = "block"; // Restore the last section
            }
        }
    }
    

    // Toggle like and update database
    const updateLikes = async (item, likeCountElement, button, isFromLikedSection = false) => {
        const isLiked = likedAnimals[item.id]; // Check if already liked
        const newLikes = isLiked ? item.likes - 1 : item.likes + 1; // Increase or decrease likes

        try {
            const res = await fetch(`${baseURL}/animals/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ likes: newLikes })
            });

            if (!res.ok) throw new Error("Failed to update likes");

            const updatedData = await res.json();
            item.likes = updatedData.likes; // Update local item data

            if (likeCountElement) {
                likeCountElement.textContent = `Likes: ${item.likes}`;
            }

            if (isLiked) {
                delete likedAnimals[item.id];
                if (button) button.style.backgroundColor = "rgb(51, 50, 50)";
                removeFromLikedSection(item.id);
            } else {
                likedAnimals[item.id] = true;
                if (button) button.style.backgroundColor = "rgb(4, 143, 37)";
                addToLikedSection(item);
            }

            saveLikedAnimals() // Save changes

            // If removing from liked section, also update the main card
            if (isFromLikedSection) {
                updateMainAnimalCard(item);
            }

        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    
    // Function to add an animal to the liked section
    function addToLikedSection(item) {
        if (!document.getElementById(`liked-${item.id}`)) {
            const likedCard = document.createElement("div");
            likedCard.classList.add("animal-card");
            likedCard.id = `liked-${item.id}`;
            likedCard.innerHTML = `
                <img src="${item.image_url}" alt="${item.name}" class="animal-img">
                <h3 class="animal-name">${item.name}</h3>
                <p class="animal-scientific"><em>${item.scientific_name}</em></p>
                <p class="animal-habitat"><strong>Habitat:</strong> ${item.habitat}</p>
            `;

            // Likes Container
            const likesContainer = document.createElement("div");
            likesContainer.classList.add("likes-container");

            let unlike = document.createElement("p");
            unlike.classList.add("likes-count");
            unlike.textContent = `Don't Like this?`;


            // Create Remove Like Button
            let removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.classList.add("remove-like-button");
            removeButton.textContent = "Remove Like";

            // Handle unliking
            removeButton.addEventListener("click", async (event) => {
                event.preventDefault();
                event.stopPropagation();
                await updateLikes(item, null, null, true);
            });
            
            // Append likes and button inside container
            likesContainer.appendChild(unlike);
            likesContainer.appendChild(removeButton);

            likedCard.appendChild(likesContainer);
            likedSection.appendChild(likedCard);

            likedCard.addEventListener("click", () => showAnimalDetails(item));
        }
    }
    
    function updateMainAnimalCard(item) {
        const mainAnimalCards = document.querySelectorAll(".animal-card");
        mainAnimalCards.forEach(card => {
            if (card.querySelector("h3").textContent === item.name) {
                const likeButton = card.querySelector("button");
                const likesText = card.querySelector("p");

                likesText.textContent = `Likes: ${item.likes}`;
                likeButton.style.backgroundColor = item.likes > 0 ? "green" : "blue";
            }
        });
    }
    // Function to remove an animal from the liked section
    function removeFromLikedSection(itemId) {
        const likedCard = document.getElementById(`liked-${itemId}`);
        if (likedCard) {
            likedCard.remove();
        }
    }
    function saveLikedAnimals() {
        localStorage.setItem("likedAnimals", JSON.stringify(likedAnimals));
    }


    getAnimals();
});