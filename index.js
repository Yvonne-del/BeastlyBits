const baseURL = 'http://localhost:3000/animals';
const animalList = document.getElementById("animalList")

// fetch(baseURL)
// .then(response => response.json())
// .then(data => getInformation(data))
// function getInformation(data){
//     animalList.innerHTML = ''
//     data.forEach(item => {
//         let animal = document.createElement("li")
//         animal.textContent = `Name: ${item.name}, Donations: ${item.donations}`
//         animalList.appendChild(animal)
//     })
// }

// const getInformation = async ()=> {
//     const res = await fetch(baseURL)
//     const data = await res.json()

//     data.forEach(item => {
//         let animal = document.createElement("li")
//         animal.textContent = `Name: ${item.name}, Donations: ${item.donations}`
//         animalList.appendChild(animal)
//     })
// }
// getInformation()






//GET http method. fetch works as the get method
const getInfo = async() =>{
    const res = await fetch(baseURL)
    const data = await res.json()
    animalList.innerHTML= '';//to add the values inside the html element

    data.forEach(item => {
        let listItem = document.createElement("li")
        listItem.textContent = `Name: ${item.name}, Donations: ${item.donations}, Description: ${item.description} ` ;
        //create a delete button to appear in the listings, both old and new
        let deleteButton = document.createElement("button")
        deleteButton.textContent = " x ";
        deleteButton.addEventListener("click", ()=> deleteAnimal(item.id))
        //create an update button to change the donation value
        let updateButton = document.createElement("button")
        updateButton.textContent = ' update ';
        updateButton.addEventListener('click', () => updateAnimal(item.id, item.donations))
        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);
        animalList.appendChild(listItem); 
    });
}

// to use to the deleteButton above...below is a function to DELETE http function method an
// animal from db.json and show in browser
const deleteAnimal = async (id) =>{
    const res = await fetch(`${baseURL}/${id}`,{
        method:`DELETE`,
    })
    if(res.ok){
        getInfo();
    }else{
        alert("failed to delete animal")
    }
}

//POST method in http 
//we start by connecting the form to the DOM
const addAnimal = async()=>{
    const animalName = document.getElementById("name").value;
    const theDonation = document.getElementById("don").value;
    const animalDescription = document.getElementById("desc").value

    //to prevent user from leaving any field empty
    if(!animalName || !theDonation || !animalDescription){
        alert("please fill all fields")
        return;//to ensure the code runs if all fields are filled
    }

    //lets add a new animals      parseInt is to change string value to number
    const newAnimal = {name:animalName, donations:parseInt(theDonation), description:animalDescription}
    //lets connect to server POST
    const res = await fetch(baseURL, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(newAnimal)
    })
    //to refresh the page automatically after adding item
    if(res.ok){
        getInfo();
    }else{
        "failed to add animal"
    }
}

//to connect the button for it to work as a submit button
//must be ufter all http method codes
document.getElementById("submitAnimal").addEventListener("click", addAnimal)


//PATCH method to change specific data    
const updateAnimal = async (id, currentDonation)=>{
    let newDonation = prompt("Enter new donation amount: ", currentDonation)

    //connect POST method to server
    const res = await fetch(`${baseURL}/${id}`,{
        method: 'PATCH',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({donations: parseInt(newDonation)})
    })
    if(res.ok){
        getInfo();
    }else{
        alert("failed to update donation")
    }
}


getInfo(); //very important to invoke the function for it to work