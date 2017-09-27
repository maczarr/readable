import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import LeftArrowIcon from 'react-icons/lib/fa/arrow-left';
import '../styling/header.css';

class Header extends Component {
  static propTypes = {
    routing: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired
  }

  render() {
    const { routing, goBack } = this.props;

    return (
      <header className="readable-header">
        {/*
          * The header has the logo pointing to the startpage and
          * and a left-arrow pointing to the previous page.
          * The Back-Functionality only gets hidden on the startpage.
          */}
        { routing.locationBeforeTransitions.pathname !== '/' && (
          <button onClick={goBack} className="nav-btn-back">
            <LeftArrowIcon size={20} className="nav-btn-back__icon"/>
          </button>
        )}
        <h1 className="readable-header__title">
          <Link to={'/'} className="readable-header__root-link">readable</Link>
        </h1>
      </header>
    )
  }
}

function mapStateToProps({ routing }, ownProps) {
  return {
    routing,
    goBack: ownProps.router.goBack
  }
}

export default connect(mapStateToProps)(Header);
