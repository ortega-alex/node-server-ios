const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { mongoess } = require('./Config/database');
const path = require('path')

//settings
app.set('port' , process.env.PORT || 3000);

//middlewors
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(
	{origin:'*'}
));

//routes
app.use("/user" , require("./Routes/user-route"));
app.use("/access" , require("./Routes/access-route"));
app.use("/login" , require("./Routes/login-route"));
app.use("/campaign" , require('./Routes/campaign-route'));
app.use("/archive" , require('./Routes/archive-route'));
app.use("/call" , require("./Routes/call-route"));
app.use("/sms" , require("./Routes/sms-route"));
app.use("/callstate" , require("./Routes/call_sates-route"));

//statuc files
app.use(express.static(path.join(__dirname , 'public')));
app.use((req , res) => {
	res.status(404).json( { status: "err", msj: '400 not found' });
});

//start server
app.listen(app.get('port') , () => {
	console.log(`server on port ${app.get('port')}`);
});