import firebaseConfig from "../config/firebaseConfig";
import firebase from "firebase";

const endpoint = "/calculations"

export interface Calculation {
    user: string;
    time: Date;
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
        save: (calculation: Calculation) => {
            console.log("Saving")
            console.log(calculation)
            const res = db.ref(endpoint).push(calculation)
            console.log(res.root);
        },
        listen: (callback: dataCallback) => db.ref(endpoint).on("child_added", callback)
    }
}

function initialize(): firebase.database.Database {
    console.log("Connecting to firebase...")
    firebase.initializeApp(firebaseConfig);
    console.log("Connected.")
    return firebase.database();
}
