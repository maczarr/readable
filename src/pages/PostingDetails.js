import React, { Component } from 'react';
import {
  requestPosting,
  changeCommentSort,
  deletePosting,
  sendCommentary,
  deleteCommentary,
  switchCommentFormVisibility
} from '../actions';
import { connect } from 'react-redux';
import humanReadableTime from '../utils/humanReadableTime';
import commentsToArray from '../utils/commentsToArray';
import VoteScore from '../components/VoteScore';
import sortBy from 'sort-by';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import serializeForm from 'form-serialize';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import AddIcon from 'react-icons/lib/fa/plus';
import UserIcon from 'react-icons/lib/fa/user';
import CommentIcon from 'react-icons/lib/fa/comment';
import EditIcon from 'react-icons/lib/fa/pencil';
import DeleteIcon from 'react-icons/lib/fa/trash';
import '../styling/postlist.css';
import '../styling/commentlist.css';
import '../styling/commentwrite.css';

class PostingDetails extends Component {
  static propTypes = {
    requestPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    switchFormVisibility: PropTypes.func.isRequired,
    sendComment: PropTypes.func.isRequired,
    sorting: PropTypes.string.isRequired,
    changeSorting: PropTypes.func.isRequired,
    goToRoute: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    commentFormVisible: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired
  }

  // If the component did mount it needs to request the posting
  componentDidMount() {
    const { requestPost, post } = this.props;

    requestPost(post.id);
  }

  // The comment-form gets hidden again, after leaving this page
  componentWillUnmount() {
    this.props.switchFormVisibility(false);
  }

  /*
   * Function for handling the submit of the comment-form
   * After the data is send the form gets reset and closed
   * so it is tidy for a possible new comment.
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    this.props.sendComment(values);
    e.target.reset();
    this.props.switchFormVisibility(false);
  }

  render() {
    const {
      post,
      sorting,
      changeSorting,
      goToRoute,
      deletePost,
      deleteComment,
      commentFormVisible,
      switchFormVisibility,
      router
    } = this.props;

    return (
      <div className="PostingDetails">
        <Header router={router}/>

        {(post.deleted === true || typeof(post.title) === 'undefined') && (
          <p>No Post found.</p>
        )}

        {(post.deleted !== true && typeof(post.title) !== 'undefined') && (
          <div>
            <article className="posting posting--single">
              <p className="meta">
                <span className="meta__who">
                  <UserIcon size={14} className="meta__user-icon" />
                  {post.author}
                </span>
                <span className="meta__where">Category: <Link to={'/'+post.category}>{post.category}</Link></span>
                <time className="meta__when">{humanReadableTime(post.timestamp)}</time>
              </p>
              <h1 className="posting__title">{post.title}</h1>
              <p className="posting__body">{post.body}</p>
              <div className="entry__modify">
                <button className="entry__modify-btn entry__modify-btn--edit" onClick={() => goToRoute('/'+post.category+'/'+post.id+'/edit')}>
                  <EditIcon size={16} /> edit
                </button>
                <button className="entry__modify-btn entry__modify-btn--del" onClick={() => deletePost(post.id)}>
                  <DeleteIcon size={16} /> delete
                </button>
              </div>
              <div className="posting__reactions">
                <VoteScore isPost={true} entryId={post.id} />
                <p className="posting__comment-count" title={'Comments: '+post.commentList.length}>
                  {post.commentList.length}
                  <CommentIcon size={16} className="posting__comment-icon" alt="Comments:" />
                </p>
              </div>
            </article>

            <aside className="post-comments">
              <h2 className="comments-title">Comments ({post.commentList.length})</h2>

              {post.commentList.length > 0 && (
                <div className="list-sort">
                  <label className="list-sort__label" htmlFor="list-sort__criteria">Sort By:</label>
                  <select value={sorting} id="list-sort__criteria" onChange={(event) => changeSorting(event.target.value)}>
                    <option value="-voteScore">score (highest first)</option>
                    <option value="voteScore">score (lowest first)</option>
                    <option value="-timestamp">time (newest first)</option>
                    <option value="timestamp">time (oldest first)</option>
                  </select>
                </div>
              )}

              <button className="cta-btn cta-btn--comments" onClick={() => switchFormVisibility(true)}>
                <AddIcon size={16} /> New Comment
              </button>

              {commentFormVisible && (
                <form className="comment-write comment-write--create" onSubmit={this.handleSubmit}>
                  <label htmlFor="comment-write__author" className="comment-write__label">Your Name</label>
                  <input type="text" name="author" className="comment-write__text comment-write__text--author" id="comment-write__author" required/>

                  <label htmlFor="comment-write__body" className="comment-write__label">Your Comment</label>
                  <textarea id="comment-write__body" name="body" className="comment-write__text comment-write__text--body" required></textarea>

                  <button className="cta-btn">
                    save
                  </button>

                  <button className="cta-btn cta-btn--cancel" onClick={() => switchFormVisibility(false)}>
                    cancel
                  </button>

                  <input type="hidden" name="parentId" value={post.id}/>
                </form>
              )}

              <ol className="comments">
                {post.commentList.sort(sortBy(sorting)).map(comment => (
                  <li key={comment.id} className="comment">
                    <p className="comment__meta">
                      <span className="comment__author">{comment.author}</span>
                      <time className="comment__time">{humanReadableTime(comment.timestamp)}</time>
                    </p>
                    <p className="comment__body">
                      {comment.body}
                    </p>
                    <div className="comment__interactions">
                      <VoteScore entryId={comment.id} />

                      <div className="entry__modify entry__modify--comment">
                        <button className="entry__modify-btn entry__modify-btn--light entry__modify-btn--edit" onClick={() => goToRoute(`/${post.category}/${post.id}/comments/${comment.id}/edit`)}>
                          <EditIcon size={16} /> edit
                        </button>
                        <button className="entry__modify-btn entry__modify-btn--light entry__modify-btn--del" onClick={() => deleteComment(comment.id)}>
                          <DeleteIcon size={16} /> delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, commentSorting, commentFormVisible }, ownProps) {
  const { id: postId } = ownProps.params;
  const commentsAsArray = commentsToArray(comments);

  /*
   * The post-object gets its own id as key for the props and
   * the post-object is getting a new key `commentList` with
   * the IDs of its comments. The comments are getting filtered
   * aswell so there are no deleted ones left and the
   * comment-counter is accurate.
   */
  return {
    post: {
      id: postId,
      ...posts[postId],
      commentList: commentsAsArray.filter(comment => !comment.deleted && comment.parentId === postId)
    },
    sorting: commentSorting,
    commentFormVisible,
    router: ownProps.router
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToRoute: (route) => dispatch(push(route)),
    requestPost: (id) => dispatch(requestPosting(id)),
    changeSorting: (criteria) => dispatch(changeCommentSort(criteria)),
    deletePost: (id) => dispatch(deletePosting(id)),
    sendComment: (data) => dispatch(sendCommentary(data)),
    deleteComment: (id) => dispatch(deleteCommentary(id)),
    switchFormVisibility: (visible) => dispatch(switchCommentFormVisibility(visible))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostingDetails);
