// import connection from '../configs/connectDB';

import pool from '../configs/connectDB';
import multer from 'multer';



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



let getUpLoadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs');
}

// const upload = multer().single('profile_pic');

let uploadMutiple = multer().array('multiple_images', 3);


let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }


    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);

}

let handleUploadMultipleFile = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}


module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
    getUpLoadFilePage,
    handleUploadFile,
    handleUploadMultipleFile
};