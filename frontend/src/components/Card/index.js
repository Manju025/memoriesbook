import React, {useState} from 'react';
import { CiCalendar, CiUser } from "react-icons/ci";

import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import "./Card.css";

const Card = ({ image, title, date, tags, description, location, creator }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="card">
      {isLiked ? <IoMdHeart className={`card-heart ${isLiked ? "liked" : ""}`} onClick={() => setIsLiked(!isLiked)} /> : <IoMdHeartEmpty className={`card-heart ${isLiked ? "liked" : ""}`} onClick={() => setIsLiked(!isLiked)} />}
        <img src={image} alt={title} className="card-image" />
        <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className='card-date'><CiCalendar />{date}</p>
            <p className="card-tags">{tags.map((tag, index) => <span key={index} className="card-tag">#{tag}</span>)}</p>
            <p className="card-description">{description}</p>
            <p className="card-creator">Created by: {creator}</p>
        </div>
    </div>
  );
}

export default Card;