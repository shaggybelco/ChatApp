const jwt_decode = require('jwt-decode');

module.exports = async (req, res) =>{
    var token = req.header('token');

    try {
        var decode = jwt_decode(token);

        res.status(200).json({decoded: decode});
        console.log(decode);
    } catch (error) {
        res.status(401).json({error: 'no token provided'});
        console.log('error token');
    }
}