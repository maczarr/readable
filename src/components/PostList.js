import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestPostings } from '../actions';
import humanReadableTime from '../utils/humanReadableTime';
import VoteScore from './VoteScore';
import '../styling/postlist.css';

class PostList extends Component {
  componentWillMount() {
    this.props.requestPosts();
  }

  render() {
    const { posts } = this.props;

    if (posts.length === 0) {
      return <p>No Posts found.</p>
    }

    return (
      <ol className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-list__item">
            <article className="posting">
              <p className="meta">
                <time className="meta__when">{humanReadableTime(post.timestamp)}</time>
                <span className="meta__who">by {post.author}</span>
                <span className="meta__where">in {post.category}</span>
              </p>
              <h1 className="posting__title">{post.title}</h1>
              <p className="posting__body">{post.body}</p>
              <p className="posting__comment-count">Comments: {post.commentList.length}</p>
              <VoteScore isPost='true' entryId={post.id} />
            </article>
          </li>
        ))}
      </ol>
    )
  }
}

function mapStateToProps({ posts, comments }) {
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
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestPosts: () => dispatch(requestPostings()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
