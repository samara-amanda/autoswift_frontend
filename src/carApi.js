class CarApi {
    static getCarsReq() {
        fetch(url)
        .then(response => response.json())
        .then(cars => {
            cars.data.forEach(car => {
                const newCar = new Car(car, car.attributes)
                document.querySelector("#car-container").appendChild(newCar.renderCar())
            })
        })
    }


    static postCarReq(year, brand, model, price, user_id, image_url) {
        const carInputValues = {year, brand, model, price, user_id, image_url}
        // POST Render Car Request
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(carInputValues)
        })
        .then(response => response.json())
        .then(car => {
            const carData = car.data
            const newCar = new Car(carData, carData.attributes)
            document.querySelector("#car-container").appendChild(newCar.renderCar())
        })
    }


    
}


