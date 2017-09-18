import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendVotePost, sendVoteComment } from '../actions';
import '../styling/votescore.css';

class VoteScore extends Component {
  render() {
    const { vote, score, entryId, isPost } = this.props;

    return (
      <div className="votescore">
        <button onClick={() => vote({ id: entryId, vote: 'downVote', isPost: isPost })} className="votescore__edit votescore__edit--down">-</button>
        <span className="votescore__score">{score}</span>
        <button onClick={() => vote({ id: entryId, vote: 'upVote', isPost: isPost })} className="votescore__edit votescore__edit--up">+</button>
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }, ownProps) {
  const { entryId, isPost } = ownProps;

  return {
    score: isPost ? posts[entryId].voteScore : comments[entryId].voteScore,
    entryId: entryId,
    isPost: isPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (data) => data.isPost ? dispatch(sendVotePost(data)) : dispatch(sendVoteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore);
