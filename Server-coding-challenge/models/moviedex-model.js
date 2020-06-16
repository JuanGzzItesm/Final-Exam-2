const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

let idN = uuid.v4();

let movieCollection = mongoose.Schema({

	movie_id : { type : String, data : idN},

	movie_title : {type : String},

	movie_year : {type : Number},

	movie_rating : {type : Number}
});

let Movie = mongoose.model('movies',movieCollection);

let movieList = {

	getAllMovies : function(){
		return Movie.find()
		.then(movies =>{
			return movies;
		})
		.catch (error =>{
			throw Error( error );
		})
	},
	addNewMovie : function( newMovie ){

		return Movie.create( newMovie)
			.then( movies=> {
				return movies;
			})
			.catch( error =>{
				throw Error(error);
			});
	}
}
module.exports = {
    
    movieList
};