const express = require("express");
const axios = require("axios");
const moment = require("moment");
require("dotenv").config();

const app = express();

//backend call function
async function backendCall(monthInput, museumInput) {
  try {
    //try-catch to handle any issue while calling the backend API
    const response = await axios.get(
      process.env.backend_URL + "?month=" + monthInput + "T00:00:00.000"
    );
    try {
      //try-catch to handle blank response
      return response.data[0][museumInput];
    } catch (error) {
      return [];
    }
  } catch (error) {
    return error.response.data;
  }
}

//app.get call
app.get("/api/visitors", (req, res) => {
  let dateInMilliSeconds = req.query.date;
  let museumInput = req.query.museum;

  if (
    dateInMilliSeconds == undefined ||
    museumInput == undefined ||
    museumInput.length == 0
  ) {
    //Bad request error, in case of undefined time and musuem name in request
    let errorObject = {
      error: true,
      message: "Bad Request",
      details: "invalid query params",
    };
    res.status(400).send(errorObject);
  } else {
    //valid request params
    let day = moment
      .unix(dateInMilliSeconds / 1000)
      .format("YYYY-MM-DDThh:mm:ss.SSS");
    let monthInput = day.split("T")[0];

    let yearResponse = moment.unix(dateInMilliSeconds / 1000).format("YYYY");
    let monthResponse = moment.unix(dateInMilliSeconds / 1000).format("MMM");

    backendCall(monthInput, museumInput).then((data) => {
      //Success response from the backend
      if (!data.errorCode) {
        let responseObject = {
          result: {
            month: monthResponse,
            year: parseInt(yearResponse),
            museum: museumInput,
            visitors: parseInt(data),
          },
        };
        res.json(responseObject);
      }
      //error response from backend
      else {
        let responseObject = data;
        res.status(400).send(responseObject);
      }
    });
  }
});

// app.get call in case of any other route
app.get("/*", (req, res) => {
  let errorObject = {
    error: true,
    message: "Not Found",
    details: "invalid request URL",
  };
  res.status(404).send(errorObject);
});

//app listening at port
const port = process.env.PORT || 3010;
const server = app.listen(port, () => {
  console.log(`app listening at ${port}`);
});

module.exports = server;
