import React, { Component } from 'react';
import { requestCategories, requestPostings, createPost } from '../actions';
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

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts: Object.keys(posts).map(post => {
      return {
        id: post,
        ...posts[post]
      }
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestPosts: () => dispatch(requestPostings()),
    requestCats: () => dispatch(requestCategories()),
    addPost: (data) => dispatch(createPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Startpage);
