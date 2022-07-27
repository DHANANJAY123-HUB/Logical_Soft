const db = require('./connection')
const ObjectId = require('mongoose').Types.ObjectId;

function apiModel() {
	this.registerUser=(userDetails)=>{
		console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('user').find().toArray((err,result)=>{
				if(err)
					reject(err)
				else
				{
					var user_id
					var val = Math.floor(1000 + Math.random() * 9000);
					var flag=0

					if(result.length==0)
						user_id=1
					else
					{   
					
						var max_id=result[0].user_id

						for(let row of result)
						{

						 if(row._id>max_id)
						 	max_id=row.user_id
						
						 if(row.mobile_no==userDetails.mobile_no)
						 	flag=1							 	
						 	
						}
						_id=max_id+1  	
					}
					
					//userDetails.user_id=user_id
					userDetails.form_status=0
					userDetails.role="user"
					userDetails.info=Date()
					userDetails.val=val

					if(flag)
					{
						resolve(0)
					}
					else
					{
						db.collection('user').insertOne(userDetails,(err1,result1)=>{
						err1 ? reject(err1) : resolve(1);
					 	})	
					}
				}	
			})
			
		})	
	}

	/*this.uploadimage=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').insertOne(userDetails,(err,result)=>{
				err ? reject(err) :resolve(result)
			})
		})
	}*/

	this.userLogin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'mobile_no':userDetails.mobile_no,'password':userDetails.password}).toArray((err,result)=>{
				err ? reject(err) :resolve(result)
			})
		})
	}

	this.updateGender=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{

			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'gender':userDetails.gender,'form_status':2}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);

			})
		}
		   resolve(result)

		 })
		})				
	}

	this.updatefullName=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'name':userDetails.name,'form_status':3}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		  resolve(result)
		})
		})				
	}

	this.updateDob=(userDetails)=>{
        
    var dob = userDetails.date_of_birth;
    var year = Number(dob.substr(0, 4));
    var month = Number(dob.substr(4, 2)) - 1;
    var day = Number(dob.substr(6, 2));
    var today = new Date();
    var yy = today.getFullYear() - year;
    var mm = today.getMonth()-month;
    var dd = today.getDate()-day;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      yy--;
      mm--;
      dd--;
    }
    return new Promise((resolve,reject)=>{
      db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'date_of_birth':dob,'age':yy,'form_status':5}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		   resolve(result)
		})	
		})			
	}

	this.updateEmail=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
      db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'email':userDetails.email,'form_status':6}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		     resolve(result)
		})
		})				
	}

	this.updatePassword=(userDetails)=>{
		return new Promise((resolve,reject)=>{
				db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'password':userDetails.password,'form_status':7}},(err1,result1)=>{
				err ? reject(err1) : resolve(result1);
			})
		}
		resolve(result)
		})
		})

	}

	this.fetchDetails=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.fetchAllDetails=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'id':userDetails.id}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.verifyOTP=(userDetails)=>{
		console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id),'val':userDetails.val}).toArray((err,result)=>{
				//err ? reject(err) : resolve(result);
				if(err){
					reject(err)
				}
				else
				{
                    var form_status = result[form_status];
					var max_status=0;
					for(let row of result)
						{
						   if(row.form_status<max_status)
						   max_status=row.form_status
						}
					form_status=max_status+1
					userDetails.form_status = form_status;
					db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'form_status':userDetails.form_status}},(err1,result1)=>{
				       err ? reject(err1) : resolve(result1);
			        })

			    }
                resolve(result);
			    
			})
		})	
	}

	this.maleDetails=(male)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'gender':'male'}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.femaleDetails=(female)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'gender':'female'}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.ageDetails=(age)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'age':age}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}



}

module.exports=new apiModel()