const express = require('express');
const app = express();

let posts = require('./db/posts.json');

// app.get('/api/v1/posts', (req,res)=>{
//     res.status(200).json(posts)
// })

app.get('/api/v1/posts/:id', (req,res) =>{
    // console.log(posts);
    const post = posts.find((item) =>{
        return item.id == req.params.id
    })
    res.status(200).json(post)
})

app.use(express.json());

app.post('/api/v1/posts', (req,res) =>{
    const title = req.body.title;
    const body = req.body.body;

    const lastItem = posts[posts.length -1];
    const id = lastItem.id + 1;

    const post={
        id: id,
        title: title,
        body: body,
    }
    posts.push(post);

    res.status(201).json(post);
})

app.put('/api/v1/posts/:id', (req,res) =>{
    let post = posts.find( i => i.id === + req.params.id)
    // untuk menghindari parameter yang tidak kita inginkan
    const params = { title:req.body.title, body:req.body.body
    }
    post ={
        ...post, ...params
    }
    // update post resource lagi
    post = posts.map(i =>i.id === post.id? post:i)
    res.status(200).json(post)
})

app.delete('/api/v1/posts/:id', (req,res)=>{
    posts =posts.filter((item)=> {
        return item.id != req.params.id;

    })
    res.status(200).json({
        message :`Post dengan ID ${req.params.id} sudah berahsil dihapus!`
    })
})

app.listen(3000,()=>{
    console.log('Server nyala di port 3000')
})

