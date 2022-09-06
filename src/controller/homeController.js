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

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser
};