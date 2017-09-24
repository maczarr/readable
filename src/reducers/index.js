import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
//import { getAllPosts } from '../utils/api.js';

import {
  RECEIVE_CATEGORIES,
  WRITE_POST,
/*  EDIT_POST,
  DELETE_POST,*/
  WRITE_COMMENT,
/*  EDIT_COMMENT,
  DELETE_COMMENT,*/
  CHANGE_POST_SORT,
  CHANGE_COMMENT_SORT,
  WRITE_EDIT_POST
} from '../actions'

function categories(state = [], action) {
  const { categories } = action;

  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return categories;
    default:
      return state;
  }
}

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
    default:
      return state;
  }
}

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

function postSorting(state = '-voteScore', action) {
  const { criteria } = action;

  switch(action.type) {
    case CHANGE_POST_SORT:
      return criteria;
    default:
      return state;
  }
}

function commentSorting(state = '-voteScore', action) {
  const { criteria } = action;

  switch(action.type) {
    case CHANGE_COMMENT_SORT:
      return criteria;
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
  routing: routerReducer
});
