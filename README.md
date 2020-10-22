# CALCUTRON 

> COWER BEFORE THE MIGHTY CALCUTRON.

Calcutron is a basic web app that parses mathematical input and evalutes the expression. The results are persisted in firbase realtime database.

## Stack

This app is built using <strong>React</strong> and <strong>TypeScript</strong> alongside a <strong>firebase </strong> realtime database. Firebase was selected because it has a neat api for listening to updates and is free to use. 

## Development

This app can be run with Node and Yarn (or npm).
Navigate to the directory containing the projects code and run `yarn start` to launch a development server at <a href="localhost:3000">localhost:3000</a>.
## Limitations

There is one main weakness to this app that must be acknowledged. 

### eval

The app uses `eval` to parse and evaluate an input string as a mathematical formula. Generally, it is a bad idea and unsage to call `eval` on arbitrary strings provided by users. This could be addressed by developing a string tokenizer, parser and evaluater. However, that goes beyond the scope of this app. 
