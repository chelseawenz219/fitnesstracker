const express = require('express');
const routineActivitiesRouter = express.Router();
const { updateRoutineActivity, deleteRoutineActivity } = require('../db');

//PATCH /routine_activities:

routineActivitiesRouter.patch('/:routineActivityId', async ( req, res, next ) =>{
    try {
        const { id, count, duration } = req.body;
        console.log(req.params.routineActivityId);
        const updatedRoutineActivity = await updateRoutineActivity(id, count, duration);

        res.send(updatedRoutineActivity);

    } catch (error) {
        next(error);
    }
});

//DELETE /routine_activities:

routineActivitiesRouter.delete('/:routineActivityId', async ( req, res, next )=>{
    try {
        const {id} = req.body;
        const deleteRA = await deleteRoutineActivity(id);

        res.send(deleteRA);

    } catch (error) {
        next(error);
    }
});

module.exports = routineActivitiesRouter;