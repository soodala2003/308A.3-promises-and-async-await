// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData1(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3,
    };
}

//Use Promise.all on all of those promises 
/* Promise.all(promiseArr).then(responseArr => {
    const userData = {}; //console.log(responseArr));
    
    for (let i = 0; i < responseArr.length; i++) {
        userData[keyTracker[i]] = responseArr[i];
        //
    }

    console.log(userData);
}); */
  // Now we have a lookup for the keys (keyTracker) that will allow us to 
  // set the movieData correctly.
  /* keyTracker.forEach((key, idx) => {
    movieData[key] = promiseArr[idx];
  }); */

async function getData(id) {
    const userData = {};
    const promiseArr = [];  //create an empty object to assign promises to keys
    const keyTracker = [];  
    const dataBase = await central(id);
    let userInfo = {};
    const userInfo2 = await vault(id);

    // store promise into relevant key
    for (const k in userInfo2) {
        promiseArr.push(userInfo2[k]);
        keyTracker.push(k);
    }

    if (dataBase === "db1") {
        userInfo = await db1(id);
        //userData.username = userInfo.username;
        //console.log(userData);
    } else if (dataBase === "db2") {
        userInfo = await db2(id);
        //userData.username = userInfo.username;
        //console.log(returnedValue);
    } else if (dataBase === "db3") {
        userInfo = await db3(id);
        //userData.username = userInfo.username;
        //console.log(returnedValue);
    } 

    for (const k in userInfo) {
        // Track the order of the promises by saving the key in our keyTracker
        promiseArr.push(userInfo[k]);
        keyTracker.push(k);
    } 

    //Use Promise.all on all of those promises 
    Promise.all(promiseArr).then(responseArr => {
        const userData = {}; //console.log(responseArr));
        userData.id = id;
    
        for (let i = 0; i < responseArr.length; i++) {
            userData[keyTracker[i]] = responseArr[i];
        }

        console.log(userData);
    });
}

// testing
for (let i = 1; i <= 10; i++) {
    getData(i);
}

getData(15);
getData("str");
getData(true);

