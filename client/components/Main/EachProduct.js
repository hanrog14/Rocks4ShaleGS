import React from 'react'
import {Link} from 'react-router-dom'

const EachProduct = (props) => {
  const eachProduct = props.product
  return (
    <div className="column" key={eachProduct.name}>
      <Link to={`../../products/${eachProduct.id}`}>
        <img className="column-image" src={eachProduct.pictureUrl} />
      </Link>
      <Link to={`../../products/${eachProduct.id}`}>
        <h2>{eachProduct.name}</h2>
      </Link>
      ${Number.parseFloat(eachProduct.price / 100).toFixed(2)}
      <br />
      {
        (eachProduct.inventory <= 0) ?
          <button className="sold-out-inventory" type="button" disabled="true">
            Sold Out!
          </button>
        :
          <button className="add-to-cart" type="button" onClick={() => props.clickFunc(eachProduct.id, eachProduct.name)}>
            Add To Cart
          </button>
      }
      <br />
      {props.isAdmin && <Link to={{pathname: `../../products/${eachProduct.id}/update`, state: eachProduct}}>Edit</Link>}
      <br />
    </div>
  )
}

export default EachProduct
