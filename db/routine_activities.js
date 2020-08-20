const client = require('./client');

//add routine activity:
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

//update routine activity:
async function updateRoutineActivity({ id, count, duration }){
    try {
        const {rows: [routine_activity]} = await client.query(`
        UPDATE routine_activities
        SET count=$2
        SET duration=$3
        WHERE id=$1;
        `, [id, count, duration]);

        return routine_activity;

    } catch (error) {
        throw error;
    }
}

//delete routine activity:
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