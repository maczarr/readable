import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendVotePost, sendVoteComment } from '../actions';
import PlusIcon from 'react-icons/lib/fa/plus';
import MinusIcon from 'react-icons/lib/fa/minus';
import '../styling/votescore.css';

class VoteScore extends Component {
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

// eslint-disable-next-line
function mapStateToProps({}, ownProps) {
  const { entryId, score, isPost } = ownProps;

  return {
    score,
    entryId,
    isPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (data) => data.isPost ? dispatch(sendVotePost(data)) : dispatch(sendVoteComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore);
