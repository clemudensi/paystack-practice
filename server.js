const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());

app.get('/', function(req, res){
    const token = 'sk_test_584bfc762c9d0eeb4f4dc722912f3b22f3c4c925';
    return axios({ method: 'get', url: 'https://studio-api.paystack.co/insights/spenders', headers: { Authorization: `Bearer ${token}`} })
        .then(response => {
            res.json(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(3035);
console.log('test server started on port 3035');