const isAuthenticate2 = (req,res,next) => {
    console.log("Middleware 2......")
    next()
}

export default isAuthenticate2;