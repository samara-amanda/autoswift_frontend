class Car {

    static container = document.querySelector("#car-container")

    constructor(car, carAttributes) {
        this.id = car.id
        this.year = carAttributes.year
        this.brand = carAttributes.brand
        this.model = carAttributes.model
        this.price = carAttributes.price
        this.image_url = carAttributes.image_url
        this.user = carAttributes.user


        this.element = document.createElement('li')
        this.element.id = `item-${car.id}`
        this.element.dataset.id = car.id 

        this.element.addEventListener('click', this.handleItemClick)

        Car.all.push(this)
    }

    handleItemClick = (e) => {
        if (e.target.innerText === "Edit"){
            this.renderEditForm(e.target)
            e.target.innerText = "Save"

        }else if(e.target.innerText === "Delete"){
            this.deleteItem(e)

        } else if(e.target.innerText === "Save"){ 
            this.saveUpdatedCar()
            e.target.innerText = "Edit"
        }
    }

    renderCar() {
        this.element.innerHTML = `
        <div data-id=${this.id}>
            <img src=${this.image_url} class="image_url" height="200" width="250">
            <h3>${this.year} ${this.brand} ${this.model} </h3>
            <p class="price"> ${"$" + this.price} </p>
            <p class="user"> Contact Info: ${this.user.name} </p>
            <p class="user"> ${this.user.email} </p>
        </div>
            <button class="edit" data-id="${this.id}">Edit</button>
            <button class="delete" data-id="${this.id}">Delete</button>
        
        <br><br>`;
    
        return this.element
    }

    createCarForm(e) {
        e.preventDefault()
        this.year = document.querySelector("#input-year").value
        this.brand = document.querySelector("#input-brand").value
        this.model = document.querySelector("#input-model").value
        this.price = document.querySelector("#input-price").value
        this.image_url = document.querySelector("#input-image-url").value
        this.user = document.querySelector("#users").value
    
        postFetch(this)
    }


    attachToDom() {
        document.getElementById('car-container').appendChild(this.renderCar())
    }

    static findById(id) {
        return this.all.find(car => car.id === id);
    }

    renderEditForm = (editBtn) => {
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


    saveUpdatedCar(e) {
        this.id = this.element.dataset.id
        this.car = Car.findById(this.id);
        this.year = this.element.querySelector("#input-year").value
        this.brand = this.element.querySelector("#input-brand").value
        this.model = this.element.querySelector("#input-model").value
        this.price = this.element.querySelector("#input-price").value
        this.image_url = this.element.querySelector("#input-image-url").value
        this.user_id = this.element.querySelector("#users").value
    
        patchCar(this)
    }
}

Car.all = [];