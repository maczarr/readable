import React, { Component } from 'react';
import { requestPosting, changeCommentSort } from '../actions';
import { connect } from 'react-redux';
import humanReadableTime from '../utils/humanReadableTime';
import commentsToArray from '../utils/commentsToArray';
import VoteScore from '../components/VoteScore';
import sortBy from 'sort-by';
import AddIcon from 'react-icons/lib/fa/plus';
import UserIcon from 'react-icons/lib/fa/user';
import CommentIcon from 'react-icons/lib/fa/comment';
import EditIcon from 'react-icons/lib/fa/pencil';
import DeleteIcon from 'react-icons/lib/fa/trash';
import '../styling/postlist.css';
import '../styling/commentlist.css';

class PostingDetails extends Component {
  componentWillMount() {
    const { requestPost, post } = this.props;

    requestPost(post.id);
  }

  render() {
    const { post, sorting, changeSorting } = this.props;

    if (post.deleted === true) {
      return <p>No Post found.</p>
    }

    return (
      <div className="PostingDetails">
        <article className="posting posting--single">
          <p className="meta">
            <span className="meta__who">
              <UserIcon size={14} className="meta__user-icon" />
              {post.author}
            </span>
            <span className="meta__where">Category: <a href={'/'+post.category}>{post.category}</a></span>
            <time className="meta__when">{humanReadableTime(post.timestamp)}</time>
          </p>
          <h1 className="posting__title">{post.title}</h1>
          <p className="posting__body">{post.body}</p>
          <div className="entry__modify">
            <button className="entry__modify-btn entry__modify-btn--edit">
              <EditIcon size={16} /> edit
            </button>
            <button className="entry__modify-btn entry__modify-btn--del">
              <DeleteIcon size={16} /> delete
            </button>
          </div>
          <div className="posting__reactions">
            <VoteScore isPost='true' entryId={post.id} />
            <p className="posting__comment-count" title={'Comments: '+post.commentList.length}>
              {post.commentList.length}
              <CommentIcon size={16} className="posting__comment-icon" alt="Comments:" />
            </p>
          </div>
        </article>

        <aside className="post-comments">
          <h2 className="comments-title">Comments ({post.commentList.length})</h2>

          <div className="list-sort">
            <label className="list-sort__label" htmlFor="list-sort__criteria">Sort By:</label>
            <select value={sorting} id="list-sort__criteria" onChange={(event) => changeSorting(event.target.value)}>
              <option value="-voteScore">score (highest first)</option>
              <option value="voteScore">score (lowest first)</option>
              <option value="-timestamp">time (newest first)</option>
              <option value="timestamp">time (oldest first)</option>
            </select>
          </div>

          <button className="comment-create">
            <AddIcon size={16} /> New Comment
          </button>

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
                    <button className="entry__modify-btn entry__modify-btn--light entry__modify-btn--edit">
                      <EditIcon size={16} /> edit
                    </button>
                    <button className="entry__modify-btn entry__modify-btn--light entry__modify-btn--del">
                      <DeleteIcon size={16} /> delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments, commentSorting }, ownProps) {
  const { id: postId } = ownProps.params;
  const commentsAsArray = commentsToArray(comments);

  return {
    post: {
      id: postId,
      ...posts[postId],
      commentList: commentsAsArray.filter(comment => comment.parentId === postId)
    },
    sorting: commentSorting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestPost: (id) => dispatch(requestPosting(id)),
    changeSorting: (criteria) => dispatch(changeCommentSort(criteria))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostingDetails);
