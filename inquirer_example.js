var request = require('request');
var prompt = require('prompt');
var inquirer = require('inquirer');
var colors = require('colors');
var redditFunctions = require('./Library/NewReddit.js');
var getHomepage = redditFunctions.getHomepage;
var getSubreddit = redditFunctions.getSubreddit;
var getSortedHomepage = redditFunctions.getSortedHomepage;
var getSubreddits = redditFunctions.getSubreddits;
var getSortedSubreddit = redditFunctions.getSortedSubreddit;
var imageToAscii = require("image-to-ascii");

var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];


function mainMenu() {
  inquirer.prompt({
    
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: menuChoices
    
  }).then(
    function(answers) {
      var choice = answers.menu;
      if (choice === 'HOMEPAGE') {
        getHomepage(function(err, res) {
          if (err) {
            console.log(err);
            
          }
          else {
            var finalHomePage = res.map(function (ele) {
              return {
                
                name : ele.data.title,
                
                value : {
                "Link" :  ele.data.url, 
                "Upvotes" : ele.data.ups,
                "User" : ele.data.author
                }
              };
            });
            
                   inquirer.prompt({
                                   type: 'list',
                                    name: 'homePagePosts',
                                    message: 'Pick a Post',
                                  choices: finalHomePage}).then(function(postChoice) {
                                
                                  var finalPostsURLi = postChoice.homePagePosts.Link;
                                   
                                  if (finalPostsURLi.indexOf('.jpg') > -1
                                    || finalPostsURLi.indexOf('.png') > -1
                                    || finalPostsURLi.indexOf('.gif') > -1) { 
                                      
                                                console.log(imageToAscii(finalPostsURLi,(err, converted) =>{
                                                    console.log(err || converted);
                                                            mainMenu(); 
                                                } ));
                                      
                                                                      }
                                                              
                                                  else {
                                                        console.log(finalPostsURLi);
                                                                mainMenu(); 
                                                        }
                                   
                                     });
            // finalHomePage.forEach(function(ele){
            //   console.log('\n');
            //   console.log('TITLE: ' + ele.Title.red);
            //   console.log('URL: ' + ele.Link.underline.blue);
            //   console.log('VOTES: ' + (ele.Upvotes).toString().green.bold);
            //   console.log('USERNAME: ' + ele.User.yellow);
            //   console.log('\n');   
            // });
           
            
          }
   
        });
        
      
        
      }
      else if (choice === 'SUBREDDIT') {
        inquirer.prompt( 
                    { type : 'input', 
                    name: 'enterSubreddit',
                    message: "Type in a Subreddit",
                    
                    
                    }).then( function(answers) {
         
            getSubreddit(answers.enterSubreddit, function(err, res) { 
              
                if (err) {
                  console.log(err);
                  
                }
                else {
                  var theSubredditi = res.map(function (ele) {
                    return {
                      
                      name : ele.data.title,
                      
                      value : {
                      "title" : ele.data.title, 
                      "url" :  ele.data.url,
                      "upvotes" : ele.data.ups,
                      "user" : ele.data.author
                      }
                      
                    };
                  });

                  inquirer.prompt({
                                    type: 'list',
                                    name: 'posts',
                                    message: 'Pick a Post',
                                  choices: theSubredditi}) .then(function(postChoice) {
                                
                                  var finalURLu = postChoice.posts.url;
                                   
                                  if (finalURLu.indexOf('.jpg') > -1
                                    || finalURLu.indexOf('.png') > -1
                                    || finalURLu.indexOf('.gif') > -1) { 
                                      
                                                console.log(imageToAscii(finalURLu,(err, converted) =>{
                                                    console.log(err || converted);
                                                     mainMenu();
                                                } ));
                                      
                                                                      }
                                                              
                                                  else {
                                                        console.log(finalURLu);
                                                         mainMenu();
                                                        }
                                   
                                });
                }
            
            });
          
          
          
        });
        
      }
      
      
      else if (choice === 'SUBREDDITS') {
             getSubreddits(function(err, res) {
               if (err) {
                 console.log(err);
                 
               }
               else {
                 var listSubreddits = res.map(function(post1){
                   return {
                     name: post1.data.title,
                     value: post1.data.display_name
                     
                   };
                   
                 });
  
              inquirer.prompt({
                 type: 'list',
                 name: 'top25',
                 choices: listSubreddits,
                 message: 'Choose a subreddit'
             }).then(
                 function(theChoice) {
                     var subredditPosts = theChoice.top25;
                     getSubreddit(subredditPosts, function(err, res) {
                         
                         if (err) {
                             console.log(err);
                         }
                         else {
                              var theSubredditEdited = res.map(function (ele) {
                                return {
                                  
                                  name : ele.data.title,
                                  
                                  value :{
                                  
                                  "Link" :  ele.data.url, 
                                  "Upvotes" : ele.data.ups,
                                  "User" : ele.data.author
                                  }
                                };
                              });
                            
                  inquirer.prompt({
                                    type: 'list',
                                    name: 'redditposts',
                                    message: 'Pick a Post',
                                  choices: theSubredditEdited,}) .then(function(postChoice) {
                                
                                  var finalPostsURL = postChoice.redditposts.Link;
                                   
                                  if (finalPostsURL.indexOf('.jpg') > -1
                                    || finalPostsURL.indexOf('.png') > -1
                                    || finalPostsURL.indexOf('.gif') > -1) { 
                                      
                                                console.log(imageToAscii(finalPostsURL,(err, converted) =>{
                                                    console.log(err || converted);
                                                     mainMenu();
                                                } ));
                                      
                                                                      }
                                                              
                                                  else {
                                                        console.log(finalPostsURL);
                                                         mainMenu();
                                                        }
                                   
                                });
                              // theSubredditEdited.forEach(function(ele){
                                
                              //   console.log('\n');
                              //   console.log('TITLE: ' + ele.Title.red);
                              //   console.log('URL: ' + ele.Link.underline.blue);
                              //   console.log('VOTES: ' + (ele.Upvotes).toString().green.bold);
                              //   console.log('USERNAME: ' + ele.User.yellow);
                              //   console.log('\n');
                                
                              // });
                           
                         }
                       
                     });
                   
                 });
                 
               }
               
          });
      }
  });
}
  
mainMenu();



// imageToAscii("http://beta.ltgov.bc.ca/lg/honours-awards/heraldry/shields/images/shields-lg/QueenElizabethll1959-lg.jpg", (err, converted) => {
//     console.log(err || converted);
// });

   // theSubreddit.forEach(function(ele){
                  //   console.log('\n');
                  //   console.log('TITLE: ' + ele.Title.red);
                  //   console.log('URL: ' + ele.Link.underline.blue);
                  //   console.log('VOTES: ' + (ele.Upvotes).toString().green.bold);
                  //   console.log('USERNAME: ' + ele.User.yellow);
                  //   console.log('\n');
                  // })
  
            
            