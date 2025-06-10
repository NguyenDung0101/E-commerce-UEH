import React, { useContext } from 'react';
import './RelatedProducts.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const RelatedProducts = () => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="relatedproducts">
      <h1 className="relatedproducts-title">Sản phẩm khác</h1>
      <hr className="relatedproducts-divider" />
      <div className="relatedproducts-container">
        <div className="relatedproducts-items">
          {all_product.map((item, i) => (
            <Item 
              key={i}
              _id={item._id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
