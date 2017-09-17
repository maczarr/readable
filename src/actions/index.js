export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const WRITE_POST = 'WRITE_POST'
/*export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'*/
export const RECEIVE_VOTE_POST = 'RECEIVE_VOTE_POST'
export const WRITE_COMMENT = 'WRITE_COMMENT'
/*export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'*/

import * as API from '../utils/api.js';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const requestCategories = () => dispatch => (
  API
    .getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const requestComments = (parentId) => dispatch => (
  API
    .getPostComments(parentId)
    .then(comments => comments.forEach(comment => dispatch(writeComment(comment)) ))
);

export const requestPostings = () => dispatch => (
  API
    .getAllPosts()
    .then(posts => posts.forEach(post => {
      dispatch(writePost(post));
      dispatch(requestComments(post.id));
    }))
);

export function writePost ({ id, timestamp, title, body, author, category, voteScore, deleted }) {
  return {
    type: WRITE_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

/*export function editPost ({ id, title, body }) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

export function deletePost ({ id }) {
  return {
    type: DELETE_POST,
    id
  }
}*/

export const receiveVotePost = post => ({
  type: RECEIVE_VOTE_POST,
  post
});

export const sendVotePost = ({ id, vote }) => dispatch => (
  API
    .votePost(id, vote)
    .then(post => dispatch(receiveVotePost(post)))
);

export function writeComment ({ id, timestamp, body, author, parentId, parentDeleted, voteScore, deleted }) {
  return {
    type: WRITE_COMMENT,
    id,
    timestamp,
    body,
    author,
    parentId,
    parentDeleted,
    voteScore,
    deleted
  }
}

/*export function editComment ({ id, timestamp, body }) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
    body
  }
}

export function deleteComment ({ id }) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function voteComment ({ id, vote }) {
  return {
    type: VOTE_COMMENT,
    id,
    vote
  }
}
*/