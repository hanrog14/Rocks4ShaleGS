import React, {Component} from 'react'
import {addReview} from '../../store/product'
import {connect} from 'react-redux'

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: '',
      comments: '',
      errMessage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.stars === '') {
      this.setState({errMessage: 'Please fill in your star rating'})
    } else {
      this.props.submitChange({stars: this.state.stars, comments: this.state.comments}, this.props.match.params.id);
      this.setState({stars: '', comments: '', errMessage: null});
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h1>Write your review here!</h1>
          <div className="inputContainer">
            <label>Stars</label>
            <select className="inputElem" name="stars" onChange={this.handleChange} value={this.state.stars}>
              <option value="--">--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value={5}>5</option>
            </select>
            <div className="inputElem">
              <label>Comments</label>
              <input
                type="text"
                name="comments"
                placeholder="Comments.."
                onChange={this.handleChange}
                value={this.state.comments}
              />
            </div>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
          {this.state.errMessage && <h4 id="errMessage">{this.state.errMessage}</h4>}
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitChange: (review, id) => dispatch(addReview(review, id))
  }
}

export default connect(null, mapDispatchToProps)(CreateReview)
