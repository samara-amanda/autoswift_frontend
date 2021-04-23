const url = "http://localhost:3000/api/v1/cars" 
const userUrl = "http://localhost:3000/api/v1/users"


const container = document.querySelector("#car-container")
const createCarForm = document.querySelector('#create-car-form')
const userSelectDom = document.querySelector('#users-select')


createCarForm.addEventListener('submit', (event) => Car.createCarHandler(event)) 

UserApi.getUsersReq()

CarApi.getCarsReq()