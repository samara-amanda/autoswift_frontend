class Car {
    constructor(car, carAttributes) {
        this.id = car.id
        this.year = carAttributes.year
        this.brand = carAttributes.brand
        this.model = carAttributes.model
        this.price = carAttributes.price
        this.image_url = carAttributes.image_url
        this.user = carAttributes.user
        Car.all.push(this)
    }

    renderCarCard() {
        return `
        <div data-id=${this.id}>
    
            <img src=${this.image_url} height="200" width="250">
    
            <h3> ${this.year} ${this.brand} ${this.model} </h3>
        
            <p> ${"$" + this.price} </p>
    
            <p> Contact Info: ${this.user.name} </p>
    
            <p> ${this.user.email} </p>
    
            <button data-id=${this.id}>Edit</button>
        </div>
        <br><br>`;
    }
}

Car.all = [];