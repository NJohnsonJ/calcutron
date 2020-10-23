# CALCUTRON 

`COWER BEFORE THE MIGHTY CALCUTRON, THE WORLD'S SMARTEST CALCULATOR.`

Calcutron is a basic web app that parses mathematical input and evalutes the expression. The results are shared across sessions and appear in realtime.
<a href="https://sezzle-calcutron.web.app/">Try it out.</a>

## Stack

This app is built using **React** and **TypeScript** alongside a **firebase** realtime database. Firebase was selected because it has a neat api for listening to updates and is free to use. The app is deployed with **firebase** hosting at https://sezzle-calcutron.web.app.

## Development

You can run this app in a local development server with **Node** and **Yarn** (or **npm**).
Navigate to the directory containing the project's code and run `yarn start` to launch a development server at strong>a href="localhost:3000">localhost:3000</a>.

## Deployment

This app is hosted with firebase hosting. To deploy the app, build the project with `yarn build`. Then send the files to firebase with the firebase cli: `firebase deploy`.

## Limitations

There is one main weakness to this app that must be acknowledged. 

### eval

The app uses `eval` to parse and evaluate an input string as a mathematical formula. Generally, it is a bad idea and unsafe to call `eval` on arbitrary strings provided by users. This could be addressed by creating string tokenizer, parser and evaluater. However, that goes beyond the scope of this app. 

## Future Improvements

* Replace `eval` with a string parser/tokenizer/evaluator.
* It would be cool if an update triggered an animation where the cards shift down and the new calculation fades in.
* Add a button to load older results.
* Create a calculator component with buttons for numbers and operations to replace the text input element.