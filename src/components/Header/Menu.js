import React from 'react'
import Link from 'gatsby-link'

function ItemsList(props) {
  const items = props.items;
  const listItems = items.map((item) =>
    <li>{item.node.title}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

class Menu extends React.Component {
  render(){
    const pages = this.props.pages.edges
    const products = this.props.products.edges
    return (
      <div>
        <ul>
          <li>test</li>
        </ul>
        <h2>Products</h2>
        <ItemsList items={products} />
        <h2>Pages</h2>
        <ItemsList items={pages} />
      </div>
    )
  }
}

export default Menu
