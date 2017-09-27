import * as API from '../utils/api.js';
import { push } from 'react-router-redux';
// UUID-Generator for new posts and comments
const uuidv4 = require('uuid/v4');

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const WRITE_POST = 'WRITE_POST'
export const WRITE_COMMENT = 'WRITE_COMMENT'
export const CHANGE_POST_SORT = 'CHANGE_POST_SORT'
export const CHANGE_COMMENT_SORT = 'CHANGE_COMMENT_SORT'
export const WRITE_EDIT_POST = 'WRITE_EDIT_POST'
export const RESET_EDIT_POST = 'RESET_EDIT_POST'
export const WRITE_EDIT_COMMENT = 'WRITE_EDIT_COMMENT'
export const RESET_EDIT_COMMENT = 'RESET_EDIT_COMMENT'
export const SWITCH_FORM_VISIBILITY = 'SWITCH_FORM_VISIBILITY'

export const resetEditPost = () => ({
  type: RESET_EDIT_POST
});

export const resetEditComment = () => ({
  type: RESET_EDIT_COMMENT
});

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

/*
 * There's only this action for writing a post which gets called
 * several times by other actions.
 */
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

export const writeEditCommentary = ({ id, body }) => ({
  type: WRITE_EDIT_COMMENT,
  comment: {
    id,
    body
  }
});

/*
 * There's only this action for writing a comment which gets called
 * several times by other actions.
 */
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
      /*
       * In case a user opens a url with a wrong post-id or maybe a
       * deleted post, the API answers with an empty object so
       * this case has to be cleared.
       * If everything is fine the actions for write the post and
       * requesting the comments for that post get dispatched.
       */
      if(typeof(post.id) !== 'undefined') {
        dispatch(writePost(post));
        dispatch(requestComments(post.id));
      }
    })
);

// The posting that should be edited gets requested
export const requestEditPosting = (id) => dispatch => (
  API
    .getPost(id)
    .then(post => {
      dispatch(writeEditPosting(post));
    })
);

// The comment that should be edited gets requested
export const requestEditCommentary = (commentId) => dispatch => (
  API
    .getComment(commentId)
    .then(comment => {
      dispatch(writeEditCommentary(comment));
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
      /*
       * For all posts the comments get requested because
       * in every post-view are the comment-infos necessary.
       */
      dispatch(writePost(post));
      dispatch(requestComments(post.id));
    }))
);

export const requestAllPostings = () => dispatch => (
  API
    .getAllPosts()
    .then(posts => posts.forEach(post => {
      /*
       * For all posts the comments get requested because
       * in every post-view are the comment-infos necessary.
       */
      dispatch(writePost(post));
      dispatch(requestComments(post.id));
    }))
);

// After a new post was created the user gets redirected to posting-page
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
      /*
       * Because comments have a prop that says if the parent-post
       * is deleted, it is necessary to request the comments of the
       * deleted post aswell to get the state right.
       */
      dispatch(writePost(post));
      dispatch(requestComments(post.id));
    })
    .then(dispatch(push('/')))
);

export const sendCommentary = ({ id = uuidv4(), timestamp = Date.now(), body, author, parentId }) => dispatch => (
  API
    .createComment(id, timestamp, body, author, parentId)
    .then(comment => {
      dispatch(writeComment(comment));
    })
);

export const editCommentary = ({ id, timestamp = Date.now(), body, parentId, category }) => dispatch => (
  API
    .editComment(id, timestamp, body)
    .then(comment => dispatch(writeComment(comment)))
    .then(dispatch(push(`/${category}/${parentId}`)))
);

export const deleteCommentary = ( id ) => dispatch => (
  API
    .deleteComment(id)
    .then(comment => {
      dispatch(writeComment(comment));
    })
);

export const sendVotePost = ({ id, vote }) => dispatch => (
  API
    .votePost(id, vote)
    .then(post => dispatch(writePost(post)))
);

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

export const switchCommentFormVisibility = visible => ({
  type: SWITCH_FORM_VISIBILITY,
  visible
});
