const isLoggedIn = (req,res,next) => {
    // Your middleware code write here...
    console.log("I am going through the isLoggedIn middleware....")

    next()
}

export default isLoggedIn;