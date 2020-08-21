const express = require('express');
const routineActivitiesRouter = express.Router();
const { updateRoutineActivity, deleteRoutineActivity } = require('../db');

//PATCH /routine_activities:

// routineActivitiesRouter.patch('/:routineActivityId', async ( req, res, next ) =>{
//     try {
//         const { count, duration } = req.body;
        
//     } catch (error) {
//         console.error(error);
//     }
// })