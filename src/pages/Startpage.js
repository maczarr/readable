import React, { Component } from 'react';
import { requestCategories } from '../actions';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import Header from '../components/Header';
import { Link } from 'react-router';
import '../styling/categories.css';

class Startpage extends Component {
  componentDidMount() {
    this.props.requestCats();
  }

  render() {
    const { categories, categoryFilter, router } = this.props

    if (categoryFilter !== null && (categories.filter(cat => cat.name === categoryFilter).length === 0)) {
      return <p>The category „{categoryFilter}“ does not exists, sorry.</p>
    }

    return (
      <div className="Startpage">
        <Header router={router}/>

        {categoryFilter === null && categories.length > 0 && (
          <ul className="categories">
            {categories.map((cat,i) => (
              <li key={i} className="categories__item">
                <Link to={cat.path}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        )}

        <PostList filter={categoryFilter} />
      </div>
    );
  }
}

function mapStateToProps({ categories }, ownProps) {
  const { category } = ownProps.params;

  return {
    categories,
    categoryFilter: category ? category : null,
    router: ownProps.router
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestCats: () => dispatch(requestCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Startpage);
