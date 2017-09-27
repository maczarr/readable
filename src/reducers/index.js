import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  RECEIVE_CATEGORIES,
  WRITE_POST,
  WRITE_COMMENT,
  CHANGE_POST_SORT,
  CHANGE_COMMENT_SORT,
  WRITE_EDIT_POST,
  RESET_EDIT_POST,
  WRITE_EDIT_COMMENT,
  RESET_EDIT_COMMENT,
  SWITCH_FORM_VISIBILITY
} from '../actions'

// Reducer for categories
function categories(state = [], action) {
  const { categories } = action;

  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return categories;
    default:
      return state;
  }
}

// Reducer for posts
function posts(state = {}, action) {
  switch(action.type) {
    case WRITE_POST:
      const { post } = action;
      const postId = post.id;

      return {
        ...state,
        [postId]: {
          "id": post.id,
          "timestamp": post.timestamp,
          "title": post.title,
          "body": post.body,
          "author": post.author,
          "category": post.category,
          "voteScore": post.voteScore,
          "deleted": post.deleted
        }
      }
    default:
      return state;
  }
}

const initialEditPost = {
  id: '',
  title: '',
  body: '',
  category: ''
}

// Reducer for the post-edit form
function postToBeEdited(state = initialEditPost, action) {
  switch(action.type) {
    case WRITE_EDIT_POST:
      const { post } = action;

      return {
        "id": post.id,
        "title": post.title,
        "body": post.body,
        "category": post.category,
      }
    case RESET_EDIT_POST:
      return initialEditPost;
    default:
      return state;
  }
}

const initialEditComment = {
  id: '',
  body: ''
}

// Reducer for comment-edit form
function commentToBeEdited(state = initialEditComment, action) {
  switch(action.type) {
    case WRITE_EDIT_COMMENT:
      const { comment } = action;

      return {
        "id": comment.id,
        "body": comment.body
      }
    case RESET_EDIT_COMMENT:
      return initialEditComment;
    default:
      return state;
  }
}

// Reducer for comments
function comments(state = {}, action) {
  switch(action.type) {
    case WRITE_COMMENT:
      const { comment } = action;
      const commentId = comment.id;

      return {
        ...state,
        [commentId]: {
          id: comment.id,
          timestamp: comment.timestamp,
          body: comment.body,
          author: comment.author,
          parentId: comment.parentId,
          voteScore: comment.voteScore,
          deleted: comment.deleted,
          parentDeleted: comment.parentDeleted
        }
      }
    default:
      return state;
  }
}

// Reducer for sorting the posts
function postSorting(state = '-voteScore', action) {
  const { criteria } = action;

  switch(action.type) {
    case CHANGE_POST_SORT:
      return criteria;
    default:
      return state;
  }
}

// Reducer for sorting the comments
function commentSorting(state = '-voteScore', action) {
  const { criteria } = action;

  switch(action.type) {
    case CHANGE_COMMENT_SORT:
      return criteria;
    default:
      return state;
  }
}

// Reducer for switching visibility of the add-comment form
function commentFormVisible(state = false, action) {
  const { visible } = action;

  switch(action.type) {
    case SWITCH_FORM_VISIBILITY:
      return visible;
    default:
     return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  postSorting,
  commentSorting,
  postToBeEdited,
  commentToBeEdited,
  commentFormVisible,
  routing: routerReducer
});
