import React from 'react';
import './App.css';
import Movie from './Movie';
import MovieForm from './MovieForm';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      movieTitle : "",
      movieYear : "",
      movieRating : "",
      apiUrl : "http://localhost:8080/api",
      errorMessage : ""

    }
  }
  
  /*
    Your code goes here
  */
  
  componentDidMount(){
    
    let url = `${this.state.apiUrl}/movies`;
    const settings = {

      method : 'GET'
    }


  fetch(url,settings)
    .then(response => {

      if( response.ok){
        return response.json();
      }

      throw new Error( response.statusText);
    })
    .then( responseJSON => {
      this.setState({
         movieTitle : responseJSON.movie_title,
         movieYear :responseJSON.movie_year,
         movieRating : responseJSON.movie_rating,
      })
    })
    .catch( err => {
      console.log("ERROR");
    })

    let url = `${this.state.apiUrl}/add-movie`;

    let data = {
      movie_title : movieTitle,
      movie_year : movieYear,
      movie_rating : movieRating
    }
    const settings = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(movie)
    };

    fetch( url,settings)
      .then( response=> {
        if(response.ok){
          return response.json();
        }
        throw new Error( "ERROR ADDING A MOVIE");
      })
      .catch( err => {
        this.setState({
          errorMessage : "SOMETHING WENT WRONG";
        });
      });
}

  render(){
    return (
      <div>
        Hola
      </div>
    );
  }
}


export default App;
