import React from 'react';

const MovieDetail = ({ title, imageUrl, overview, onClose, vote_average, castimages, name = [] , char_name=[]}) => {
    return (
        <div style={{ position: "relative" }}>
            <button 
                onClick={onClose} 
                style={{
                    position: "absolute",
                    top: "0px",
                    right: "70px",
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                    zIndex: "1001"
                }}
            >
                &times;
            </button>
            <div className="movie-detail" style={{
                padding: "20px",
                paddingTop: "60px",
                backgroundColor: "transparent",
                color: "white",
                position: "fixed",
                top: "25px",
                left: "0",
                right: "0",
                bottom: "0",
                overflow: "auto",
                zIndex: "1000",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center"
            }}>
                <div style={{ 
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    backgroundColor: "#000018cc",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                    width: "100%",
                    maxWidth: "1200px"
                }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <img 
                                src={imageUrl} 
                                alt={title} 
                                style={{ width: "150px", height: "175px", objectFit: "cover" }} 
                            />
                            <div style={{ flexDirection: "column" }}>
                                <h2 style={{ margin: 0 }}>{title}</h2>
                                <h4 style={{ marginTop: "5px" }}>Rating: {vote_average}</h4>
                            </div>
                        </div>
                        <h5 style={{ marginTop: "10px" }}>Overview</h5>
                        <p style={{ marginTop: "0px" }}>{overview}</p>
                    </div>
                    <div style={{ 
                        borderRadius: "8px", 
                        overflow: "hidden", 
                        flexShrink: 0,
                        width: "450px"
                    }}>
                        <img 
                            src={imageUrl} 
                            alt={title} 
                            style={{ width: "450px", height: "auto" }} 
                        />
                    </div>
                </div>
                <h2 style={{ textAlign: "left", width: "100%", maxWidth: "1200px", paddingLeft: "20px" }}>Cast</h2>
                <div style={{ 
                    marginTop: "20px", 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "10px",
                    justifyContent: "center"
                }}>
                    {Array.isArray(castimages) && castimages.length > 0 ? (
                        castimages.map((castImage, index) => (
                            castImage && (
                                <div className='col-md-2' key={index} style={{ textAlign: "center" }}>
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w500${castImage}`} 
                                        alt={name[index] || `Cast member ${index + 1}`} 
                                        style={{ width: "175px", height: "auto", objectFit: "cover", borderRadius: "0px" }} 
                                    />
                                    <p style={{ marginTop: "5px", color: "white", textAlign:"left", paddingLeft:"23px" }}>{name[index] || "Name not available"}</p>
                                    <p style={{ marginTop: "2px", color: "white", textAlign:"left", paddingLeft:"23px" }}>Character: {char_name[index] || "Name not available"}</p>

                                </div>
                            )
                        ))
                    ) : (
                        <p>No cast images available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
