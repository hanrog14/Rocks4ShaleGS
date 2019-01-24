import React from 'react'

const CartRow = (props) => {
  const item = props.item
  return (
    <tr key={item.id}>
      <td className="item-info">
        <img src={item.pictureUrl} />
        <div className="item-content">
          <h4>Rocks For Shale</h4>
          <p>{item.name}</p>
          <p>{item.category}</p>
          <button type="button" onClick={() => props.removeItemFromOrder(item.id)}>Remove Item</button>
        </div>
      </td>
      <td>
        ${Number.parseFloat(item.price/100).toFixed(2)}
      </td>
      <td>
        <select
          defaultValue={ Math.min(props.quantity, item.inventory) }
          onChange={event => props.handleChange(event, props.i)}
        >
          {new Array(item.inventory > 10 ? 10 : item.inventory).fill().map((elem, idx) => {
            return <option key={idx} value={1 + idx}>{1 + idx}</option>
          })}
        </select>
      </td>
      <td>
        ${Number.parseFloat((item.price*props.quantity)/100).toFixed(2)}
      </td>
    </tr>
  )
}

export default CartRow
