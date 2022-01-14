// Write your "projects" router here!
const express = require('express')
const {
	validateProjectId,
	validateProjectBody,
} = require('./projects-middleware')
const Project = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
	Project.get()
		.then(pros => {
			res.status(200).json(pros)
		})
		.catch(err => {
			next(err)
		})
})

router.get('/:id', validateProjectId, (req, res, next) => {
	Project.get(req.params.id)
		.then(pros => {
			res.status(200).json(pros)
		})
		.catch(err => {
			next(err)
		})
})

router.post('/', validateProjectBody, (req, res, next) => {
	Project.insert(req.update)
		.then(pros => {
			res.status(200).json(pros)
		})
		.catch(err => {
			next(err)
		})
})

router.put('/:id', validateProjectId, validateProjectBody, (req, res, next) => {
	Project.update(req.params.id, req.update)
		.then(pros => {
			res.status(200).json(pros)
		})
		.catch(err => {
			next(err)
		})
})

router.delete('/:id', validateProjectId, (req, res, next) => {
	Project.remove(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'successfully deleted' })
		})
		.catch(err => {
			next(err)
		})
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
	Project.getProjectActions(req.params.id)
		.then(pros => {
			res.status(200).json(pros)
		})
		.catch(err => {
			next(err)
		})
})

module.exports = router;
