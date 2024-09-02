import React, { useState, useEffect } from 'react';
import Moviecard from './Moviecard';
import MovieDetail from './MovieDetail';
import InfiniteScroll from 'react-infinite-scroll-component';

const Movie = ({ Api_key, category }) => {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [castimages, setCastImages] = useState([]);
    const [castNames, setCastNames] = useState([]);
    const [charname, setcharname] = useState([]);

    const updateMovies = async (resetPage = false) => {
        try {
            if (resetPage) {
                setPage(1);
                setResults([]);
            }
            const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${Api_key}&language=en-US&page=${resetPage ? 1 : page}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setResults(prevResults => resetPage ? parsedData.results : prevResults.concat(parsedData.results));
            setTotalResults(parsedData.total_results);
        } catch (error) {
            console.error("Failed to fetch movies:", error);
            setResults([]);
        }
    };

    useEffect(() => {
        updateMovies(true);
        // eslint-disable-next-line
    }, [category]);

    const fetchMoreData = async () => {
        const newPage = page + 1;
        setPage(newPage);
        const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${Api_key}&language=en-US&page=${newPage}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setResults(results.concat(parsedData.results));
    };

    const handleMovieClick = async (movie) => {
        setSelectedMovie(movie);
        try {
            const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${Api_key}&language=en-US`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setCastImages(parsedData.cast.map(castMember => castMember.profile_path));
            setCastNames(parsedData.cast.map(castMember => castMember.name));
            setcharname(parsedData.cast.map(castMember => castMember.character));


        } catch (error) {
            console.error("Failed to fetch cast images:", error);
            setCastImages([]);
            setCastNames([]);
        setcharname([]);

        }
    };

    const handleCloseDetail = () => {
        setSelectedMovie(null);
        setCastImages([]);
        setCastNames([]);
        setcharname([]);

    };

    return (
        <div>
            <InfiniteScroll
                dataLength={results.length}
                next={fetchMoreData}
                hasMore={results.length < totalResults}
            >
                <div className='container' style={{ paddingTop: "50px", position: "relative" }}>
                    <div className="row" style={{ display: selectedMovie ? 'none' : 'flex' }}>
                        {results.map((element) => (
                            <div className="col-md-3" key={element.id} style={{ paddingTop: "50px", paddingBottom: "20px" }}>
                                <Moviecard
                                    title={element.title}
                                    imageUrl={`https://image.tmdb.org/t/p/w500${element.backdrop_path}`}
                                    vote_average={element.vote_average}
                                    onClick={() => handleMovieClick(element)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
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

export default Movie;
