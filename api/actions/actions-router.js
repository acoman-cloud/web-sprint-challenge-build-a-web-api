// Write your "actions" router here!
const express = require('express')
const {
	validateActionId,
	validateActionBody,
} = require('./actions-middlware')
const Action = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
	Action.get()
		.then(act => {
			res.status(200).json(act)
		})
		.catch(err => {
			next(err)
		})
})

router.get('/:id', validateActionId, (req, res, next) => {
	Action.get(req.params.id)
		.then(act => {
			res.status(200).json(act)
		})
		.catch(err => {
			next(err)
		})
})

router.post('/', validateActionBody, (req, res, next) => {
	Action.insert(req.update)
		.then(act => {
			res.status(200).json(act)
		})
		.catch(err => {
			next(err)
		})
})

router.put('/:id', validateActionId, validateActionBody, (req, res, next) => {
	Action.update(req.params.id, req.update)
		.then(act => {
			res.status(200).json(act)
		})
		.catch(err => {
			next(err)
		})
})

router.delete('/:id', validateActionId, (req, res, next) => {
	Action.remove(req.params.id)
		.then(() => {
			res.status(200).json('deleted successfully')
		})
		.catch(err => {
			next(err)
		})
})

module.exports = router;