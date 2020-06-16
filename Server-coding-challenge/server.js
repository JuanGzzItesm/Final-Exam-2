const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
let {movieList} = require('./models/moviedex-model');
const cors = require( './middleware/cors' );
let uuid = require('uuid');

const app = express();

app.use( cors );

app.get('/api/movies/',(req,res)=> {

    movieList.getAllMovies()
        .then( movieList => {

            if(movieList == undefined){
                 res.statusMessage = "No movies found in the moviedex";
                 return res.satuts( 404 ).send();
            }
            return res.status( 200 ).json( movieList );
        })
        .catch( error => {
             res.statusMessage = "Error with connection";
             return res.status( 500 ).send();
        })

});

app.post('/api/add-movie/', jsonParser,(req,res) =>{

    let title = req.body.movie_title;
    let year = req.body.movie_year;
    let rating = req.body.movie_rating;

    if(title == undefined || year == undefined || rating == undefined){

        res.statusMessage = "You need to send all movie fields to add the movie to the movie list.";
        return res.satuts( 403 ).send();
    }

    let movie_id = uuid.v4();

    let newMovie = {

        movie_id : movie_id,
        movie_title : title,
        movie_year : year,
        movie_rating : rating
    }

    movieList.addNewMovie( newMovie )
        .then( movieList => {
            return res.status(201).json( movieList )
        })
        .catch( error => {
            res.statusMessage = "Error with connection";
            return res.status( 500 ).send();
        });

});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});