import React from 'react';

function MovieForm( props ){
    return(
        <div>
            <form>
            	<div>
	            	< label htmlFor="movieTitle">
	            		<input type="text" name="movieTitle" id="movieTitle" />
	            	</label>
	            </div>
	            <div>
	            	< label htmlFor="movieYear">
	            		<input type="text" name="movieYear" id="movieYear" />
	            	</label>
	            </div>
	            <div>
	            	< label htmlFor="movieRating">
	            		<input type="number" name="movieRating" id="movieRating" />
	            	</label>
	            </div>
            	<button type="submit">
            		NewMovie
            	</button>
            </form>
        </div>
    )
}

export default MovieForm;