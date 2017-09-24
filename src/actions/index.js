import * as API from '../utils/api.js';
import { push } from 'react-router-redux';
const uuidv4 = require('uuid/v4');

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const WRITE_POST = 'WRITE_POST'
/*export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'*/
export const WRITE_COMMENT = 'WRITE_COMMENT'
/*export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'*/
export const CHANGE_POST_SORT = 'CHANGE_POST_SORT'
export const CHANGE_COMMENT_SORT = 'CHANGE_COMMENT_SORT'
export const WRITE_EDIT_POST = 'WRITE_EDIT_POST'

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

export const writeEditPosting = ({ id, title, body, category }) => ({
  type: WRITE_EDIT_POST,
  post: {
    id,
    title,
    body,
    category
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
      if(typeof(post.id) !== 'undefined') {
        dispatch(writePost(post));
        dispatch(requestComments(post.id));
      }
    })
);

export const requestEditPosting = (id) => dispatch => (
  API
    .getPost(id)
    .then(post => {
      dispatch(writeEditPosting(post));
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

export const sendPosting = ({ id = uuidv4(), timestamp = Date.now(), title, body, author, category }) => dispatch => (
  API
    .createPost(id, timestamp, title, body, author, category)
    .then(post => {
      dispatch(writePost(post));
    })
    .then(dispatch(push(`/${category}/${id}`)))
);

export const editPosting = ({ id, title, body, category }) => dispatch => (
  API
    .editPost(id, title, body)
    .then(post => dispatch(writePost(post)))
    .then(dispatch(push(`/${category}/${id}`)))
);

export const deletePosting = ( id ) => dispatch => (
  API
    .deletePost(id)
    .then(post => {
      //console.log(post)
      dispatch(writePost(post));
      dispatch(requestComments(post.id));
    })
    .then(dispatch(push('/')))
);

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