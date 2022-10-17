import React from 'react';
import Search from 'components/Search';
import { Product } from 'components/Product';
import { ProductTypes } from 'types';

type PropsType = Record<string, unknown>;

type StateType = {
  search: string;
  products: ProductTypes[];
};

export default class Games extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { search: '', products: [] };
  }

  private async init() {
    const products = await this.load();
    this.setState({ search: localStorage.getItem('search') || '', products });
    // console.log('this.state.products', this.state.products);
  }

  private async load(): Promise<ProductTypes[]> {
    const res = await fetch('/assets/data/data.json');
    const products = await res.json();
    return products;
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevState: PropsType) {
    if (this.state.search !== prevState.search) {
      localStorage.setItem('search', this.state.search);
    }
  }

  get filteredProducts(): ProductTypes[] {
    if (!this.state.search) {
      return this.state.products;
    }
    return this.state.products.filter((prod) => {
      return prod.name.toLowerCase().includes(this.state.search.toLocaleLowerCase());
    });
  }

  render() {
    const filteredProducts = this.filteredProducts;
    return (
      <>
        <Search
          searchText={this.state.search}
          onChange={(text: string) => {
            this.setState({ search: text });
          }}
        />
        <div className="products">
          <div className="products-wrap">
            {!filteredProducts.length && (
              <div className="products-wrap__msg">Sorry, no matches found</div>
            )}
            {filteredProducts.map((prod) => (
              <Product key={prod.id.toString()} product={prod} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
