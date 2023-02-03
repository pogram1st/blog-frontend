import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});
export const fetchPostsPopular = createAsyncThunk('posts/fetchPostsPopular', async () => {
  const { data } = await axios.get('/posts-popular');
  return data;
});
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => await axios.delete(`/posts/${id}`),
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    //Плдучение статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchPostsPopular.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsPopular.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsPopular.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // Получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    // Удаление статей
    [fetchRemovePost.pending]: (state, action) => {
      console.log(action);
      state.posts.items = state.posts.items.filter((item) => item._id !== action.meta.arg);
    },
    [fetchRemovePost.rejected]: (state) => {
      state.posts.status = 'err';
    },
  },
});

export const postsReducer = postSlice.reducer;
