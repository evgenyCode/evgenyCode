
document.addEventListener("DOMContentLoaded", async () => {
    const carForm = document.getElementById("carForm");

    carForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const image = document.getElementById("image").value;
        const price = parseFloat(document.getElementById("price").value);
        const numberplates = document.getElementById("numberplates").value;

      
        if (!validateLicensePlate(numberplates)) {
            alert("Valstybinis numeris yra neteisingas.");
            return;
        }

        const carData = {
            title,
            image,
            price,
            numberplates
        };

        try {
            const response = await fetch("http://localhost:3001/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(carData)
            });

            if (response.status === 200) {
                alert("Automobilis sėkmingai pridėtas!");
                window.location.href = "index.html"; // 
            } else {
                const data = await response.json();
                alert("Nepavyko pridėti automobilio. Bandykite dar kartą. Klaida: " + data.error);
            }
        } catch (error) {
            console.error("Klaida pridedant automobilį:", error);
            alert("Įvyko klaida. Bandykite dar kartą.");
        }
    });
});

function validateLicensePlate(licensePlate) {
    const lithuanianLicensePlatePattern = /^[A-Z]{3}\s\d{3}$/;
    return lithuanianLicensePlatePattern.test(licensePlate);
}
