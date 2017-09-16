import React from 'react';
import '../styling/postlist.css';
import humanReadableTime from '../utils/humanReadableTime';
import VoteScore from './VoteScore';

export default function PostList ({ posts }) {
  if (posts.length === 0) {
    return <p>No Posts found.</p>
  }

  return (
    <ol className="post-list">
      {posts.map((post) => (
        <li key={post.id} className="post-list__item">
          <article className="posting">
            <p className="meta">
              <time className="meta__when">{humanReadableTime(post.timestamp)}</time>
              <span className="meta__who">by {post.author}</span>
              <span className="meta__where">in {post.category}</span>
            </p>
            <h1 className="posting__title">{post.title}</h1>
            <p className="posting__body">{post.body}</p>
            <VoteScore parentId={post.id} />
          </article>
        </li>
      ))}
    </ol>
  )
}