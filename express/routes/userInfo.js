const express = require('express');
const router =  express.Router();
const ports = require('./ports');

let mockData = [
    { name: 'John', age: 12 },
    { name: 'Jack', age: 22 },
    { name: 'Dior', age: 23 },
]

let getUserInfo = (req, res, next) => {
    return res.json({
        code: 200,
        data: mockData
    })
}

router.get(ports.USERINFO, getUserInfo);
module.exports = router;