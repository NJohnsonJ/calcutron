import React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Database, Calculation } from "../api/database";
import firebase from "firebase";
import moment from "moment";

const Results: React.FC<{database: Database}> = ({database}) => {

    const [results, setResults] = useState<Calculation[]>([]);

    useEffect(() => {

        function handleData(data: firebase.database.DataSnapshot) {
            const json = data.toJSON();
            if (json !== null)
                updateResults(json as Calculation);
        }

        database.listen(handleData);

    }, [database]);

    function updateResults(newResult: Calculation) {
        setResults(prevState => {
            return [...prevState, newResult];
        });
    }


    function prettifyDate(date: string) {
        return moment(date).format("h:mm:ss a");
    }

    return (
        <div>
            <h2>Results</h2>
            {results.map(result => (
                <Card>
                    <CardContent>
                        <Typography>{result.user} at {prettifyDate(result.time)}:</Typography>
                        <Typography>{result.input} = {result.result}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Results;
