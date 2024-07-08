import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('frontend')); 
app.set('views', 'backend'); 
app.set('view engine', 'ejs');


let posts = [];


app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('addPost');
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: posts.length + 1, title, content });
    res.redirect('/');
});

app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('editPost', { post });
});

app.post('/posts/:id', (req, res) => {
    const { title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    posts[postIndex] = { id: parseInt(req.params.id), title, content };
    res.redirect('/');
});

app.post('/posts/:id/delete', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});