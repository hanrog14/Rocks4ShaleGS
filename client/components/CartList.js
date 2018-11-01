import React from 'react'
import {connect} from 'react-redux'

// export default class CartList extends React.Component {


//   render() {
//     console.log('WORKING')
//     // let productCartArray = this.props.products
//     // let arrayRender = productCartArray.map(item => { return <li key={item.id} >{item.name}: {item.price}</li>})

//     return (
//         <div>
//           <h1>Working Here</h1>
//           <ul>
//             YES YES YES
//             {/* {arrayRender} */}
//           </ul>
//         </div>
//     )
//   }
// }

// // const mapStatetoProps = state => ({
// //   products: state.product.products
// // })

// export default connect(mapStatetoProps)(CartList)



// export default function CartList() {return <div><h1>SOMETHING</h1></div>}

export default class CartList extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
