import React from 'react';
import { ProductTypes } from 'types';
import './Products.css';

type ProductsValues = {
  product: ProductTypes;
};

export class Product extends React.Component<ProductsValues> {
  render() {
    const { img, name, bestfor, producer, type, amount, price } = this.props.product;
    return (
      <>
        <div className="products__item">
          <div className="products__img-wrap">
            <img className="products__img" src={img} alt={name} width="auto" height="180" />
          </div>
          <p className="products__name">{name}</p>
          <p className="products__bestfor">
            <span>For </span>
            {bestfor}
          </p>
          <p className="products__producer">{producer}</p>
          <p className="products__type">{type}</p>
          <p className="products__amount">
            Available: <span>{amount}</span>
          </p>
          <div className="products__stock">
            <p className="products__price">
              {price}
              <span className="pruducts__curr">$</span>
            </p>
          </div>
        </div>
      </>
    );
  }
}
