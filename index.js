const express = require('express');
const path = require('path'); 
const handlebars = require('express-handlebars')
var request = require('request');
let alert = require('alert'); 
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

function getRawApiResponse(formData){
    return new Promise(function(resolve, reject){
        request.post(
            {
                url: 'http://admin.shoora.com/auth/api/v1/token/',
                form: formData
            },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(body)
                  } else {
                    reject(error)
                  }
            }
        );
    });
}


app.get('/videofeed/', (req, res) => {
    let devices = req.query.device
    let email = req.query.email
    let pass = req.query.password

    const formData = {
        email: email, 
        password: pass
    };

    // authenticate and get jsession id 
    getRawApiResponse(formData)
        .then(function(body){
            body = JSON.parse(body)
            let jsessionId = null
            let jsession_data = body['jsession_data']
            if (jsession_data['status_code'] == 200){
                jsessionId = jsession_data['data']['JSESSIONID']
            }
            res.render('home',{devicelist:devices, jsessionId: jsessionId});
    }).catch(function(err){
            console.log("error ", err)
            alert("Something went wrong!!")
    });
});

// Launch single video channel vise
app.get('/liveview/', (req, res) => {
    let devices = req.query.device;
    let email = req.query.email;
    let pass = req.query.password;
    let channel = 0;
    channel = req.query.channel;
    const formData = {
        email: email, 
        password: pass
    };

    // authenticate and get jsession id 
    if(devices){
        getRawApiResponse(formData)
            .then(function(body){
                body = JSON.parse(body)
                let jsessionId = null
                let jsession_data = body['jsession_data']
                if (jsession_data['status_code'] == 200){
                    jsessionId = jsession_data['data']['JSESSIONID']
                }
                res.render('liveview',{layout: 'live',devicelist:devices, jsessionId: jsessionId, channel:channel});
        }).catch(function(err){
                console.log("error ", err)
                alert("Something went wrong!!")
        });
    }else{
        alert("device id needed!!")
    }
});

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`); 
}); 