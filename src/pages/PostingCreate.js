import React, { Component } from 'react';
import { requestCategories, sendPosting } from '../actions';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import serializeForm from 'form-serialize';
import '../styling/posting-ced.css';

class PostingCreate extends Component {
  static propTypes = {
    requestCats: PropTypes.func.isRequired,
    sendPost: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired
  }

  // The categories are getting requested for the drop-down form-field
  componentDidMount() {
    const { requestCats } = this.props;
    requestCats();
  }

  // Function for handling the form-submit and sending the data
  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    this.props.sendPost(values);
  }

  render() {
    const { categories, router } = this.props;

    return (
      <div className="PostingCreate">
        <Header router={router}/>

        <h1>Create New Post</h1>
        <form className="post-ced" onSubmit={this.handleSubmit}>
          <label htmlFor="post-ced__title" className="post-ced__label">Title</label>
          <input type="text" name="title" className="post-ced__text post-ced__text--title" id="post-ced__title" required/>

          <label htmlFor="post-ced__body" className="post-ced__label">Your Message</label>
          <textarea id="post-ced__body" name="body" className="post-ced__text post-ced__text--body" required></textarea>

          <label htmlFor="post-ced__author" className="post-ced__label">Your Name</label>
          <input type="text" name="author" className="post-ced__text post-ced__text--author" id="post-ced__author" required/>

          <label htmlFor="post-ced__category" className="post-ced__label">Category:</label>
          <select id="post-ced__category" name="category" className="post-ced__category" required>
            {categories.map(category => (
              <option key={category.name} value={category.name}>{category.name}</option>
            ))}
          </select>

          <button className="cta-btn">
            save
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ categories }, ownProps) {
  return {
    categories,
    router: ownProps.router
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestCats: () => dispatch(requestCategories()),
    sendPost: (data) => dispatch(sendPosting(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostingCreate);
