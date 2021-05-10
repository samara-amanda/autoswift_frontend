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


    static patchCarReq(car) {
        let {year, brand, model, price, image_url, user} = car
        const carInfo = {year, brand, model, price, image_url, user}

        fetch(`${url}/${car.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(carInfo),
        })
        .then(res => res.json())
        .then(json => {
            car.renderCar()
        })
    }


    static deleteCar(id) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        .then(r => r.json())
        .then(json => alert(json.message))
    }
}


