// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId (req, res, next) {
	try{
		const actions = await Action.get(req.params.id)
		if(!actions) {
			res.status(404).json({
				message: 'action not found'
			})
		} else {
			req.id = actions
			next()
		}
	} catch(err) {
		res.status(500).json({
      message: 'Error'
    })
	}
}

async function validateActionBody (req, res, next) {
	const {project_id, description, notes, completed} = req.body 
	try{
		if(!project_id || !description || !notes) {
			res.status(400).json({message: 'missing fields'})
		} else {
			req.update = {project_id, description, notes, completed}
			next()
		}
	} catch (err) {
		next(err)
	}
}

module.exports = {
	validateActionId,
	validateActionBody,
}