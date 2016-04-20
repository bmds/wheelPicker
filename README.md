# wheelPicker
This is what we use in our Frontend meetups. It will choose the next person to do a talk in the next meeting.


## Installation

- Run `npm install`
- Run `gulp`
- Run `node website.js`

## Tasks

 - `gulp` - default task
 - `gulp build` - adds all the files into the build folder

### Sub Tasks

- `gulp css` - deals with your stylesheets
- `gulp scripts` - deals with your javascript files
- `gulp copy:fonts` - moves fonts over to client folder
- `gulp copy:html` - moves the html file over to the build folder

## Version 0.2.0

- Converted to use gulp
- Runs a node server for the static file
- Restructure folders to the statndard way
- created a build task
- Removed any wasteful files

## Improvements

- Sass Refactor
- Use Roboto from Google library instead of downloading multiple assets
