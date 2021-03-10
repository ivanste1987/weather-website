const path = require("path");
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");

//Utils
const geocode = require("./utils/geocode");
const currentForecast = require("./utils/currentForecast");
const airpollution = require("./utils/airpollution");
const fiveDayForecast = require("./utils/fiveDaysForecast");

const app = express();
const port = process.env.PORT || 3000;
//path je nativni modul noda koji pravi putanju do javnog foldera, nema potreba ga instalirati jer ga node podrzava nativno
//putanja do foldera console.log(__dirname) > /home/ivan/Desktop/Node.js Course/Web-Server/src + ../public
//path.join() funkcija pravi konkatenaciju stringova naprimer path.join(__dirname, '../public')

//Paths for express config
const public = path.join(__dirname, "../public");
const views = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

//Setup for handlebars engine and views location

app.set("view engine", "hbs");
app.set("views", views);
//Templates partials
hbs.registerPartials(partials);

//definise se putanja do public foldera, i receno je exoressu da koristi ovu staticnu rutu

//Setup static directory to serve
app.use(express.static(public));

//form data Middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//JSON body Middleware
app.use(bodyParser.json());
app.use(express.json());

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    text: "Some Weather text.",
    name: "Ivan Stefanovic",
  });
});

//default route
app.get("/weather/default", (req, res) => {
  const latitude = 44.8090237;
  const longitude = 20.3816501;

  currentForecast(
    latitude,
    longitude,
    (
      error,
      {
        temperature,
        feelslike,
        pressure,
        weatherDescription,
        windDir,
        wind,
        humidity,
        temp_min,
        temp_max,
        name,
        country,
        img,
      } = {}
    ) => {
      if (error) {
        return res.send({
          error: "Nije Dozvoljeno",
        });
      }
      airpollution(
        latitude,
        longitude,
        (error, { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = {}) => {
          if (error) {
            return res.send({
              error: error,
            });
          } //ukinuti kasnije obj destructuring
          fiveDayForecast(latitude, longitude, (error, fiveDayForecast) => {
            if (error) {
              return res.send(error);
            }

            res.send({
              temperature,
              feelslike,
              pressure,
              weatherDescription,
              windDir,
              wind,
              humidity,
              co,
              no,
              no2,
              o3,
              so2,
              pm2_5,
              pm10,
              nh3,
              name,
              country,
              temp_min,
              temp_max,
              img,
              fiveDayForecast,
            });
          });
        }
      );
    }
  );
});

app.post("/weather/geolocation", (req, res) => {
  // console.log(req.body)

  currentForecast(
    req.body.latitude,
    req.body.longitude,
    (
      error,
      {
        temperature,
        feelslike,
        pressure,
        weatherDescription,
        windDir,
        wind,
        humidity,
        temp_min,
        temp_max,
        name,
        country,
        img,
      } = {}
    ) => {
      if (error) {
        return res.send({
          error: "Nije Dozvoljeno",
        });
      }
      airpollution(
        req.body.latitude,
        req.body.longitude,
        (error, { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = {}) => {
          if (error) {
            return res.send({
              error: error,
            });
          } //ukinuti kasnije obj destructuring
          fiveDayForecast(
            req.body.latitude,
            req.body.longitude,
            (error, fiveDayForecast) => {
              if (error) {
                return res.send(error);
              }

              res.send({
                temperature,
                feelslike,
                pressure,
                weatherDescription,
                windDir,
                wind,
                humidity,
                co,
                no,
                no2,
                o3,
                so2,
                pm2_5,
                pm10,
                nh3,
                name,
                country,
                temp_min,
                temp_max,
                img,
                fiveDayForecast,
              });
            }
          );
        }
      );
    }
  );
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Please provide an address",
    });
  } else {
    //ukinuti kasnije obj destructuring
    geocode(
      req.query.address,
      (error, { longitude, latitude, name, country } = {}) => {
        if (error) {
          return res.send({
            error,
          });
        }
        //ukinuti kasnije obj destructuring
        currentForecast(
          longitude,
          latitude,
          (
            error,
            {
              temperature,
              feelslike,
              pressure,
              weatherDescription,
              windDir,
              wind,
              humidity,
              temp_min,
              temp_max,
              img,
            }
          ) => {
            if (error) {
              return res.send({
                error,
              });
            } //ukinuti kasnije obj destructuring
            airpollution(
              longitude,
              latitude,
              (error, { co, no, no2, o3, so2, pm2_5, pm10, nh3 }) => {
                if (error) {
                  return res.send({
                    error,
                  });
                }
                fiveDayForecast(
                  longitude,
                  latitude,
                  (error, fiveDayForecast) => {
                    if (error) {
                      return res.send(error);
                    }

                    res.send({
                      temperature,
                      feelslike,
                      pressure,
                      weatherDescription,
                      windDir,
                      wind,
                      humidity,
                      co,
                      no,
                      no2,
                      o3,
                      so2,
                      pm2_5,
                      pm10,
                      nh3,
                      name,
                      country,
                      longitude,
                      latitude,
                      temp_min,
                      temp_max,
                      img,
                      fiveDayForecast,
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  }
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    text: "Some useful text.",
    name: "Ivan Stefanoivc",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    text: `
        About Me
        I am seeking challenging opportunities where I can fully use my skills for the success of organization.
         Focused on resolving substance of the problem, excellent management of new and unknown situations, 
        highly motivated with a pronouncedwork ethic, ready for independent and team work, passionate abouttechnology.`,
    name: "Ivan Stefanoivc",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "This is text for error page",
    name: "Ivan Stefanoivc",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 PAGE",
    error: "This page not found!",
    name: "Ivan Stefanoivc",
  });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
