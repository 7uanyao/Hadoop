var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('sampleDB');

var bodyparser = require('body-parser');
app.use(bodyparser.json());
// app.use用户向express框架中添加新的功能（插件）
// bodyparser.json()是将用户提交的json字符串，自动转换为对应的JS对象(即集合文档)


//* 获取products集合中所有文档
app.get('/api/products', function (req, res) {
    db.products.find({}, { name: 1, color: 1, price: 1 }, function (err, docs) {
        res.json(docs);
    })
})



//* 获取products集合中特定_id的文档
app.get('/api/products/:id', function (req, res) {
    db.products.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, doc) {
        res.json(doc);
    })
})

//* 向products集合中新增文档
app.post('/api/products', function (req, res) {
    db.products.insert(req.body, function (err, doc) {
        res.json(doc);
    })
})

//* 根据_id修改proudcts集合中的某个文档
app.put('/api/products/:id', function (req, res) {
    db.products.update(
        { _id: mongojs.ObjectId(req.params.id) },
        { $set: { price: req.body.price, type: req.body.type } },
        function (err, doc) { res.json(doc) }
    )
})

//* 删除products集合中特定_id的文档
app.delete('/api/products/:id', function (req, res) {
    db.products.remove(
        { _id: mongojs.ObjectId(req.params.id) },
        function (err, doc) { res.json(doc) }
    )
})

// 监听端口4000
app.listen('4000', function () {
    console.log('Server is running on port 4000...');
})