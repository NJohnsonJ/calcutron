import firebaseConfig from "../config/firebaseConfig";
import * as firebase from "firebase/app";

const endpoint = "/calculations"

const limit = 10;

export interface Calculation {
    user: string;
    time: any;
    input: string;
    result: string;
}

export interface Database {
    save: (calculation: Calculation) => void;
    listen: (callback: dataCallback) => void;
}

export type dataCallback = (data: firebase.database.DataSnapshot, b?: string | null) => any;

export function setupDatabase(): Database {
    const db = initialize();
    return {
        save: (calculation: Calculation) => db.ref(endpoint).push(calculation),
        listen: (callback: dataCallback) => db.ref(endpoint)
            .orderByChild("time")
            .limitToLast(limit)
            .on("child_added", callback)
    }
}

function initialize(): firebase.database.Database {
    console.log("Connecting to firebase...")
    firebase.initializeApp(firebaseConfig);
    console.log("Connected.")
    return firebase.database();
}
