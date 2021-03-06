import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCatsPostings, requestAllPostings, changePostSort, deletePosting } from '../actions';
import humanReadableTime from '../utils/humanReadableTime';
import commentsToArray from '../utils/commentsToArray';
import VoteScore from './VoteScore';
import sortBy from 'sort-by';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import AddIcon from 'react-icons/lib/fa/plus';
import UserIcon from 'react-icons/lib/fa/user';
import CommentIcon from 'react-icons/lib/fa/comment';
import EditIcon from 'react-icons/lib/fa/pencil';
import DeleteIcon from 'react-icons/lib/fa/trash';
import { push } from 'react-router-redux';
import '../styling/postlist.css';

class PostList extends Component {
  static propTypes = {
    requestCatPosts: PropTypes.func.isRequired,
    requestAllPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    sorting: PropTypes.string.isRequired,
    changeSorting: PropTypes.func.isRequired,
    goToRoute: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    filter: PropTypes.string
  }

  /*
   * If the component did mount it needs to request the postings.
   * This component beeing used on the startpage as well as on the
   * category-pages, different functions needs to be called.
   */
  componentDidMount() {
    const { requestCatPosts, requestAllPosts, filter } = this.props;

    this.requestNecessaryPosts(filter,requestCatPosts,requestAllPosts);
  }

  /*
   * The Props can change and so the posts need to be requested again.
   * A reason for this can be that someone started on a filtered view like
   * a category-page and than switched to the startpage, where all posts
   * should be viewed, so the different props need to take effect.
   */
  componentWillReceiveProps(nextProps) {
    if(this.props.filter !== nextProps.filter) {
      const { requestCatPosts, requestAllPosts, filter } = nextProps;

      this.requestNecessaryPosts(filter,requestCatPosts,requestAllPosts);
    }
  }

  /* The function switching between requesting the posts for a category
   * or for all postings.
   */
  requestNecessaryPosts(filter,requestCatPosts,requestAllPosts) {
    if (typeof(filter) === 'string' && filter.length > 0){
      requestCatPosts(filter);
    } else {
      requestAllPosts();
    }
  }

  render() {
    /*
     * This function filters the posts for a category page. If there
     * is no filter it'll always return `true` so nothing will be
     * filtered out.
     */
    function filterPosts(post, filter) {
      if (typeof(filter) === 'string' && filter.length > 0) {
        return post.category === filter;
      }
      return true;
    }

    const { posts, sorting, changeSorting, filter, goToRoute, deletePost } = this.props;
    const postsFiltered = posts.filter(post => filterPosts(post, filter));

    return (
      <div className="PostList">
        {filter && (
          <h2>All Posts from category „{filter}“</h2>
        )}

        <button className="cta-btn" onClick={() => goToRoute('/post/create')}>
          <AddIcon size={16} /> New Post
        </button>

        {/* Only if there are posts the filter-mechanism should be shown.*/}
        {postsFiltered.length > 0 && (
          <div className="list-sort">
            <label className="list-sort__label" htmlFor="list-sort__criteria">Sort By:</label>
            <select value={sorting} id="list-sort__criteria" onChange={(event) => changeSorting(event.target.value)}>
              <option value="-voteScore">score (highest first)</option>
              <option value="voteScore">score (lowest first)</option>
              <option value="-timestamp">time (newest first)</option>
              <option value="timestamp">time (oldest first)</option>
            </select>
          </div>
        )}

        {postsFiltered.length === 0 && (
          <p>No Posts found.</p>
        )}

        {/* Only if there are posts the list-element should be shown.*/}
        {postsFiltered.length > 0 && (
          <ol className="post-list">
            {postsFiltered.sort(sortBy(sorting)).map((post) => (
              <li key={post.id} className="post-list__item">
                <article className="posting">
                  <p className="meta">
                    <span className="meta__who">
                      <UserIcon size={14} className="meta__user-icon" />
                      {post.author}
                    </span>
                    <time className="meta__when">{humanReadableTime(post.timestamp)}</time>
                  </p>
                  <Link to={'/'+post.category+'/'+post.id} className="posting__link">
                    <h1 className="posting__title">{post.title}</h1>
                  </Link>
                  <div className="entry__modify">
                    <button className="entry__modify-btn entry__modify-btn--edit" onClick={() => goToRoute('/'+post.category+'/'+post.id+'/edit')}>
                      <EditIcon size={16} /> edit
                    </button>
                    <button className="entry__modify-btn entry__modify-btn--del" onClick={() => deletePost(post.id)}>
                      <DeleteIcon size={16} /> delete
                    </button>
                  </div>
                  <div className="posting__reactions">
                    <VoteScore isPost={true} entryId={post.id} />
                    <p className="posting__comment-count" title={'Comments: '+post.commentList.length}>
                      {post.commentList.length}
                      <CommentIcon size={16} className="posting__comment-icon" alt="Comments:" />
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts, comments, postSorting }, ownProps) {
  const { filter } = ownProps;
  const commentsAsArray = commentsToArray(comments);

  /*
   * The posts get converted from an object to an array, than
   * filtered so there's only non-deleted posts and this lists
   * gets processed so it returns an array with post-objects inside
   * and the post-objects are getting a new key `commentList` with
   * the IDs of their comments. The comments are getting filtered
   * aswell so there are no deleted ones left and the
   * comment-counters are accurate.
   */
  return {
    posts: Object.keys(posts)
      .filter(postId => posts[postId].deleted === false)
      .map(postId => {
        return {
          id: postId,
          ...posts[postId],
          commentList: commentsAsArray
                        .filter(comment => !comment.deleted && comment.parentId === postId)
                        .map(comment => comment.id)
        }
    }),
    sorting: postSorting,
    filter: filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToRoute: (route) => dispatch(push(route)),
    requestCatPosts: (category) => dispatch(requestCatsPostings(category)),
    requestAllPosts: () => dispatch(requestAllPostings()),
    changeSorting: (criteria) => dispatch(changePostSort(criteria)),
    deletePost: (id) => dispatch(deletePosting(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
