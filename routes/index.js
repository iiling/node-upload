var express = require('express');
const upload = require('multer')({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/2', function(req, res, next) {
    res.render('multi-upload', { title: 'Express' });
});

router.get('/3',function (req,res,next) {
    res.render('swfupload',{ title: 'Express' })
});

router.get('/4',function (req,res,next) {
    res.render('uploadify',{ title: 'Express' })
});
/**
 * 单文件上传
 */
router.post('/upload',upload.single('test-upload'),function (req,res,next) {
    if (!req.file) {
        res.json({ok: false});
        return;
    }
    // 输出文件信息
    console.log('====================================================');
    console.log('fieldname: ' + req.file.fieldname);
    console.log('originalname: ' + req.file.originalname);
    console.log('encoding: ' + req.file.encoding);
    console.log('mimetype: ' + req.file.mimetype);
    console.log('size: ' + (req.file.size / 1024).toFixed(2) + 'KB');
    console.log('destination: ' + req.file.destination);
    console.log('filename: ' + req.file.filename);
    console.log('path: ' + req.file.path);

    // 重命名文件
    let oldPath = path.join(__dirname, '../'+req.file.path);
    let newPath = path.join(__dirname, '../uploads/' + req.file.originalname);

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            res.json({ok: false});
            console.log(err);
        } else {
            res.json({ok: true});
        }
    })
})

/**
 * 多文件上传,upload.array('muilt-upload',3)
 *
 * 1.需要和表单的名字对应。
 * 2.设置上传最大个数。
 */

router.post('/mulitupload',upload.array('muilt-upload',3),function (req,res){
    console.log(req.files);
    console.log(req.files.length+"---length");
    if (!req.files) {
        res.json({ok: false});
        return;
    }
    for(let i=0;i<req.files.length;i++){

        // 输出文件信息
        console.log('====================================================');
        console.log('fieldname: ' + req.files[i].fieldname);
        console.log('originalname: ' + req.files[i].originalname);
        console.log('encoding: ' + req.files[i].encoding);
        console.log('mimetype: ' + req.files[i].mimetype);
        console.log('size: ' + (req.files[i].size / 1024).toFixed(2) + 'KB');
        console.log('destination: ' + req.files[i].destination);
        console.log('filename: ' + req.files[i].filename);
        console.log('path: ' + req.files[i].path);

        // 重命名文件
        let oldPath = path.join(__dirname, '../'+req.files[i].path);
        let newPath = path.join(__dirname, '../uploads/' + req.files[i].originalname);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                res.json({ok: false});
                console.log(err);
            } else {
                res.json({ok: true});
            }
        })
    }

});

/**
 * swfupload插件的使用，不知道怎么接收参数，很尴尬
 */
router.post('/swfupload',function (req,res,next) {
    var form = new formidable.IncomingForm();
    var uploadUrl=path.join(__dirname,"../uploads");
    form.uploadDir =uploadUrl;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        console.log(req.cookies);//cookies not accessible (prints 'null')
        console.log(files);// Contains all info on uploaded file
        res.send('Success!');
    });
});


/**
 *
 * uploadify插件使用
 */
router.post('/uploadify',function (req,res,next) {
    var form = new formidable.IncomingForm();
    var uploadUrl=path.join(__dirname,"../uploads");
    form.uploadDir =uploadUrl;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        console.log(req.cookies);//cookies not accessible (prints 'null')
        console.log(files);// Contains all info on uploaded file
        res.send('Success!');
    });
});

module.exports = router;
