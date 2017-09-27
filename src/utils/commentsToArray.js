/*
 * A little helper-function to put in a comments-object
 * and getting back a comments-array of objects with a
 * key keeping the id of the comment.
 */
export default function commentsToArray(commentsArr) {
  return Object.keys(commentsArr).map(commentId => {
    return {
      id: commentId,
      ...commentsArr[commentId]
    }
  });
}
