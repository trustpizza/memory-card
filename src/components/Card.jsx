import { useState } from "react";

function Card({ imageUrl, onClick }) {

    return (
        <>
        <li
          onClick={onClick}
        >
          <img src={imageUrl} />
        </li>
        </>
    )
}

export default Card;