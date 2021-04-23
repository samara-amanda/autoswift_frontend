class User {
    constructor(user, userAttributes) {
        this.id = user.id
        this.name = userAttributes.name
        this.email = userAttributes.email

        User.all.push(this)
    }

    attachToUserSelectDom() {
        const option = document.createElement('option')
        option.value  = this.id 
        option.innerText = this.name
        userSelectDom.append(option)
    }

    static createUserHandler(event) {
        event.preventDefault()
        const userInput = parseInt(document.querySelector('#users-select').value)
        UserApi.postUserReq(userInput)
    }
}

User.all = [];