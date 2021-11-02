import { RootState } from '../../config/store';

export const selectPosts = (state: RootState) => state.post.posts;
export const selectPickedPost = (state: RootState) => state.post.selectedPost;
export const selectPostFilters = (state: RootState) => state.post.filters;

/**
 * SELECTORS allows us to select a value from
 * the state. Selectors can also be defined inline where
 * they're used instead of in the slice file.
 * For example: `useSelector((state: RootState) => state.counter.value)`
*/
