class Car {
    constructor(car, carAttributes) {
      this.id = car.id  
      this.year = carAttributes.year
      this.brand = carAttributes.brand
      this.model = carAttributes.model
      this.price = carAttributes.price
      this.image_url = carAttributes.image_url
      this.user_id = carAttributes.user_id
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
      const user = User.findById(this.user_id)

        this.div.innerHTML = `
        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <div data-id=${this.id}>
              <img src=${this.image_url} class="img-fluid" alt="...">
                <div class="card-body">
                  <h4 class="card-car-info">${this.year} ${this.brand} ${this.model}</h4>
                  <p class="card-text">${"$" + this.price}</p>
                  <h5 class="card-text">Seller Info: ${user.name}</h5>
                  <p class="card-text">${user.email}</p>
                    
                </div>  
            </div>
          </div>
        </div>

      <br><br>`
  
      return this.div
    }


    static createCarHandler(event) {
      event.preventDefault()
  
      const yearInput = document.getElementById('input-year').value
      const brandInput = document.getElementById('input-brand').value
      const modelInput = document.getElementById('input-model').value
      const priceInput = document.getElementById('input-price').value
      const userInput = document.getElementById('users-select').value
      const imageUrlInput = document.getElementById('input-image-url').value
      debugger
      CarApi.postCarReq(yearInput, brandInput, modelInput, priceInput, userInput, imageUrlInput)
      document.getElementById("create-car-form").reset()

    }


    static searchBar() {
      const searchForm = document.querySelector("#search-form")

      searchForm.addEventListener("submit", (e) => {
        e.preventDefault()
        debugger
        
        const element = document.getElementById("search-input").value
        const newCar = cars.filter(car => car)
      })
    }

}

Car.all = [];

