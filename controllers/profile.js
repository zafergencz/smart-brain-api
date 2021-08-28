const handleProfile = (req,res,db) => {
	const { id } = req.params;

	db.select('*').from('users').where({id})
		.then(user => {
			if(user.length){
				res.json(user[0]);	
			}
			else{
				return res.status(404).json('not found'); 
			}
			
		})
		.catch(err => res.status(400).json('Error Getting User'));
}

module.exports = {
	handleProfile
}