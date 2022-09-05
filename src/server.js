import express from 'express';
import conFigViewEngine from './configs/viewEngine';


const app = express();
const port = 3000;

conFigViewEngine(app);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log("Run project");
})




