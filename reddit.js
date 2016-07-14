var request = require('request');
var inquirer = require('inquirer');
var prompt = require('prompt');

var menuChoices = [{
  name: 'Show homepage',
  value: getHomepage(function(err, res) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(res);
    }
  })
}, {
  name: 'Show subreddit',
  value: 'SUBREDDIT'
}, {
  name: 'List subreddits',
  value: 'SUBREDDITS'
}];

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


function requestJson(url, callback) {
  request(url, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      try {
        var parsed = JSON.parse(res.body);
        callback(null, parsed); // This is what returns to us an object
      }
      catch (err) {
        callback(err);
      }
    }
  });
}

function getHomepage(callback) {
  var homepageUrl = 'https://www.reddit.com/.json';
  requestJson(homepageUrl, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var parsedHomepage = res.data.children;
      callback(null, parsedHomepage);
    }
  });
}

//TEST IS HERE

// getHomepage(function(err, res){
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log(res);
//   }
// });


// This function should "return" the default homepage posts as an array of objects.
// In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.

function getSortedHomepage(sortingMethod, callback) {
  requestJson('https://wwww.reddit.com/' + sortingMethod + '/.json', function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      try {
        var parsedHomepage = res.data.children;
        callback(null, parsedHomepage);
      }
      catch (err) {
        console.log(err);
      }
    }
  });
}

// function getSortedHomepage(sortingMethod, callback) {
//   // Load reddit.com/{sortingMethod}.json and call back with the array of posts
//   // Check if the sorting method is valid based on the various Reddit sorting methods
// }

// /*
// This function should "return" the posts on the front page of a subreddit as an array of objects.
// */

function getSubreddit(subreddit, callback) {
  requestJson('https://wwww.reddit.com/r' + subreddit + '/.json', function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      try {
        var parsedHomepage = res.data.children;
        callback(null, parsedHomepage);
      }
      catch (err) {
        console.log(err);
      }
    }
  });
}


//   // Load reddit.com/r/{subreddit}.json and call back with the array of posts
// }

// /*
// This function should "return" the posts on the front page of a subreddit as an array of objects.
// In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.

//https://www.reddit.com/r/Showerthoughts/?



// */
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  requestJson('https://wwww.reddit.com/r/' + subreddit + '/' + sortingMethod + '/.json', function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      try {
        var parsedHomepage = res.data.children;
        callback(null, parsedHomepage);
      }
      catch (err) {
        console.log(err);
      }
    }
  });
}

// /*
// This function should "return" all the popular subreddits
// */



function getHomepageListTitle(callback) {
  var homepageUrl = 'https://www.reddit.com/.json';
  requestJson(homepageUrl, function(err, res) {
    if (err) {
      callback(err);
      console.log(err);
    }
    else {
      try {
        var parsedHomepage5 = res.data.children.map(function(post) {

          return {
            "TITLE" : post.data.title, 
            "URL"   : post.data.url,
            "VOTES" : post.data.ups, 
            "USERNAME" : post.data.author 
            
          }

        })
        console.log(parsedHomepage5);

      }
      catch (err) {
        console.log(err);
      }

    }
  });
}



// function getHomepageListUrl(callback) {
//   var homepageUrl = 'https://www.reddit.com/.json';
//   requestJson(homepageUrl, function(err, res) {
//     if (err) {
//       callback(err);
//       console.log(err);
//     }
//     else {
//       try {
//         var parsedHomepage3 = res.data.children.map(function(post) {

//           return post.data.url;

//         })
//         console.log(parsedHomepage3);

//       }
//       catch (err) {
//         console.log(err);
//       }

//     }
//   });
// }

// getHomepageListUrl() ;


// function getHomepageListVotes(callback) {
//   var homepageUrl = 'https://www.reddit.com/.json';
//   requestJson(homepageUrl, function(err, res) {
//     if (err) {
//       callback(err);
//       console.log(err);
//     }
//     else {
//       try {
//         var parsedHomepage4 = res.data.children.map(function(post) {

//           return post.data.ups;

//         })
//         console.log(parsedHomepage4);

//       }
//       catch (err) {
//         console.log(err);
//       }

//     }
//   });
// }

//getHomepageListTitle() ;



// Export the API

module.exports = {

  requestJson: requestJson,

  getHomepage: getHomepage,

  getSortedHomepage: getSortedHomepage,

  getSubreddit: getSubreddit,

  getSortedSubreddit: getSortedSubreddit,

  getSubreddits: getSubreddits

};
