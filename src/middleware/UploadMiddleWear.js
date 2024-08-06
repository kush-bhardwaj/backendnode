const multer = require('multer')
const arr=[]
const storage = multer.diskStorage({
    destination: "./public/upload",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const path = 'IMG' + uniqueSuffix+"."+file.originalname.split(".")[1]
      req.imagePath = path;
      arr.push(req.imagePath)
      cb(null, path)
      req.arr=arr;
    }
  })
//   const upload = multer({ storage: storage })
//   module.exports  = upload
const upload = multer({storage:storage})
module.exports= upload