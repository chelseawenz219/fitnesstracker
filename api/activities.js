const express = require('express');
const activitiesRouter = express.Router();
const { getActivities, createActivity, updateActivity } = require('../db');

//GET /activities:
activitiesRouter.get('/', async (req, res, next) =>{
    try {
        const activities = await getActivities();

        res.send(activities);

    } catch (error) {
        next(error);
    }
});

//POST /activities:
activitiesRouter.post('/', async (req, res, next) =>{
    try {
        
        const { name, description } = req.body;
        const newActivity = await createActivity({ name, description });

        res.send(newActivity);
    } catch (error) {
        next(error);
    }
});

//PATCH /activities:
activitiesRouter.patch('/:activityId', async (req, res, next) =>{
    try{
        const { name, description } = req.body;
        const updatedActivity = await updateActivity({
            id: req.params.activityId,
            name, description
        });
        res.send(updatedActivity);
    }catch (error){
        next(error);
    }
});

module.exports = activitiesRouter;