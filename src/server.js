const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.json());


let users = [
    {"id":1, "name": "mike", "surname":"keith"},
    {"id":2, "name":"rob","surname":"johnson"}
]

app.get('/', (req, res) => res.send('Hello World!'));

app.put("/updateUser", (req, res) =>{

   const receivedUser =  req.body;
   console.log("receivedUser ==> ",receivedUser);
   const existingUser = users[receivedUser.id-1];
    console.log("existingUser ==> ",existingUser);
   const mergedUser = mergeUser(existingUser, receivedUser);
   console.log("mergedUser ==> ",receivedUser);
   res.send(mergedUser);
});


app.get('/listUsers', (req, res) =>
    res.send(users)
);

app.post('/addUser', (req, res)=>{

    let newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.send(newUser);
})

let mergeUser = (existingUser , userFromRequest) => {

    Object.keys(userFromRequest).forEach((key) => {

        if (typeof userFromRequest[key] === "object"){
            mergeUser(existingUser[key], userFromRequest[key]);
        } else {
            existingUser[key] = userFromRequest[key];
        }
    });
    return existingUser;

}

app.post("/login", (req, res) => {

        const receivedUser = req.body;
        console.log("user Received ",receivedUser);
        const existingUser = users[receivedUser.id-1];
        //verify the user exists in Database and do validation
        if (existingUser.isAdmin){
            //do admin related tasks
            console.log(existingUser.name + " is Admin User !! ");
        } else {
            //do non-admin related tasks
            console.log(existingUser.name + " is Non Admin User !! ");
        }
        res.send("Login Success");
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));