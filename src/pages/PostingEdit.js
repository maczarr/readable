import React, { Component } from 'react';
import { requestEditPosting, editPosting, writeEditPosting, resetEditPost } from '../actions';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import '../styling/posting-ced.css';

class PostingEdit extends Component {
  componentWillMount() {
    const { requestEditPost, id } = this.props;

    requestEditPost(id);
  }

  componentWillUnmount() {
    this.props.resetEditForm();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    this.props.editPost(values);
  }

  handleChange = (e) => {
    e.preventDefault();
    const values = serializeForm(this.refs.editForm, { hash: true });
    this.props.writeEditPost(values);
  }

  render() {
    const { postToBeEdited } = this.props;

    return (
      <div className="PostingEdit">
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
    postToBeEdited
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
