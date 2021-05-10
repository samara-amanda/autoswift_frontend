class Car {
    constructor(car, carAttributes) {  
      this.id = car.id  
      this.year = carAttributes.year
      this.brand = carAttributes.brand
      this.model = carAttributes.model
      this.price = carAttributes.price
      this.image_url = carAttributes.image_url
      this.user_id = carAttributes.user_id
      this.user = carAttributes.user
      this.div = document.createElement('div')
      this.div.id = `car-${this.id}` 
      
      this.div.addEventListener('click', (e) => {
        if (e.target.id == "edit-btn"){
          this.renderEditForm(e)
        } else if (e.target.id == "delete-btn"){
          e.currentTarget.remove() 
          CarApi.deleteCar(this.id)
         } else if (e.target.id == "submit-btn") {
           this.updatedCarHandler()
         }
      })

      Car.all.push(this)
    }


    renderCar() { 
        this.div.innerHTML = `
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <div data-id=${this.id}>
              <img src=${this.image_url} class="img-fluid" alt="...">
                <div class="card-body">
                  <h4 class="card-car-info">${this.year} ${this.brand} ${this.model}</h4>
                  <p class="card-text">${"$" + this.price}</p>
                  <h5 class="card-text">Seller Info: ${this.user.name}</h5>
                  <p class="card-text">${this.user.email}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group" id="btn-group">
                        <button id="edit-btn" type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        <button id="delete-btn" type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
                      </div>
                    </div>
                </div>  
            </div>
          </div>
        </div>

      <br><br>`
  
      return this.div
    }


    renderEditForm = (event) => {
      debugger
      this.div.innerHTML = `<h3>Edit a Car Listing!</h3>
        <label>Image URL</label>
        <input id='input-image-url' type="text" name="image-url" value="${this.image_url}" class="input-text">
        <br><br>
        <label>Year</label>
        <input id='input-year' type="text" name="year" value="${this.year}" class="input-text">
        <br><br>
        <label>Brand</label>
        <input id='input-brand' type="text" name="brand" value="${this.brand}" class="input-text">
        <br><br>
        <label>Model</label>
        <input id='input-model' type="text" name="model" value="${this.model}" class="input-text">
        <br><br>
        <label>Price</label>
        <input id='input-price' type="text" name="price" value="${this.price}" class="input-text">
        <br><br>
        <button id="submit-btn" type="button" class="btn btn-sm btn-outline-secondary">Submit</button>
        <button id="delete-btn" type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
        <br><br>`;
     
    }


    static findById(id) {
        return this.all.find(car => car.id === id);
    }


    static createCarHandler(event) {
      event.preventDefault()
  
      const yearInput = document.getElementById('input-year').value
      const brandInput = document.getElementById('input-brand').value
      const modelInput = document.getElementById('input-model').value
      const priceInput = document.getElementById('input-price').value
      const userInput = document.getElementById('users-select').value
      const imageUrlInput = document.getElementById('input-image-url').value
      
      CarApi.postCarReq(yearInput, brandInput, modelInput, priceInput, userInput, imageUrlInput)
      document.getElementById("create-car-form").reset()

    }

    
    updatedCarHandler = () => {
        this.id = this.id
        this.car = Car.findById(this.id);
        this.year = this.div.querySelector('#input-year').value
        this.brand = this.div.querySelector('#input-brand').value
        this.model = this.div.querySelector('#input-model').value
        this.price = this.div.querySelector('#input-price').value
        this.image_url = this.div.querySelector('#input-image-url').value
debugger
        CarApi.patchCarReq(this)
    }

}

Car.all = [];

