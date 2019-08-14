import React from 'react';


export default function Playstore(props) {
  return (
    <div className='playstore'>
      <h2>{ props.App }</h2>
      <div className="Rating">{ props.Rating }</div>
      <div className="genre">{ props.Genres }</div>
			<div className="price">{ props.Price }</div>
			<div className="contentRating">{ props.ContentRating }</div>
			<div className="lastUpdated">{ props.LastUpdated }</div>
    </div>
  )
}