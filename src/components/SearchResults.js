import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moviecard from './Moviecard';
import MovieDetail from './MovieDetail';

const SearchResults = ({ Api_key }) => {
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [castimages, setCastImages] = useState([]);
    const [castNames, setCastNames] = useState([]);
    const [charname, setcharname] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const url = `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${query}`;
                let data = await fetch(url);
                let parsedData = await data.json();
                setResults(parsedData.results);
            } catch (error) {
                console.error("Failed to fetch search results:", error);
                setResults([]);
            }
        };

        fetchSearchResults();
    }, [query, Api_key]);

    const handleMovieClick = async (movie) => {
        setSelectedMovie(movie);

        try {
            const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${Api_key}&language=en-US`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setCastImages(parsedData.cast.map(castMember=> castMember.profile_path));
            setCastNames(parsedData.cast.map(castMember => castMember.name));
            setcharname(parsedData.cast.map(castMember => castMember.character));
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        }
    };

    const handleCloseDetail = () => {
        setSelectedMovie(null);
        setCastImages([]);
        setCastNames([]);
        setcharname([]);
    };

    return (
        <div className='container' style={{ paddingTop: "50px" }}>
            <div className="row">
                {results.length > 0 ? (
                    results.map((movie) => (
                        <div className="col-md-3" key={movie.id} style={{ paddingTop: "50px", paddingBottom: "20px" }}>
                            <Moviecard
                                title={movie.title}
                                onClick={() => handleMovieClick(movie)}
                                imageUrl={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                vote_average={movie.vote_average}
                            />
                        </div>
                    ))
                ) : (
                    <p>No results found for "{query}"</p>
                )}
            </div>

            {selectedMovie && (
                <MovieDetail 
                    title={selectedMovie.title} 
                    imageUrl={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`} 
                    overview={selectedMovie.overview}
                    onClose={handleCloseDetail}
                    vote_average={selectedMovie.vote_average}
                    castimages={castimages}
                    name={castNames}
                    char_name={charname}
                />
            )}
        </div>
    );
};

export default SearchResults;
