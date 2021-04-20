class Car {
    static all = []

    static container = document.querySelector("#car-list")

    constructor(car, carAttributes) {  
        this.id = car.id  
        this.year = carAttributes.year
        this.brand = carAttributes.brand
        this.model = carAttributes.model
        this.price = carAttributes.price
        this.image_url = carAttributes.image_url
        this.user = carAttributes.user


        this.element = document.createElement('li')
        this.element.id = `item-${this.id}`
        this.element.dataset.id = this.id 

        this.element.addEventListener('click', this.handleItemClick)

        Car.all.push(this)
        
    }

    handleItemClick = (e) => {
        if (e.target.innerText === "Edit"){
            this.renderEditForm(e.target)
            e.target.innerText = "Save"

        } else if(e.target.innerText === "Delete"){
            this.removeCar(e)

        } else if(e.target.innerText === "Save"){ 
            this.saveUpdatedCar()
            e.target.innerText = "Edit"
        }
    }

    renderCar() { 
        
        this.element.innerHTML = `
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
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br><br>`
        
        return this.element
    }

    attachToDom() {
        list.appendChild(this.renderCar())
    }

    static findById(id) {
        return this.all.find(car => car.id === id);
    }

    renderEditForm = (e) => {
        // now using this to access the element
        const div = this.element.querySelector('div')

        div.innerHTML = `
          <h3>Edit a Car Listing!</h3>
    
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

          <label>User</label>
          <select id="users" name="users" value="${this.user.name}">
            <option value="1">Amanda</option>
            <option value="2">Cassie</option>
            <option value="3">Cameron</option>
          </select>
          <br><br>
        </form>
      `;
      
    }


    saveUpdatedCar = () => {
        this.id = this.element.dataset.id
        this.car = Car.findById(this.id);
        this.year = this.element.querySelector("#input-year").value
        this.brand = this.element.querySelector("#input-brand").value
        this.model = this.element.querySelector("#input-model").value
        this.price = this.element.querySelector("#input-price").value
        this.image_url = this.element.querySelector("#input-image-url").value
        this.user = this.element.querySelector("#users").value
    
        CarApi.patchCar(this)
    }

    removeCar = (e) => {
        this.element.remove() // remove it before the fetch request 
        CarApi.deleteCar(this.id) // moved fetch to itemApi for separation of concerns
    }

    
}

