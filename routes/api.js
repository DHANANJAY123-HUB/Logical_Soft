const express = require('express');
const router = express.Router();
const multer = require('multer');
//const { GridFsStorage } = require("multer-gridfs-storage");
const { body, validationResult } = require('express-validator');
const apiModel = require('../models/apiModel');


/*router.use((req,res,next)=>{
	if(req.session.sunm==undefined || res.session.srole ==undefined)
		res.redirect('/api/login')
	else
		next()
})*/

/* GET users listing. */
router.get('/', (req, res, next)=>{
  console.log('');
});



const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,"upload");
    },
    filename: (req, file, callback) => {
        callback(null,file.fieldname);
    }
});

const upload = multer({
    storage: Storage
}).array('image',12);

/* GET home page. */
/*router.get('/', (req, res,next)=>{
  res.render('index');
});
*/
/*/* GET home page. */
/*router.get('/login', (req, res)=>{
  res.render('login');
});*/

/* GET home page. */
/*router.get('/order', (req, res,next)=>{

	indexModel.fetchDetails(req.body.mobile_no).then((result)=>{
        console.log(result);
        res.render('order',{sunm:'mobile_no',action:'list'});    
    }).catch((err)=>{
       res.json({message:err.message})
    })

	//res.render('order')
    // res.render('order', { sunm: 'mobile_no', action: 'list'});
    //res.render('order',{'sunm':mobile_no,'pDetails':pDetails[0],'output':''});
  
});*/


router.post('/upload', (req, res,next) => {
   
   	  apiModel.uploadimage(req.body).then((result)=>{
   	upload(req, res , err => {
        if (err) {
             res.json({message:err.message});
        }
         res.json({message:'file uploaded successfully'});
      })
    });
});

router.post('/signup',
    body('mobile_no').isLength({
        min:10,
        max:10
    }).withMessage('mobile_no should be required min & max 10 digit.'),
    body('password').isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    }).withMessage('password should be required min 6 character 1, lowercase 1, uppercase & 1 number.'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }
	
	apiModel.registerUser(req.body).then((result)=>{
	  console.log(req.body)
	   if(result)
		    result = true,
            msg ="user registered successfully...."
        else
            result = false,
        	msg =" mobile no already exit,plese enter new mobile_no"
        res.json({
            _id:_id,
            result:result,
        	msg:msg
        }); 
         
          

	}).catch((err)=>{
		res.json({message:err.message})
	})
})

router.post('/login',
    body('mobile_no').isLength({
        min:10,
        max:10
    }).withMessage('mobile_no should be required min & max 10 digit.'),
    body('password').isStrongPassword({
        minLength: 6,
     minLowercase: 1,
     minUppercase: 1,
     minNumbers: 1
    }).withMessage('password should be required min 6 character,1 lowercase, 1 uppercase & 1 number.'),(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }

    apiModel.userLogin(req.body).then((result)=>{
      
      if(result.length==0){
			res.json({
                result: false,
				msg:'mobile_no not registered please register mobile no..',
			})
		}
		else{
			req.sunm = result[0].mobile_no,
			req.srole = result[0].password

			if(result[0].password==req.srole)
				res.json({
                    result: true,
                     msg:"user successfully login",
                     data:result[0]
			       /* _id:result[0]._id,
                    mobile_no:result[0].mobile_no,*/
                })
			else{

			}
		}

	}).catch((err)=>{
		res.json({message:err.message})
	})
})

router.patch('/updateGender',
    body('gender').isAlpha().withMessage('gender must be alphabetic.'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }

    apiModel.updateGender(req.body).then((result)=>{

        if(result.length==0){
            res.json({
                result: false,
                msg:'record not found',
            })
        }else{
            req._id = result[0]._id,
            req.gender = result[0].gender

            if(result[0].gender ==req.gender ){
    	        res.json({
    		         result:true,
    		        msg:"gender successfully updated"
    	        })
            }else{

            }
        }     
    }).catch((err)=>{
    	res.json({message:err.message})
    })

})
router.patch('/updatefullName',
    body('name').isLength({
        max:20
       }).withMessage('name should be required.'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }

    apiModel.updatefullName(req.body).then((result)=>{
        if(result.length==0){
            res.json({
                result: false,
                msg:'mobile_no not registered please enter register mobile_no',
            })
        }else{
            req._id = result[0]._id,
            req.name = result[0].name

            if(result[0].name ==req.name ){
                res.json({
    	            result:true,
    		        msg:"name successfully updated"
    	        })
            }    
        }
    }).catch((err)=>{
    	res.json({message:err.message})
    })

})

router.patch('/updateDob',
    body('date_of_birth').isDate({
    format: 'YYYY/MM/DD',
    strictMode:true,
    endDate: 'today'
    //autoclose:true
    }).withMessage('date_of_birth should be required date formate yyyy/mm/dd.'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }

    apiModel.updateDob(req.body).then((result)=>{
        if(result.length==0){
            res.json({
                result: false,
                msg:'mobile_no not registered please enter register mobile_no',
            })
        }else{

            req._id = result[0]._id,
            req.date_of_birth = result[0].date_of_birth

            if(result[0].date_of_birth ==req.date_of_birth ){
                    res.json({
    	                result:true,
    		            msg:"date of birth successfully updated"
    	            })
            }else{

            }    
        }
    }).catch((err)=>{
    	res.json({message:err.message})
    })

})

router.patch('/updateEmail',
    body('email').isEmail().normalizeEmail().withMessage('email should be required.'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }

    apiModel.updateEmail(req.body).then((result)=>{
        if(result.length==0){
            res.json({
                result: false,
                msg:'mobile_no not registered please enter the register mobile no',
            })
        }else{

              req._id = result[0]._id,
              req.email = result[0].email

                if(result[0].email ==req.email ){
                    res.json({
    	                result:true,
    		             msg:"email id successfully updated"
    	            })
                }else{
            }
        }
    }).catch((err)=>{
    	res.json({message:err.message})
    })

})

router.patch('/updatePassword',
    body('password').isLength({
        min: 6
    }).withMessage('password should be required min 6 digit.'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }

    apiModel.updatePassword(req.body).then((result)=>{
        if(result.length==0){
            res.json({
                result: false,
                msg:'mobile_no not registered please enter the register mobile no',
            })
        }else{
            req._id = result[0]._id,
            req.password = result[0].password

            if(result[0].password ==req.password ){
                    res.json({
    	                result:true,
    		            msg:"password successfully updated"
    	            })
                }else{

            }    
        }
    }).catch((err)=>{
    	res.json({message:err.message})
    })

})

router.get('/List', (req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }
  
    apiModel.fetchDetails(req.body).then((result)=>{

        if(result.length==0){
            res.json({
                result: false,
                msg:'record not found',
            })
        }else{
            res.json({
    	        result:true,
                msg:'record get successfully',
    	        data:result
            }); 
        }   
    }).catch((err)=>{
       res.json({message:err.message})
    })
});

router.get('/all_list', (req,res,next)=>{
    
   apiModel.fetchAllDetails(req.body).then((result)=>{

       if(result.length==0){
            res.json({
                result: false,
                msg:'record not found',
            })
        }else{
            res.json({
                result:true,
                msg:'record get successfully',
                data:result
            }); 
        }       
    }).catch((err)=>{
       res.json({message:err.message})
    })
});

router.get('/male_list',
    body('gender').isAlpha().withMessage('gender should be alphabetic.'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }
  
    apiModel.maleDetails(req.body.male).then((result)=>{

        if(result.length==0){
            res.json({
                result: false,
                msg:'record not found',
            })
        }else{
            res.json({
                result:true,
                msg:'record get successfully',
                data:result
            });
        }        
    }).catch((err)=>{
       res.json({message:err.message})
    })
});

router.get('/female_list',
    body('gender').isAlpha().withMessage('gender should be alphabetic.'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    } 
  
    apiModel.femaleDetails(req.body.female).then((result)=>{

        if(result.length==0){
            res.json({
                result: false,
                msg:'record not found',
            })
        }else{
             res.json({
                result:true,
                msg:'record get successfully',
                data:result
            }); 
        }       
    }).catch((err)=>{
       res.json({message:err.message})
    })
});

router.get('/age_list',
    body('age').isLength({
        min:1,
        max:2
    }).withMessage('age should be no & min 1 & max 2 digit.'),(req,res,next)=>{
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    }
  
    apiModel.ageDetails(req.body.age).then((result)=>{

        if(result.length==0){
            res.json({
                result: false,
                msg:'record not found',
            })
        }else{
            res.json({
                result:true,
                msg:'record get successfully',
                data:result
            });
        }        
    }).catch((err)=>{
       res.json({message:err.message})
    })
});

router.post('/verifyOTP',
    body('val').isLength({
        min:4,
        max:4
    }).withMessage('otp must be required min & max 4 digit.'), (req, res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: false,
            errors: errors.array()
        });
    } 
  
    apiModel.verifyOTP(req.body).then((result)=>{
    
        if(result.length == 0){
        	res.json({
        		result: false,
				msg:'invalid otp & please Enter the valid otp ',
			})
		}else{
         
            req._id = result[0]._id,
            req.val = result[0].val

            if(result[0].val ==req.val ){
				res.json({
					result:true,
					msg:"user successfully verify"
				})
			}else{
             }
        }  
    }).catch((err)=>{
       res.json({message:err.message})
    })
});


module.exports = router;