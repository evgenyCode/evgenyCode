document.addEventListener("DOMContentLoaded", async () => {
    const carList = document.getElementById("carList");

    
    async function displayCars() {
        try {
            const response = await fetch("http://localhost:3001/cars/");
            const data = await response.json();

            if (data.cars && Array.isArray(data.cars)) {
                const cars = data.cars;

                
                carList.innerHTML = "";

                
                cars.forEach(car => {
                    const carElement = document.createElement("div");
                    carElement.classList.add("car");
                    carElement.dataset.carId = car.id; 

                    const title = document.createElement("h2");
                    title.textContent = car.title;

                    const image = document.createElement("img");
                    image.src = car.image;

                    const price = document.createElement("p");
                    price.textContent = `Kaina: ${car.price} €`;

                    const numberplates = document.createElement("p");
                    numberplates.textContent = `Valstybiniai numeriai: ${car.numberplates}`;

                    const deleteButton = document.createElement("button");
                    deleteButton.classList.add("delete-button");
                    deleteButton.textContent = "Ištrinti";

                   
                    deleteButton.addEventListener("click", async () => {
                        const confirmed = confirm("Ar tikrai norite ištrinti šį automobilį?");
                        if (confirmed) {
                           
                            const carId = car.id;
                            try {
                                const deleteResponse = await fetch(`http://localhost:3001/cars/${carId}`, {
                                    method: "DELETE",
                                });
                                if (deleteResponse.status === 200) {
                                    carElement.remove(); 
                                }
                            } catch (error) {
                                console.error("Klaida ištrinant automobilį:", error);
                            }
                        }
                    });

                    carElement.appendChild(title);
                    carElement.appendChild(image);
                    carElement.appendChild(price);
                    carElement.appendChild(numberplates);
                    carElement.appendChild(deleteButton);

                    carList.appendChild(carElement);
                });
            } else {
                console.error("Automobilių duomenų klaida: neteisingas formatas");
            }
        } catch (error) {
            console.error("Klaida gaunant automobilių duomenis:", error);
        }
    }

    
    displayCars();
});
