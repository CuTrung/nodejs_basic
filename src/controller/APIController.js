import pool from '../configs/connectDB';

let getAllUser = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.status(200).json({
        message: 'ok',
        data: rows,
    });
}


let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    let sql = 'INSERT INTO `users`(firstName, lastName, email, address) VALUES (?, ?, ?, ?)'
    await pool.execute(sql, [firstName, lastName, email, address]);
    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;

    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    let sql = 'UPDATE `users` SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?';
    await pool.execute(sql, [firstName, lastName, email, address, id]);

    return res.status(200).json({
        message: 'ok'
    })
}


let deleteUser = async (req, res) => {
    let userId = req.params.id;

    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    let sql = 'DELETE FROM `users` WHERE id = ?';
    await pool.execute(sql, [userId]);
}

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}