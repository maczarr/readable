export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTINGS = 'RECEIVE_POSTINGS'
export const CREATE_POST = 'CREATE_POST'
/*export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'*/
export const RECEIVE_VOTE_POST = 'RECEIVE_VOTE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
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

export const receivePostings = postings => ({
  type: RECEIVE_POSTINGS,
  postings
});

export const requestPostings = () => dispatch => (
  API
    .getAllPosts()
    .then(posts => dispatch(receivePostings(posts)))
);

export function createPost ({ id, timestamp, title, body, owner, category }) {
  return {
    type: CREATE_POST,
    id,
    timestamp,
    title,
    body,
    owner,
    category
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

export function createComment ({ id, timestamp, body, owner, parentId }) {
  return {
    type: CREATE_COMMENT,
    id,
    timestamp,
    body,
    owner,
    parentId
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