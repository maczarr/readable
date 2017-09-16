import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendVotePost } from '../actions';
import '../styling/votescore.css';

class VoteScore extends Component {
  render() {
    const { vote, score, parentId } = this.props;

    return (
      <div className="votescore">
        <button onClick={() => vote({ id: parentId, vote: 'downVote' })} className="votescore__edit votescore__edit--down">-</button>
        <span className="votescore__score">{score}</span>
        <button onClick={() => vote({ id: parentId, vote: 'upVote' })} className="votescore__edit votescore__edit--up">+</button>
      </div>
    )
  }
}

function mapStateToProps({ posts }, parentId) {
  const pId = parentId.parentId;

  return {
    score: posts[pId].voteScore,
    parentId: pId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (data) => dispatch(sendVotePost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore);
