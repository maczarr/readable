import * as API from '../utils/api.js';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const WRITE_POST = 'WRITE_POST'
/*export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'*/
export const WRITE_COMMENT = 'WRITE_COMMENT'
/*export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'*/
export const CHANGE_POST_SORT = 'CHANGE_POST_SORT'
export const CHANGE_COMMENT_SORT = 'CHANGE_COMMENT_SORT'

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const writePost = ({ id, timestamp, title, body, author, category, voteScore, deleted }) => ({
  type: WRITE_POST,
  post: {
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
});

export const writeComment =  ({ id, timestamp, body, author, parentId, parentDeleted, voteScore, deleted }) => ({
  type: WRITE_COMMENT,
  comment: {
    id,
    timestamp,
    body,
    author,
    parentId,
    parentDeleted,
    voteScore,
    deleted
  }
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

export const requestPosting = (id) => dispatch => (
  API
    .getPost(id)
    .then(post => {
      dispatch(writePost(post));
      dispatch(requestComments(post.id));
    })
);

export const requestComment = (id) => dispatch => (
  API
    .getComment(id)
    .then(comment => dispatch(writeComment(comment)))
);

export const requestCatsPostings = (category) => dispatch => (
  API
    .getCategoriesPosts(category)
    .then(posts => posts.forEach(post => {
      dispatch(writePost(post));
      dispatch(requestComments(post.id));
    }))
);

export const requestAllPostings = () => dispatch => (
  API
    .getAllPosts()
    .then(posts => posts.forEach(post => {
      dispatch(writePost(post));
      dispatch(requestComments(post.id));
    }))
);

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

export const sendVotePost = ({ id, vote }) => dispatch => (
  API
    .votePost(id, vote)
    .then(post => dispatch(writePost(post)))
);

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
}*/

export const sendVoteComment = ({ id, vote }) => dispatch => (
  API
    .voteComment(id, vote)
    .then(comment => dispatch(writeComment(comment)))
);

export const changePostSort = criteria => ({
  type: CHANGE_POST_SORT,
  criteria
});

export const changeCommentSort = criteria => ({
  type: CHANGE_COMMENT_SORT,
  criteria
});