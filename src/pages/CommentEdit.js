import React, { Component } from 'react';
import { requestEditCommentary, editCommentary, writeEditCommentary, resetEditComment } from '../actions';
import { connect } from 'react-redux';
import Header from '../components/Header';
import serializeForm from 'form-serialize';
import '../styling/commentwrite.css';

class CommentEdit extends Component {
  componentDidMount() {
    const { requestEditComment, commentId } = this.props;

    requestEditComment(commentId);
  }

  componentWillUnmount() {
    this.props.resetEditForm();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    this.props.editComment(values);
  }

  handleChange = (e) => {
    e.preventDefault();
    const values = serializeForm(this.refs.editCommentForm, { hash: true });
    this.props.writeEditComment(values);
  }

  render() {
    const { commentToBeEdited, category, parentId, router } = this.props;

    return (
      <div className="CommentEdit">
        <Header router={router}/>

        <h1 className="comment-write__page-title">Edit Comment</h1>
        <form className="comment-write" onSubmit={this.handleSubmit} onChange={this.handleChange} ref='editCommentForm'>
          <label htmlFor="comment-write__body" className="comment-write__label">Your Comment</label>
          <textarea id="comment-write__body" value={commentToBeEdited.body} name="body" className="comment-write__text comment-write__text--body"></textarea>

          <button className="cta-btn">
            save
          </button>

          <input type="hidden" value={commentToBeEdited.id} name="id" readOnly />
          <input type="hidden" value={category} name="category" readOnly />
          <input type="hidden" value={parentId} name="parentId" readOnly />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ commentToBeEdited }, ownProps) {
  const { commentId, id: parentId, category } = ownProps.params;

  return {
    commentId,
    parentId,
    category,
    commentToBeEdited,
    router: ownProps.router
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestEditComment: (id) => dispatch(requestEditCommentary(id)),
    editComment: (data) => dispatch(editCommentary(data)),
    writeEditComment: (data) => dispatch(writeEditCommentary(data)),
    resetEditForm: () => dispatch(resetEditComment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);
