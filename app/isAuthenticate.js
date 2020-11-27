const isAuthenticate = (req,res,next) => {
    console.log("Via midleWare hurrah ......")
    next()
}

export default isAuthenticate;