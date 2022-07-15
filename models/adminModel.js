const db = require('./connection')
const ObjectId = require('mongoose').Types.ObjectId;

function adminModel() {

    this.fetchDetails=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('admin').find({'id':userDetails.id}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}

	this.viewDetails=(query)=>{
		console.log(query)
		return new Promise((resolve,reject)=>{
			db.collection('admin').find({'id':ObjectId(query)}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
				console.log(err)
				console.log(result)
			})
		})
	}

}
module.exports=new adminModel()