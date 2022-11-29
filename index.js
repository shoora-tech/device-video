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
                url: 'http://safety.shoora.com/auth/api/v1/token/',
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
    console.log(req.params);
    console.log(req.query.device)
    let devices = req.query.device
    let email = req.query.email
    let pass = req.query.password

    const formData = {
        email: email, 
        password: pass
     };

    // var body = JSON.stringify({ 
    //     email: email, 
    //     password: password
    //   });
    // var postBody = {
    //     url: 'https://todoist.com/oauth/access_token',
    //     body: body,
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // };
    // request.post(
    //     {
    //       url: 'http://127.0.0.1:8000/auth/api/v1/token/',
    //       form: formData
    //     },
    //     function (err, httpResponse, body) {
    //       console.log(err, body);
    //     }
    //   );

    // authenticate and get jsession id 
    getRawApiResponse(formData)
        .then(function(body){
            console.log("body ", body)
            body = JSON.parse(body)
            let jsessionId = null
            let jsession_data = body['jsession_data']
            console.log("jsession - data ", jsession_data)
            if (jsession_data['status_code'] == 200){
                jsessionId = jsession_data['data']['JSESSIONID']
            }
            // res.render('index', { title: 'Express', api: "some", body: body});
            res.render('home',{devicelist:devices, jsessionId: jsessionId});
        }).catch(function(err){
            console.log("error ", err)
            alert("Something went wrong!!")
        })
        
    // res.render('home',{devicelist:req.params.devices});
})

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`); 
}); 