import React, { useContext } from "react";
import './Item.css'
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Item = (props) => {

    const {url} = useContext(ShopContext); 
  return (
    <div className="item">
      <Link to={`/product/${props._id}`}><img onClick={()=>window.scrollTo(0,0)} src={url+ "/images/"+props.image} alt="" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-prices-new">
          {props.new_price + ",000 VNĐ"}
        </div>
        <div className="item-prices-old">
          {props.old_price + ",000 VNĐ"}
        </div>
      </div>
    </div>
  )
}

export default Item
