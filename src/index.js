const baseURL = "http://localhost:3000/api/v1/cars" 

const list = document.querySelector("#car-list")
const form = document.getElementById('create-car-form')

const yearInput = document.getElementById('input-year')
const brandInput = document.getElementById('input-brand')
const modelInput = document.getElementById('input-model')
const priceInput = document.getElementById('input-price')
const userInput = document.getElementById('users')
const imageUrlInput = document.getElementById('input-image-url')


form.addEventListener('submit', handleFormSubmit)


function handleFormSubmit(e) {
    e.preventDefault()

    CarApi.createCar()
    form.reset()
} 


CarApi.getCars()  