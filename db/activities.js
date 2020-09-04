const client = require('./client');

//get activities from DB:
//debugged (-:
async function getActivities(){
    try {
        const { rows: activities } = await client.query(`
            SELECT * FROM activities;
        `);

        console.log("activities==", activities);

        return activities;

    } catch (error) {
       throw error; 
    }
}

async function createActivity({ name, description }){
    try {
        const {rows: [activity]} = await client.query(`
        INSERT INTO activities(name, description) VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING;
        `, [name, description]);

        return activity;

    } catch (error) {
        console.error(error);
    }
}

async function updateActivity({ id, name, description }){
    try {
        const {rows: [activity]} = await client.query(`
        UPDATE activities
        SET name=$2, description=$3
        WHERE id=$1
        RETURNING *;
        `,[id, name, description]);

        return activity;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteActivity(activityId){
    try {
        const {rows: [activity]} = await client.query(`
        DELETE * FROM activities
        WHERE id=$1;
        `[activityId]);

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity,
}