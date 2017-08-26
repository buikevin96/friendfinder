// A default, catch-all route that leads to home.html which displays the home page.

// A GET Route to /survey which should display the survey page.
app.get("/survey", function(req, res) {

//Update information in here

  // If the main route is hit, then we initiate a SQL query to grab all records.
  // All of the resulting records are stored in the variable "result."
  connection.query("SELECT * FROM actors where attitude = ?", [req.params.att], function(err, result) {

    // We then begin building out HTML elements for the page.
    var html = "<h1> Actors with an attitude of " + req.params.att + "</h1>";

    // Here we begin an unordered list.
    html += "<ul>";

    // We then use the retrieved records from the database to populate our HTML file.
    for (var i = 0; i < result.length; i++) {
      html += "<li><p> ID: " + result[i].id + "</p>";
      html += "<p>Name: " + result[i].name + " </p></li>";
      html += "<p>Coolness Points: " + result[i].coolness_points + "<p>";
      html += "<p>Attitude: " + result[i].attitude + "<p>";
    }

    // We close our unordered list.
    html += "</ul>";

    // Finally we send the user the HTML file we dynamically created.
    res.send(html);
  });
});