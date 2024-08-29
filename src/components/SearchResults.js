import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moviecard from './Moviecard';

const SearchResults = ({ Api_key }) => {
    const { query } = useParams();
    const [results, setResults] = useState([]);

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

    return (
        <div className='container' style={{ paddingTop: "50px" }}>
            <div className="row">
                {results.length > 0 ? (
                    results.map((movie) => (
                        <div className="col-md-3" key={movie.id} style={{ paddingTop: "50px", paddingBottom: "20px" }}>
                            <Moviecard
                                title={movie.title}
                                imageUrl={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                vote_average={movie.vote_average}
                            />
                        </div>
                    ))
                ) : (
                    <p>No results found for "{query}"</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
