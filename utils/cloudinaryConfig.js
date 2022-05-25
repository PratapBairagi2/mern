const cloudinary = require("cloudinary").v2


cloudinary.config({
    cloud_name:"protapbairagi",
    api_key:"711397371276342",
    api_secret:"yH3WT36KhWxSYO46MNBmofPU0ws"
})

module.exports = cloudinary