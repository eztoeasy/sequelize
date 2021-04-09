const express = require('express');
const router = express.Router();

function testMiddleWare(request, response, next){
    console.log('첫번째 미들웨어');
    next();
}

function testMiddleWare2(request, response, next){
    console.log('두번째 미들웨어');
    next();
}

router.get('/', testMiddleWare, testMiddleWare2, function(request, response){
    response.send('admin 이후 url');
});

router.get('/products', function(_, response){
    response.render('admin/products.html', {
        message : '<h1>태그가 출력됩니다.</h1>',
        online : '~~~~@@'
    });
});

router.get('/products/write', function(request, response){
    response.render('admin/write.html');
});

router.post('/products/write', function (request, response){
    response.send(request.body);
});

module.exports = router;