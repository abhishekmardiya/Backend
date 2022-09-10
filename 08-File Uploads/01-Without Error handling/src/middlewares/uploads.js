//*********************whole code from multer package *******************/

const multer = require("multer");
const path = require("path");

//here multer behaves like an object
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    /*
    first argument is error.if you have to put te error then write new Error("error message") instaed of null.

    second argument is destination(path) where we store all the files.our destination is uploads folder where all the file will be stored.
    this destination will be stored as destination key under req.file object
    */
    callback(null, path.join(__dirname, "../uploads"));
  },

  filename: function (req, file, callback) {
    console.log("file", file);
    /*
    this uniquePreffix help us to add something randon to file so that when user upload the file with same name then it can be differentiate
    don't use suffix otherwise we cannot use img tag in html as image name will be test.png-1661086431078-953567854 which has .png onwards
    */
    const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //if you upload test.png then it will converted as 1661086431078-953567854-test.png
    //originalname is predefined in file object
    callback(null, uniquePreffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, callback) {
  // The function should call `callback` with a boolean to indicate if the file should be accepted or not
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // To accept the file pass `true`, like so:
    callback(null, true);
  } else {
    // To reject this file pass `false`, like so:
    callback(null, false);
    // You can always pass an error if something goes wrong:
    callback(new Error("Incorrect MIME type"));
  }
}

//posting on postman
/*
input form:
firstName:"abhishek",
profilePic:195005-first-image-of-a-black-hole.jpg

output of console.log(file) will be:
file {
  fieldname: 'profilePic',    //passes in schema
  originalname: '195005-first-image-of-a-black-hole.jpg',     //name of file that uer uploads
  encoding: '7bit',
  mimetype: 'image/jpeg'  //image type
}

output of console.log(req.body) will be:
{ firstName: 'abhishek' }     //only firstName is stored in the body file will be stored in file

output of console.log(req.file) will be:
{
  fieldname: 'profilePic',
  originalname: '195005-first-image-of-a-black-hole.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'D:\\MASAI\\Backend\\10 (File Uploads)\\file-uploads\\src\\uploads',     //path of folder that we have specified for storing images
  filename: '1661089575490-264659898-195005-first-image-of-a-black-hole.jpg',
  path: 'D:\\MASAI\\Backend\\10 (File Uploads)\\file-uploads\\src\\uploads\\1661089575490-264659898-195005-first-image-of-a-black-hole.jpg',    //path of image that we have stored in our server(in uploads folder)
  size: 60740
}
*/

const options = {
  //you can use storge or dest
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    //fileSize is in the bytes
    //set to 5mb so larger than 5mb cannot be accpeted
    fileSize: 5 * 1024 * 1024,
  },
};

/*
uploads is an middleware
multer accepts only object as argument
here multer behaves like an function(see line number 5)
*/
const uploads = multer(options);

module.exports = uploads;
