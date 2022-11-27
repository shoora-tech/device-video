const express = require('express');
const path = require('path'); 
const handlebars = require('express-handlebars')
const port = 3002;


const app = express();

//View engine setup
app.set("view engine", 'handlebars');
app.engine('handlebars', handlebars.engine());

//Static Folder
app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + 'public'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// app.get('/', (req, res) => {
//     res.render('home', {layout: 'main'});
// });



app.get('/videofeed/:devices', (req, res) => {
    console.log(req.params);
    res.render('home',{devicelist:req.params.devices});
})

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`); 
}); 