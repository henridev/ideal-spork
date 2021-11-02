import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPostAsync, getAllPostsAsync, getPostByIdAsync } from './post.thunks';
import postState, { Post, PostFilters } from './post.state';
import { deletePostAsync, patchPostAsync, putPostAsync } from '.';

export const postSlice = createSlice({
	name: 'post',
	initialState: postState,
	reducers: {
		updateFilter: (state, action: PayloadAction<{ filterName: keyof PostFilters, value: undefined }>) => {
			const { filterName, value } = action.payload;
			state.filters[filterName] = value;
		},
		addPost: (state, action: PayloadAction<Post>) => {
			state.posts.push(action.payload);
		},
		pickPost: (state, action: PayloadAction<number>) => {
			state.selectedPost = state.posts.find(({ id }) => id === action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPostsAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getAllPostsAsync.fulfilled, (state, action) => {
				state.posts = action.payload;
				state.status = 'idle';
			})
			.addCase(getAllPostsAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(getPostByIdAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getPostByIdAsync.fulfilled, (state, action) => {
				state.posts = state.posts.filter(({ id }) => id !== action.payload.id);
				state.posts.push(action.payload);
				state.status = 'idle';
			})
			.addCase(getPostByIdAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(createPostAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createPostAsync.fulfilled, (state, action) => {
				state.posts = state.posts.filter(({ id }) => id !== action.payload.id);
				state.posts.push(action.payload);
				state.status = 'idle';
			})
			.addCase(createPostAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(patchPostAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(patchPostAsync.fulfilled, (state, action) => {
				state.posts = state.posts.filter(({ id }) => id !== action.payload.id);
				state.posts.push(action.payload);
				state.status = 'idle';
			})
			.addCase(patchPostAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(putPostAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(putPostAsync.fulfilled, (state, action) => {
				state.posts = state.posts.filter(({ id }) => id !== action.payload.id);
				state.posts.push(action.payload);
				state.status = 'idle';
			})
			.addCase(putPostAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(deletePostAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deletePostAsync.fulfilled, (state, action) => {
				state.posts = state.posts.filter(({ id }) => id !== action.payload);
				state.status = 'idle';
			})
			.addCase(deletePostAsync.rejected, (state) => {
				state.status = 'error';
			});
	},
});

export const { updateFilter, addPost, pickPost } = postSlice.actions;
export const postReducer = postSlice.reducer;

/**
 * we can write "mutating" logic in reducers thanks to immer
 * it checks change made in the provisionary draft state compares
 * it to the single source of truth state and creates a new immutable state
 * based on the changes
 */

/**
 *  The `extraReducers` field lets the slice handle actions defined elsewhere,
 *  including actions generated by createAsyncThunk or in other slices.
 */