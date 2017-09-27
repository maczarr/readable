import React, { Component } from 'react';
import { requestEditPosting, editPosting, writeEditPosting, resetEditPost } from '../actions';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import serializeForm from 'form-serialize';
import '../styling/posting-ced.css';

class PostingEdit extends Component {
  static propTypes = {
    requestEditPost: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    resetEditForm: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    writeEditPost: PropTypes.func.isRequired,
    postToBeEdited: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  // The post that should get edited gets requested
  componentDidMount() {
    const { requestEditPost, id } = this.props;

    requestEditPost(id);
  }

  /*
   * For not having the edited post in the state until
   * the next post gets edited, the form-data in the
   * state are getting reset.
   */
  componentWillUnmount() {
    this.props.resetEditForm();
  }

  // Function to handle a permanent change to the post
  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    this.props.editPost(values);
  }

  // Function to handle a change to the post in the form
  handleChange = (e) => {
    e.preventDefault();
    const values = serializeForm(this.refs.editForm, { hash: true });
    this.props.writeEditPost(values);
  }

  render() {
    const { postToBeEdited, router } = this.props;

    return (
      <div className="PostingEdit">
        <Header router={router}/>

        <h1 className="post-ced__page-title">Edit Post</h1>
        <form className="post-ced" onSubmit={this.handleSubmit} onChange={this.handleChange} ref='editForm'>
          <label htmlFor="post-ced__title" className="post-ced__label">Title</label>
          <input type="text" value={postToBeEdited.title} name="title" className="post-ced__text post-ced__text--title" id="post-ced__title"/>

          <label htmlFor="post-ced__body" className="post-ced__label">Your Message</label>
          <textarea id="post-ced__body" value={postToBeEdited.body} name="body" className="post-ced__text post-ced__text--body"></textarea>

          <button className="cta-btn">
            save
          </button>

          <input type="hidden" value={postToBeEdited.id} name="id" readOnly />
          <input type="hidden" value={postToBeEdited.category} name="category" readOnly />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ postToBeEdited }, ownProps) {
  const { id } = ownProps.params;

  return {
    id,
    postToBeEdited,
    router: ownProps.router
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestEditPost: (id) => dispatch(requestEditPosting(id)),
    editPost: (data) => dispatch(editPosting(data)),
    writeEditPost: (data) => dispatch(writeEditPosting(data)),
    resetEditForm: () => dispatch(resetEditPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostingEdit);
