const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer');
const trycatch = require('../error/errorhandler').trycatch;
const Temp = require('../models/forgotpassword');
const crypto = require('crypto');


// ------------ authentication middleware ------------ //

exports.auth = trycatch(async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, token: token });
    if (!user) {
        throw new Error('User not found');
    }
    req.user = user;
    next();
});


// ------------ GET REQUEST : /verification/login ------------ //

const search = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password is incorrect');
    }
    return user;
};


exports.login = trycatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await search(email, password);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        token
    });
});


// ------------ POST REQUEST : /verification/admin/createuser ------------ //

exports.createUser = trycatch(async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new Error('Unauthorized');
    }
    const { email, password } = req.body;
    const user = await User.find({ email });
    if (user.length) {
        throw new Error('User already exists');
    }
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(200).json({
        status: 'success',
        message: 'User created successfully',
        user: newUser
    });
});


// ------------ POST REQUEST : /verification/admin/getusers ------------ //

exports.getUsers = trycatch(async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new Error('Unauthorized');
    }
    const users = await User.find({});
    res.status(200).json({
        status: 'success',
        message: 'Users fetched successfully',
        users
    });
});


// ------------ POST REQUEST : /verification/admin/deleteuser ------------ //

exports.deleteUser = trycatch(async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new Error('Unauthorized');
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    await user.remove();
    res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
        user
    });
});


// ------------ POST REQUEST : /verification/admin/updateuser ------------ //

exports.updateUser = trycatch(async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new Error('Unauthorized');
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    user.password = password;
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        user
    });
});


// ------------ POST REQUEST : /verification/resetpassword ------------ //

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'demoritv1421@gmail.com',
        pass: 'gzbhjzpzyhsqxhwp'
    }
});

const sendMail = async (email, link) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password reset',
        html: `reset your password here: <a href="http://localhost:3000/resetpassword/${link}">Reset Password</a>`
    };
    await transporter.sendMail(mailOptions);
};

exports.resetPassword = trycatch(async (req, res) => {
    const email = req.body.email;
    console.log(email);
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error('User not found');
    }
    const isTemp = await Temp.findOne({ id: user._id });
    if (isTemp) {
        await isTemp.remove();
    }
    const tempString = crypto.randomBytes(32).toString('hex');
    const temp = new Temp({ email, tempString, id: user._id });
    const link = user._id + '/' + tempString;
    await temp.save();
    await sendMail(email, link);
    console.log(tempString);
    res.status(200).json({
        status: 'success',
        message: 'Email sent successfully'
    });
});


// ------------ POST REQUEST : /verification/changepassword ------------ //

exports.changePassword = trycatch(async (req, res) => {
    console.log(req.body);
    const id = req.body.id
    const tempString = req.body.link;
    const password = req.body.password;
    const temp = await Temp.findOne({ id, tempString });
    if (!temp) {
        throw new Error('Link expired');
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
        throw new Error('User not found');
    }
    user.password = password;
    await user.save();
    await temp.remove();
    res.status(200).json({
        status: 'success',
        message: 'Password changed successfully'
    });
});