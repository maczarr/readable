import React, { Component } from 'react';
import { requestCategories, requestPostings, writePost } from '../actions';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import '../styling/categories.css';

class Startpage extends Component {
  componentWillMount() {
    this.props.requestCats();
    this.props.requestPosts();
  }

  render() {
    const { categories, posts } = this.props

    return (
      <div className="Startpage">
        {categories.length > 0 && (
          <ul className="categories">
            {categories.map((cat,i) => (
              <li key={i} className="categories__item">
                <a href={cat.path}>
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        )}

        <PostList posts={posts} />
      </div>
    );
  }
}

function mapStateToProps({ categories, posts, comments }) {
  return {
    categories,
    posts: Object.keys(posts).map(postId => {
      return {
        id: postId,
        ...posts[postId],
        commentList: comments.filter(comment => comment.parentId === postId)
      }
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestPosts: () => dispatch(requestPostings()),
    requestCats: () => dispatch(requestCategories()),
    addPost: (data) => dispatch(writePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Startpage);
