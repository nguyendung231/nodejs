const pool =  require('../configs/connectDB');


let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');

    return res.status(200).json({
        message : 'ok',
        data : rows
    })
}

let createNewUser = async (req, res) => {
    let {firstName, lastName ,email , address} = req.body;

    if(!firstName || !lastName || !email || !address){
            return res.status(200).json({
        message : 'an lol r',
    })
    }

    await pool.execute('insert into users (firstName, lastName, email, address) values (?, ?, ?, ?)',
    [firstName, lastName, email, address])
    

    return res.status(200).json({
        message : 'ok r',
    })
}

let updateUser = async (req, res) => {
    let {firstName, lastName ,email , address ,id} = req.body;

    if(!firstName || !lastName || !email || !address || !id){
            return res.status(200).json({
        message : 'an lol r',
    })
    }

    await pool.execute('update users set firstName = ?, lastName = ?, email = ?,address = ? where id = ?',
    [firstName ,lastName, email, address, id]);

    return res.status(200).json({
        message : 'ok r',
    })
}


let deleteUser = async (req, res) => {
    // let userId = req.body.userId;
    let userId = req.params.id;
    console.log(!userId);
    if(!userId){
        return res.status(200).json({
        message : 'an lol r',

    })
    }
    await pool.execute('delete from users where id = ?', [userId]);
    console.log("the deo nao");
    return res.status(200).json({
        message : 'ok r',
    })
}

module.exports = {
    getAllUsers ,createNewUser ,updateUser ,deleteUser
}