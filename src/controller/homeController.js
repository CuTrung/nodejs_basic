// import connection from '../configs/connectDB';

import pool from '../configs/connectDB';

let getHomePage = async (req, res) => {
    // logic
    //let data = [];
    // connection.query(
    //     'SELECT * FROM `users`',
    //     function (err, results, fields) {
    //         results.map((row) => {
    //             data.push({
    //                 id: row.id,
    //                 email: row.email,
    //                 address: row.address,
    //                 firstName: row.firstName,
    //                 lastName: row.lastName,
    //             })
    //         });

    //         // return res.render('index.ejs', { dataUser: data });
    //     }
    // );

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');

    return res.render('index.ejs', { dataUser: rows });
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user, fields] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [userId]);
    return res.send(JSON.stringify(user[0]));
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    let sql = 'INSERT INTO `users`(firstName, lastName, email, address) VALUES (?, ?, ?, ?)'
    await pool.execute(sql, [firstName, lastName, email, address])
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    let sql = 'DELETE FROM `users` WHERE id = ?';
    await pool.execute(sql, [userId]);
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [id]);
    return res.render('update.ejs', { dataUser: user[0] });
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    let sql = 'UPDATE `users` SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?';
    await pool.execute(sql, [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser
};