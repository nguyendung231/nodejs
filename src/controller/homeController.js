const pool =  require('../configs/connectDB');



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



module.exports = {
    getHomepage , getDetailPage , createNewUser ,deleteUser ,getEditPage ,postUpdateUser

};