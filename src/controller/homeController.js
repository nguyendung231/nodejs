const pool =  require('../configs/connectDB');
const multer = require('multer');


let getHomepage = async (rep,res) => {
    //logic 
    // let data = [];

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    console.log({dataUser:rows});
    return res.render('index.ejs', {dataUser: rows , test:'abc test'});
}

let getDetailPage = async (req, res) => {
  let userId = req.params.userId;
  console.log(req.params);
  console.log("a",userId);
  let [user] = await pool.execute('SELECT * FROM `users` WHERE `id` = ? ', [userId]);

  console.log('check:',typeof user);
  return res.send(JSON.stringify(user))
}

let createNewUser =async (req, res) => {
  
  let {firstName, lastName ,email , address} = req.body;

  await pool.execute('insert into users (firstName, lastName, email, address) values (?, ?, ?, ?)',
  [firstName, lastName, email, address])
  return res.redirect('/')
}

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute('delete from users where id = ?', [userId]);
  return res.redirect('/')
}

let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute('select * from users where id = ?', [id]);
  return res.render('update.ejs',{dataUser: user[0]});
}

let postUpdateUser =async (req, res) => {
  let {firstName ,lastName ,email ,address ,id} = req.body;
  

await pool.execute('update users set firstName = ?, lastName = ?, email = ?,address = ? where id = ?',
[firstName ,lastName, email, address, id]);
return res.redirect('/')
}

let getUploadFilePage = async (req, res) => {
  return res.render('uploadFile.ejs')
}


const upload = multer().single('profile_pic');
const uploadMultiple = multer().array('multiple_images', 3);

let handleUploadFile = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form

      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      // else if (err instanceof multer.MulterError) {
      //     return res.send(err);
      // }
      // else if (err) {
      //     return res.send(err);
      // }

      // Display uploaded image for user validation
      res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);

}


// app.post('/upload-profile-pic', (req, res) => {

// });

let handleUploadMultipleFile = async (req, res) => {
  
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
  }
  else if (!req.files) {
      return res.send('Please select an image to upload');
  }
  // else if (err instanceof multer.MulterError) {
  //     return res.send(err);
  // }
  // else if (err) {
  //     return res.send(err);
  // }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="500" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./upload/">Upload more images</a>';
    res.send(result);

}


module.exports = {
  getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser,
  getUploadFilePage, handleUploadFile ,handleUploadMultipleFile

};