//import everything DB needs::
const { createUser, createActivity, createRoutine, addRoutineActivity, updateRoutine } = require('./');

const client = require('./client');
//client, functions

//drop tables
async function dropTables(){
    try{
        console.log("Starting dropTables..");
        await client.query(`
        DROP TABLE IF EXISTS routine_activities;
        DROP TABLE IF EXISTS routines;
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS users;
        `);
        console.log("Finished dropTables.");
    }catch (error){
        console.error("Error @dropTables!!!")
        throw error;
    }
   
}

//create tables
async function createTables() {
    try {
      console.log("Starting to build tables...");
  
      await  client.query(`
        CREATE TABLE users(
          id  SERIAL PRIMARY KEY, 
          username VARCHAR(255) UNIQUE NOT NULL, 
          password VARCHAR(255) NOT NULL
        );
      `)
  
      await  client.query(`
        CREATE TABLE activities(
          id SERIAL PRIMARY KEY, 
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT NOT NULL
        );
      `)
      await  client.query(`
        CREATE TABLE routines(
          id SERIAL PRIMARY KEY, 
          "creatorId" INTEGER REFERENCES users(id),
          public BOOLEAN DEFAULT false,
          name VARCHAR(255) UNIQUE NOT NULL,
          goal TEXT NOT NULL
        );
      `)
      await  client.query(`
        CREATE TABLE routine_activities(
          id SERIAL PRIMARY KEY, 
          "routineId" INTEGER REFERENCES routines(id),
          "activityId" INTEGER REFERENCES activities(id),
          duration INTEGER,
          count INTEGER,
          UNIQUE ("routineId", "activityId")
          );
      `)
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }

//create initial users/activities/stuff (dummy data?);
async function createInitialUsers(){
    try {
        await createUser({
            username: 'chelsbean219',
            password: 'benben2020'
        });
        await createUser({
            username: 'cassiek04',
            password: 'wenkel44'
        });
        await createUser({
            username: 'exerciseislyfe223',
            password: 'fatbrun0'
        });
    } catch (error) {
        console.error("Error Creating Users!");
        throw error;
    }
}

async function createInitialActivities(){
    try {
        await createActivity({
            name: 'Jumping Jacks',
            description: "throw your arms n' legs in a circle"
        });
        await createActivity({
            name: 'Crunches',
            description: "arms behind ya head, suck in that GUT"
        });
        await createActivity({
            name: 'Lunges',
            description: "the vertical squat."
        });
    } catch (error) {
        console.error("Error creating activities!!")
        throw error;
    }
}

async function createInitialRoutines(){
    try {
        await createRoutine({
            creatorId: 1,
            public: false,
            name: 'moderate BURN',
            goal: 'lose 30lbs'
        });
        await createRoutine({
            creatorId: 2,
            public: true,
            name: 'yoga',
            goal: 'mindful toning'
        });
        await createRoutine({
            creatorId: 3,
            public: true,
            name: 'major BURN',
            goal: 'lose 58lbs'
        })
    } catch (error) {
        console.error("Error creating routines!");
        throw error;
    }
} 

//create routine_activities:
async function createInitialRoutineActivities(){
    try {
        await addRoutineActivity({
            routineId: 3,
            activityId: 2,
            count: 8,
            duration: 50
        });
        await addRoutineActivity({
            routineId: 1,
            activityId: 3,
            count: 5,
            duration: 90
        });
        await addRoutineActivity({
            routineId: 2,
            activityId: 1,
            count: 10,
            duration: 100
        });
    } catch (error) {
        throw error;
    }
}

//rebuildDB call all functions drop/create/create
async function rebuildDB(){
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialActivities();
        await createInitialRoutines();
        await createInitialRoutineActivities();
    } catch (error) {
        throw error;
    }
}

async function testDB(){
    try {
        console.log("Calling Tests...");
        const result = await updateRoutine({
            id: 2,
            public: false,
            name: "new fkn name",
            goal: "gotta finish this proj"
        });
        console.log("TEST:", result);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

rebuildDB()
.then(testDB)
.finally(()=>{
    client.end();
});

