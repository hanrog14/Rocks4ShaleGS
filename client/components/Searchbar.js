import React from 'react'
import history from '../history'

export default class Searchbar extends React.Component {
  constructor() {
    super()
    this.state = {
      currSearch: ''
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler (event) {
    this.setState({ currSearch: event.target.value });
  }

  submitHandler (event) {
    event.preventDefault();
    history.push(`/products/name/${this.state.currSearch}`)
    this.setState({ currSearch: '' });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler} >
          <input type="text" name="search-bar" placeholder="Search.." value={this.state.currSearch} onChange={this.changeHandler} />
          <button type="submit" value="submit" >
            &#128269;
          </button>
        </form>
      </div>
    )
  }
}
