const Express = require('express');
const cors = require('cors');
const app = Express();
const router = require('./routes/router');
const reportrouter = require('./routes/reportrouter');
const error = require('./error/errorhandler');

require('dotenv').config();
require('./db/connect');

app.use(cors());
app.use("/document", Express.static(__dirname + "/public/students"));
app.use("/certificate", Express.static(__dirname + "/public/certificates"));
app.use("/images", Express.static(__dirname + "/views/images"));

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(router, reportrouter);
app.use(error.errorHandler);
const port = process.env.PORT;


app.listen(port, () => {
    console.log("Connection Established ✅" );
});