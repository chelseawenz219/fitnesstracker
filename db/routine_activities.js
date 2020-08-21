const client = require('./client');

//POST routine activity: (in api/routines.js);
async function addRoutineActivity({ routineId, activityId, count, duration }){
    try {
        const {rows: [routine_activity]} = await client.query(`
        INSERT INTO routine_activities("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4);
        `,[routineId, activityId, count, duration]);

        return routine_activity;

    } catch (error) {
        throw error;
    }
}

//PATCH routine activity:
async function updateRoutineActivity( id, count, duration ){
    try {
        const {rows: [routine_activity]} = await client.query(`
        UPDATE routine_activities
        SET count=$2,
        duration=$3
        WHERE id=$1;
        `, [id, count, duration]);

        // console.log(routine_activity);

        return routine_activity;

    } catch (error) {
        throw error;
    }
}

//DELETE routine activity:
async function deleteRoutineActivity({ id }){
    try {
        const {rows: [routine_activity]} = await client.query(`
        DELETE FROM routine_activities
        WHERE id = $1;
        `, [id]);

        return routine_activity;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    addRoutineActivity,
    updateRoutineActivity,
    deleteRoutineActivity,
}