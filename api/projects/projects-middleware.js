// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId (req, res, next) {
	try{
		const project = await Project.get(req.params.id)
		if(!project) {
			res.status(404).json({
				message: 'project not found'
			})
		} else {
			req.id = project
			next()
		}
	} catch(err) {
		res.status(500).json({
      message: 'Error'
    })
	}
}

async function validateProjectBody (req, res, next) {
	const {name, description, completed} = req.body 
	try{
		if(!name || !description || typeof completed === 'undefined') {
			res.status(400).json({message: 'missing fields'})
		} else {
			req.update = {name, description, completed}
			next()
		}
	} catch (err) {
		next(err)
	}
}

module.exports = {
	validateProjectId,
	validateProjectBody,
}