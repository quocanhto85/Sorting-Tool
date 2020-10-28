const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

let cors = require("cors");

app.use(cors({origin:true,credentials: true}));

// app.use(function (req, res, next) {  
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain to make the request from
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

// User model
const User = require("../models/User");

router.post("/register", (req, res, next) => {
    const { email, username, password, repassword } = req.body;

    let errors = [];
    let success = "Bạn đã đăng ký tài khoản thành công, giờ bạn có thể đăng nhập."

    // Check required fields
    if (email === "" || username === "" || password === "" || repassword === "") {
        errors.push({ msg: "Bạn cần điền đầy đủ thông tin" });
    }

    // Check passwords match
    if (password !== repassword) {
        errors.push({ msg: "Mật khẩu nhập lại không trùng khớp" });
    }

    // Check passwords length
    if (password.length < 6) {
        errors.push({ msg: "Mật khẩu phải có độ dài tối thiểu 6 ký tự" });
    }

    if (errors.length > 0) {
        // send error to UI
        // console.log(errors)
        res.status(400).send(errors);
        res.end();

    } else {
        // Validation passed
        const newUser = new User({
            username,
            email,
            password,
            repassword
        });

        console.log(newUser)

        newUser.save()
            .then((user) => {
                res.redirect("/");
                res.send(success);
                res.end();            
            })
    }
});



module.exports = router;