import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendVotePost, sendVoteComment, requestPosting, requestComment } from '../actions';
import PropTypes from 'prop-types';
import PlusIcon from 'react-icons/lib/fa/plus';
import MinusIcon from 'react-icons/lib/fa/minus';
import '../styling/votescore.css';

class VoteScore extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    entryId: PropTypes.string.isRequired,
    isPost: PropTypes.bool,
    requestPost: PropTypes.func.isRequired,
    requestComm: PropTypes.func.isRequired,
    vote: PropTypes.func.isRequired,
    score: PropTypes.number
  }

  /*
   * This component is getting used for posts and comments and calls
   * the right request-function if the entry isn't available yet.
   */
  componentWillMount() {
    const { posts, comments, entryId, isPost, requestPost, requestComm } = this.props;

    if (isPost && typeof(posts[entryId]) === 'undefined') {
      requestPost(entryId);
    } else if (!isPost && typeof(comments[entryId]) === 'undefined') {
      requestComm(entryId);
    }
  }

  render() {
    const { vote, score, entryId, isPost } = this.props;

    return (
      <div className="votescore">
        <button onClick={() => vote({ id: entryId, vote: 'downVote', isPost })} className="votescore__edit votescore__edit--down">
          <MinusIcon size={14} />
        </button>
        <span className="votescore__score">{score}</span>
        <button onClick={() => vote({ id: entryId, vote: 'upVote', isPost })} className="votescore__edit votescore__edit--up">
          <PlusIcon size={14} />
        </button>
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }, ownProps) {
  const { entryId, isPost } = ownProps;

  // This function returns the voteScore for the posts or comment
  function getVoteScore(entryId, isPost, posts, comments) {
    if (isPost && typeof(posts[entryId]) !== 'undefined') {
      return posts[entryId].voteScore;
    }
    else if (typeof(comments[entryId]) !== 'undefined') {
      return comments[entryId].voteScore
    }
    else {
      return 1;
    }
  }

  return {
    score: getVoteScore(entryId, isPost, posts, comments),
    entryId,
    isPost,
    posts,
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestComm: (id) => dispatch(requestComment(id)),
    requestPost: (id) => dispatch(requestPosting(id)),
    vote: (data) => data.isPost ? dispatch(sendVotePost(data)) : dispatch(sendVoteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore);
