# wheelPicker
This is what we use in our Frontend meetups. It will choose the next person to do a talk in the next meeting.

## Installation

- Run `npm install`
- Run `gulp`

## Tasks

 - `gulp` - default task
 - `gulp build` - adds all the files into the build folder
 - `gulp deploy` - adds everything into build and then pushes to surge

### Sub Tasks

- `gulp css` - deals with your stylesheets
- `gulp scripts` - deals with your javascript files
- `gulp copy:fonts` - moves fonts over to client folder
- `gulp copy:html` - moves the html file over to the build folder

## Version 3.0.0

- re-written the code in vanilla JS
- Replace node-static with Express

## Version 2.1.0

- Converted to use gulp
- Runs node server to serve static files
- Restructure folders to the statndard way
- created a build task
- Removed any wasteful files

## Improvements to do

- Sass Refactor
- Use Roboto from Google library instead of downloading multiple assets


## Notes

To be able to push to surge you need to be invited by someone who already has access to the project.
