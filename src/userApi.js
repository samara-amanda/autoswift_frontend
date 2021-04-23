class UserApi {
    static getUsersReq() {
        // get request and renders cars
        fetch(userUrl)
        .then(response => response.json())
        .then(users => {
            users.data.forEach(user => {

                //accessing the attributes of each individual object. and manipulating the DOM
                const newUser = new User(user, user.attributes)

                newUser.attachToUserSelectDom()
        
                // dried up code, added the render call in the Car class file. 
            })
        })
    }

    

}