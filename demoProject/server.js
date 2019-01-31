
/*include All dependencies */
const express     = require('express');
const session     = require('express-session');
const bodyParser  = require('body-parser');
const app = express();

/*
* define all attributes
*/
const port = 3000;

/*
* middleware section
*/

/*define path of frontend */
app.use(express.static('public'));

/* session */
app.use(session({secret:"demoProject",resave:false,saveUninitialized:true}));

/*body parser to get data from url*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*
* routes section 
*/
/* save login user data to session come from angular loginController*/
app.post('/saveLoginData',(req, res) => {
	req.session.user = req.body.user;
	res.json(req.session.user);
})

/* get login user data from session and send back to angular dashboardController*/
app.get('/getLoginData',(req, res) => {
	res.json(req.session.user);
})

/* remove session of the user*/
app.get('/logout', (req, res) => {
	req.session.destroy(function(err) {
        res.status(404).send();
    })
    res.json({message:"session destroy"});
})

/* server run */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))