import "./PropertyCard.css";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import {truncate} from 'lodash'
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";
const PropertyCard = ({ card }) => {
  const navigate=new useNavigate();
  return (
    <div className="flexColStart r-card" onClick={()=>navigate(`/properties/${card.id}`)}>
      <Heart className="heart" id={card?.id}/>
      <img src={card.image} alt="home" />
      
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span>
      <span className="primaryText">{truncate(card.title,{length:15})}</span>
      <span className="secondaryText">{truncate(card.description,{length:40})}</span>
    </div>
  );
};

export default PropertyCard;
