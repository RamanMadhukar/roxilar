const express = require('express');
const axios = require('axios');

const app = express();


app.get("/todos", async (req, res) => {

    const data = await axios({
        method: 'GET',
        url: "https://jsonplaceholder.typicode.com/todos"
    })
        .then(response => {

            return response.data;

        })
        .catch(error => {
            console.log('ERROR IN GETTTING THE DATA', error.response.data.error);
        });


    data.forEach(function (v) { delete v.userId });

    res.send(data);


});

app.get("/user/:userId", async (req, res) => {

    let userId = req.params.userId

    const data1 = await axios({
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/users/${userId}`
    })
        .then(response => {

            return response.data;

        })
        .catch(error => {
            console.log('ERROR IN GETTTING THE DATA', error.response.data.error);
        });

    const { id, name, email, phone } = data1;

    const data2 = await axios({
        method: 'GET',
        url: "https://jsonplaceholder.typicode.com/todos"
    })
        .then(response => {

            return response.data;

        })
        .catch(error => {
            console.log('ERROR IN GETTTING THE DATA', error.response.data.error);
        });

    const userData = data2.filter(data => data.userId == userId);

    const todos = [...userData]
    const result = {id,name,email,phone,todos}

    res.send(result);


})




app.listen(5000, () => console.log("server running on port 5000"))