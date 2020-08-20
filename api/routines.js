const express = require('express');
const router = express.router();
const { getRoutines, getPublicRoutines, getRoutinesByUser,
        getPublicRoutinesByUser, createRoutine, updateRoutine,
        deleteRoutine, addRoutineActivity } = require('.../db');

// GET /routines:
router.get('/', async (req, res, next) =>{
    try {
        const routines = await getPublicRoutines();
        res.send(routines);
    } catch (error) {
        throw error;
    }
});

// POST /routines:
router.post('/', async (req, res, next) =>{
    try {
        const { name, goal } = req.body;
        const newRoutine = await createRoutine({
            creatorId: req.user.id,
            name, goal,
            public: req.body.public
        });

        res.send(newRoutine);

    } catch (error) {
        console.log(error);
        throw error;
    }
});

// PATCH /routines:
router.patch('/:routineId', async ( req, res, next) =>{
    try {
        const { name, goal, public } = req.body;
        const updatedRoutine = await updateRoutine({
            id: req.params.routineId,
            public, name, goal
        });

        res.send(updatedRoutine);

    } catch (error) {
        console.log(error);
        next(error);
        //^^^ is this proper syntax? for the next argument?
    }
});

// DELETE /routines:
router.delete('/:routineId', async ( req, res, next) =>{
    try {
        const userRoutines = await getRoutinesByUser(req.user.username);
        //I see I do need the get routine by Id in here as well.
        //project is too late for me to go back, but, this is what I would do
        //if it existed:
        const routineToDelete = await getRoutineById(req.params.routineId);
        if(userRoutines.includes(routineToDelete)){
            const deletedRoutine = await deleteRoutine(routineToDelete);
            res.send(deletedRoutine);
            //can I use array methods?
        }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST /routines/routine:id/activities

router.post('/:routineId/activities', async (req, res, next) =>{
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

module.exports = router;