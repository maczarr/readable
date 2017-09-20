export default function commentsToArray(commentsArr) {
  return Object.keys(commentsArr).map(commentId => {
    return {
      id: commentId,
      ...commentsArr[commentId]
    }
  });
}