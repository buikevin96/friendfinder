var friends = require("../app/data/friends")

module.exports = function(app) {

  //A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // A POST routes /api/friends. This will be used to handle incoming survey results. 
  // This route will also be used to handle the compatibility logic.
  app.post("/api/friends", function(req, res) {
    
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    console.log(req.body);

    // Here we take the result of the user's survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;

    console.log(userScores);

    // This variable will calculate the difference between the user's scores and the scores
    // of each user in the database
    var totalDifference = 0;

    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++){

      console.log(friends[i]);
      totalDifference = 0;

      // We then loop through all the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++){

        // We calculate the difference between the scores and the sum them into the totalDifference
        // Math.abs makes it absolute value
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less than the difference of the current "best match"
        // If they have less of a difference 
        if (totalDifference <= bestMatch.friendDifference) {

          // Reset the bestMatch to be the new friend.
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    // Save the user's data to the database (this has to happen AFTER the check. otherwise,
    // The database will always return that the user is the user's best friend).
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMath);
  });
}