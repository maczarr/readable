import React, { Component } from 'react';
import { requestCategories } from '../actions';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import '../styling/categories.css';

class Startpage extends Component {
  componentWillMount() {
    this.props.requestCats();
  }

  render() {
    const { categories } = this.props

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

        <PostList />
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestCats: () => dispatch(requestCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Startpage);
