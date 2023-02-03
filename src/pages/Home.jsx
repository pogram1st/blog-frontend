import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchPostsPopular, fetchTags } from '../redux/slices/post';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const [activeTab, setActiveTab] = React.useState(0);

  const handleClickTabPopular = () => {
    setActiveTab(1);
    dispatch(fetchPostsPopular());
  };
  const handleClickTabNew = () => {
    setActiveTab(0);
    dispatch(fetchPosts());
  };

  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = posts.status === 'loading';
  const comments =
    posts.items.length > 0
      ? posts.items.map((obj, index) => {
          return obj.comments;
        })
      : [];

  console.log(comments.flat());

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={activeTab} aria-label='basic tabs example'>
        <Tab onClick={handleClickTabNew} label='Новые' />
        <Tab onClick={handleClickTabPopular} label='Популярные' />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
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
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.flat()} isLoading={false} />
        </Grid>
      </Grid>
    </>
  );
};
