const express = require('express');
const routinesRouter = express.Router();
const { getRoutines, getPublicRoutines, getRoutinesByUser,
        getPublicRoutinesByUser, createRoutine, updateRoutine,
        deleteRoutine, addRoutineActivity, getRoutineById } = require('../db');

// GET /routines:
routinesRouter.get('/', async (req, res, next) =>{
    try {
        const routines = await getPublicRoutines();
        res.send(routines);
    } catch (error) {
        next(error);
    }
});

// POST /routines:
routinesRouter.post('/', async (req, res, next) =>{
    try {
        const { name, goal } = req.body;
        const newRoutine = await createRoutine({
            creatorId: req.user.id,
            name, goal,
            public: req.body.public
        });

        res.send(newRoutine);

    } catch (error) {
        next(error);
    }
});

// PATCH /routines:
routinesRouter.patch('/:routineId', async ( req, res, next) =>{
    try {
        const { name, goal, public } = req.body;
        const updatedRoutine = await updateRoutine({
            id: req.params.routineId,
            public, name, goal
        });

        res.send(updatedRoutine);

    } catch (error) {
        next(error);
    }
});

// DELETE /routines:
routinesRouter.delete('/:routineId', async ( req, res, next) =>{
    try {
        const routineToDelete = await getRoutineById(req.params.routineId);
        // if(!routineToDelete){
        //     res.send({
        //         message: "Routine doesn't exist."
        //     });
        // }
        if (req.user.id === routineToDelete.creatorId){
            await deleteRoutine(req.params.routineId);
            res.send({
                name: "Delete Success"
            });
        }else {
            res.send({
                name: "Error Unauthorized",
                message: "You did not create this routine.."
            });
        }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST /routines/routine:id/activities

routinesRouter.post('/:routineId/activities', async (req, res, next) =>{
    try {
        const { activityId, count, duration } = req.body;
        const newRoutineActivity = await addRoutineActivity({
            routineId: req.params.routineId,
            activityId, count, duration
        });
        res.send(newRoutineActivity);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = routinesRouter;