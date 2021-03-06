# joinassembly-task
<h2><b>Installation Steps:<b></h3>
<h3>
1. Clone the Repo. <br>
2. Open the project folder and run the below command to install the required modules: <br>
  <i>npm install</i><br>
3.Run the server.js file with below command:<br>
<i>node server.js</i><br>
</h3>
<h4>---By default it will run on port 3010, in case of any issue (like port already in use), open the ".env" file and edit the PORT value with any other available port and re-run the above command </h4><br>
<h3>
4.Open the browser and make the hit to the API. (replace the 3010 with the correct port if value of port number is changed) <br>
<i>http://localhost:3010/api/visitors?date=1404198000000&museum=avila_adobe</i>
</h3>
<h2><b>Testing Steps:</h2></b>
<h3>
1. If server.js file is still running after step 4, close it.<br>
2. Run the below command for the test coverage:<br>
<i>jest --coverage</i><br>
</h3>
