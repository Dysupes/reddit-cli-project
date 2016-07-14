var inquirer = require('inquirer');
const imageToAscii = require("image-to-ascii");

var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];

inquirer.prompt({
  type: 'list',
  name: 'menu',
  message: 'What do you want to do?',
  choices: menuChoices
}).then(
  function(answers) {
    console.log(answers);
  }
);



imageToAscii("https://octodex.github.com/images/octofez.png", (err, converted) => {
    console.log(err || converted);
});