import { combineReducers } from 'redux';
//import { getAllPosts } from '../utils/api.js';

import {
  RECEIVE_CATEGORIES,
  WRITE_POST,
/*  EDIT_POST,
  DELETE_POST,*/
  RECEIVE_VOTE_POST,
  WRITE_COMMENT,
/*  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT*/
} from '../actions'

function categories(state = [], action) {
  const { categories } = action;

  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return categories || state;
    default:
      return state;
  }
}

function posts(state = {}, action) {
  switch(action.type) {
    case WRITE_POST:
      const { id, timestamp, title, body, author, category, voteScore, deleted } = action;

      return {
        ...state,
        [id]: {
          "timestamp": timestamp,
          "title": title,
          "body": body,
          "author": author,
          "category": category,
          "voteScore": voteScore,
          "deleted": deleted
        }
      }

    case RECEIVE_VOTE_POST:
      const { post } = action;
      const postId = post.id;

      return {
        ...state,
        [postId]: {
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

function comments(state = [], action) {
  const {
    id: cId,
    timestamp: cTimestamp,
    body: cBody,
    author: cAuthor,
    parentId: cParentId,
    voteScore: cVoteScore,
    deleted: cDeleted,
    parentDeleted: cParentDeleted
  } = action;

  switch(action.type) {
    case WRITE_COMMENT:
      return [
        ...state,
        {
          "id": cId,
          "timestamp": cTimestamp,
          "body": cBody,
          "author": cAuthor,
          "parentId": cParentId,
          "voteScore": cVoteScore,
          "deleted": cDeleted,
          "parentDeleted": cParentDeleted
        }
      ]
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments
});
