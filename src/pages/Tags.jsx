import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPosts } from '../redux/slices/post';

import Grid from '@mui/material/Grid';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { Post } from '../components';

export const Tags = ({}) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  const { type } = useParams();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = posts.status === 'loading';

  const postTags = posts.items.filter((obj, index) => obj.tags.includes(type));
  const comments = postTags.map((obj, index) => {
    return obj.comments;
  });

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          <h1>#{type}</h1>
          {(isPostsLoading ? [...Array(5)] : postTags).map((obj, index) =>
            isPostsLoading && postTags.length > 0 ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl && `${process.env.REACT_APP_API_URL}${obj.imageUrl}`}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user?._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <CommentsBlock items={comments.flat()} isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
