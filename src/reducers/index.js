import { combineReducers } from 'redux';
//import { getAllPosts } from '../utils/api.js';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTINGS,
  CREATE_POST,
/*  EDIT_POST,
  DELETE_POST,*/
  RECEIVE_VOTE_POST,
  CREATE_COMMENT,
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
    case RECEIVE_POSTINGS:
      const { postings } = action;
      let postingList = {};

      postings.forEach(post => {
        postingList[post.id] = {
          "timestamp": post.timestamp,
          "title": post.title,
          "body": post.body,
          "author": post.author,
          "category": post.category,
          "voteScore": post.voteScore,
          "deleted": post.deleted
        }
      });

      return postingList

    case CREATE_POST:
      const { id, timestamp, title, body, author, category } = action;

      return {
        ...state,
        [id]: {
          "timestamp": timestamp,
          "title": title,
          "body": body,
          "author": author,
          "category": category,
          "voteScore": 0,
          "deleted": false
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
  const { id: cId, timestamp: cTimestamp, body: cBody, owner: cOwner, parentId: cParentId } = action;

  switch(action.type) {
    case CREATE_COMMENT:
      return [
        ...state,
        {
          "id": cId,
          "timestamp": cTimestamp,
          "body": cBody,
          "author": cOwner,
          "parentId": cParentId
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
