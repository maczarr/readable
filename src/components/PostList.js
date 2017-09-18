import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestPostings, changeSort } from '../actions';
import humanReadableTime from '../utils/humanReadableTime';
import VoteScore from './VoteScore';
import sortBy from 'sort-by';
import UserIcon from 'react-icons/lib/fa/user';
import CommentIcon from 'react-icons/lib/fa/comment';
import '../styling/postlist.css';

class PostList extends Component {
  componentWillMount() {
    this.props.requestPosts();
  }

  render() {
    const { posts, sorting, changeSorting } = this.props;

    if (posts.length === 0) {
      return <p>No Posts found.</p>
    }

    return (
      <div>
        <div className="list-sort">
          <label className="list-sort__label" htmlFor="list-sort__criteria">Sort By:</label>
          <select value={sorting} id="list-sort__criteria" onChange={(event) => changeSorting(event.target.value)}>
            <option value="-timestamp">time (newest first)</option>
            <option value="-voteScore">score (best first)</option>
            <option value="timestamp">time (oldest first)</option>
            <option value="voteScore">score (worst first)</option>
          </select>
        </div>

        <ol className="post-list">
          {posts.sort(sortBy(sorting)).map((post) => (
            <li key={post.id} className="post-list__item">
              <article className="posting">
                <p className="meta">
                  <span className="meta__who">
                    <UserIcon size={14} className="meta__user-icon" />
                    {post.author}
                  </span>
                  <span className="meta__where">Category: <a href={'/'+post.category}>{post.category}</a></span>
                  <time className="meta__when">{humanReadableTime(post.timestamp)}</time>
                </p>
                <a href={'/'+post.category+'/'+post.id} className="posting__link">
                  <h1 className="posting__title">{post.title}</h1>
                  <p className="posting__body">{post.body}</p>
                </a>
                <div className="posting__reactions">
                  <VoteScore isPost='true' entryId={post.id} />
                  <p className="posting__comment-count">
                    {post.commentList.length}
                    <CommentIcon size={16} className="posting__comment-icon" alt="Comments:" />
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps({ posts, comments, postSorting }) {
  const commentsAsArray = Object.keys(comments).map(commentId => {
    return {
      id: commentId,
      ...comments[commentId]
    }
  });

  return {
    posts: Object.keys(posts).map(postId => {
      return {
        id: postId,
        ...posts[postId],
        commentList: commentsAsArray
                      .filter(comment => comment.parentId === postId)
                      .map(comment => comment.id)
      }
    }),
    sorting: postSorting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestPosts: () => dispatch(requestPostings()),
    changeSorting: (criteria) => dispatch(changeSort(criteria))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
