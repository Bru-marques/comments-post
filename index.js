/* Blue print
Index - GET /comments - list all comments
New - POST /comments - create a new comment
Show - GET /comments/:id - get one comment using ID
Update - PATCH /comment/:id - update one comment
Destroy - DELETE /comment/:id - destroy one comment
*/

const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
uuid();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Set comments
const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'What a funny day!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like walking with my dog.'
    },
    {
        id: uuid(),
        username: 'Ben',
        comment: 'I am so tired  =('
    },
    {
        id: uuid(),
        username: 'Happy People',
        comment: 'Good morning!'
    }
]


app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { comments })
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

/*app.get('/tacos', (req, res) => {
    res.send("GET /tacos response");
});

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Ok, here are your tacos`)
});*/


app.listen(3000, () => {
    console.log("Hello! On port 3000")
})