// Function to hide all sections and show one
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
const baseURL = "http://localhost:3000/animals";
const mammalList = document.getElementById("land")
const birdList = document.getElementById("sky")
const reptileList = document.getElementById("rocks")
const fishList = document.getElementById("water")
const insectList = document.getElementById("flower")
const likedAnimals = document.getElementById("liked")

//GET animal information
async function getAnimals(){
    const res = await fetch(baseURL)
    const data = await res.json()
    
    data.forEach(item => {
        const showAnimal = document.createElement("div");
        showAnimal.classList.add("animal-card");
        showAnimal.innerHTML = `
            <img src="${item.image_url}" alt="${item.name}" class="animal-img">
            <h3 class="animal-name">${item.name}</h3>
            <p class="animal-scientific"><em>${item.scientific_name}</em></p>
            <p class="animal-habitat"><strong>Habitat:</strong> ${item.habitat}</p>
        `;

        // Add event listener with correct reference to item
        showAnimal.addEventListener("click", () => {
            console.log(item.name)
            showAnimalDetails(item)});
        

        // Append to the correct category
        if (item.category === "mammal") mammalList.appendChild(showAnimal);
        else if (item.category === "bird") birdList.appendChild(showAnimal);
        else if (item.category === "reptile") reptileList.appendChild(showAnimal);
        else if (item.category === "fish") fishList.appendChild(showAnimal);
        else if (item.category === "insect") insectList.appendChild(showAnimal);
    });

}

let lastSectionId = ""; // Store the last section before showing details

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
            </div>
            <button id="close-details">Back</button>
        </div>
    `;

    // Hide all category sections
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });

    // Show the details section
    detailsDiv.style.display = "block";

    // Close button event to go back to the last section
    document.getElementById("close-details").addEventListener("click", () => {
        detailsDiv.style.display = "none";
        document.getElementById(lastSectionId).style.display = "block"; // Restore the last section
    });
}


getAnimals()

});