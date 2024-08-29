import React from 'react';

const Moviecard = ({ title, imageUrl, vote_average, onClick }) => {
    return (
        <div className="card h-100" style={{ backgroundColor: "transparent", border: "none", cursor: 'pointer' }} onClick={onClick}>
            <img
                src={imageUrl ? imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV6-DQF2pBwNFV9KzPafu9RghrNF1tZ8J3AA&s"}
                className="card-img-top"
                alt={title}
                style={{ height: "275px", objectFit: "cover", marginBottom: "0" }}
            />
            <div className="card-body d-flex flex-column" style={{ color: "white", padding: "10px 0 0 0" }}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Rating: {vote_average}</p>
            </div>
        </div>
    );
};

export default Moviecard;
