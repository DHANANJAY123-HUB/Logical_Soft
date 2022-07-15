const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminModel = require('../models/adminModel')

/* middleware function to check admin users */
router.use((req, res, next)=>{
  if(req.session.sunm ==undefined || req.session.srole!='admin')
    res.redirect('/login')
     next()   
});

/* GET users listing. */
router.get('/', (req, res, next)=>{
  res.render('home',{'sunm':req.session.sunm});
});

/* GET users listing. */
router.get('/my_profile', (req, res, next)=>{
  res.render('my_profile',{'sunm':req.session.sunm});
});


router.get('/index', (req, res,next)=>{
  res.render('index',{'sunm':req.session.sunm});
});

router.get('/dashboard', (req, res,next)=>{
  res.render('dashboard',{'sunm':req.session.sunm});
});

router.get('/user_male', (req, res,next)=>{
  res.render('user_male',{'sunm':req.session.sunm});
});

router.get('/user_female', (req, res,next)=>{
  res.render('user_female',{'sunm':req.session.sunm});
});

router.get('/block_user', (req, res,next)=>{
  res.render('block_user',{'sunm':req.session.sunm});
});

router.get('/report_user', (req, res,next)=>{
  res.render('report_user',{'sunm':req.session.sunm});
});

router.get('/notification_msg', (req, res,next)=>{
  res.render('notification_msg',{'sunm':req.session.sunm});
});

router.get('/membership_user', (req, res,next)=>{
  res.render('membership_user',{'sunm':req.session.sunm});
});

router.get('/membership_plan', (req, res,next)=>{
  res.render('membership_plan',{'sunm':req.session.sunm});
});

router.get('/privacy_policy', (req, res,next)=>{
  res.render('privacy_policy',{'sunm':req.session.sunm});
});

router.get('/term_and_condition', (req, res,next)=>{
  res.render('term_and_condition',{'sunm':req.session.sunm});
});

router.get('/add_notification_msg', (req, res,next)=>{
  res.render('add_notification_msg',{'sunm':req.session.sunm});
});

router.get('/add_membership_plan', (req, res,next)=>{
  res.render('add_membership_plan',{'sunm':req.session.sunm});
});


router.get('/user_list', (req, res,next)=>{

  adminModel.fetchDetails(req.body).then((result)=>{
       res.render('user_list',{ 'sunm':req.session.sunm,'list':result});   
       /*res.json({
        result
       })*/ 
    }).catch((err)=>{
       res.render({message:err.message})
       /*res.json({
        message:err.message
       })*/
    })
});

router.get('/viewdetails/:id', (req, res,next)=>{
   
  adminModel.viewDetails(req.params.id).then((result)=>{
      // res.render('viewdetails',{ 'sunm':req.session.sunm,'result':result}); 
       var query= req.params.id; 
       //var query = new_id.toString()
      res.json({
        result:result
      })
    }).catch((err)=>{
       /*res.render({message:err.message})*/
       res.json({message:err.message})
    });
});



module.exports = router;