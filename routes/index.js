const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const indexModel = require('../models/indexModel')

/* middleware function to destry user session */
router.all((req, res, next)=>{
  if(req.session.sunm!=undefined||req.session.srole=='admin')
  	res.redirect('/admin/index')
  next()    
});

router.use((req, res, next)=>{
  if(req.session.sunm !=undefined || req.session.srole=='admin')
    res.redirect('/admin/index')
     next()   
});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });


router.get('/', (req, res,next)=>{
  res.render('home');
});

/* GET home page. */
router.get('/login', (req, res,next)=>{
  res.render('login',{'output':''});
});

router.get('/signup', (req, res, next)=>{
  res.render('register',{'output':''});
});

router.get('/logout',(req,res,next)=>{    
    req.session.destroy(function(err){  
        if(err){  
          console.log(err);  
         }  
        else  
        {  
          res.render('login');  
        }  
    })
})


router.post('/signup',upload.single('image'),(req,res,next)=>{

	indexModel.registerUser(req.body,req.file).then((result)=>{
	 console.log(req.file)
	  const obj = {
        img:{
        	data: Buffer,
            contentType: String,
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'img/jpg'
          }
    }
    indexModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
             //item.save();
            //res.redirect('/register');
        }
    });

	   if(result)
		    msg ="User registered Successfully....",
            code =true
       else
        	msg =" email already exit,Plese enter new email",
            code = false
        res.render('register',{'output':msg});
          

	}).catch((err)=>{
		//res.render({message:err.message})
		console.log(err)
	})
})


router.post('/login',(req,res,next)=>{
   
    indexModel.userLogin(req.body).then((result)=>{
      
      if(result.length==0){
			res.render('login',{'output':'Invalid email & password....'});
		}
		else{
			    req.session.sunm = result[0].email
			    req.session.srole = result[0].role

			    if(result[0].role=="admin")
            res.redirect('/admin/index')
            else
             res.redirect('/login')    
        }
      }).catch((err)=>{
		res.render({message:err.message})
	})
})




module.exports = router;