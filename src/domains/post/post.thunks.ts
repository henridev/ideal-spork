import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../../config/store';
import { getPostById, getAllPosts, postPost, putPost, patchPost, deletePost } from './post.api';
import { addPost } from './post.slice';
import { Post } from './post.state';

/**
 * thunk and allows us to perform async logic.
 * - can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
 * - will call the thunk with the `dispatch` function as the first argument.
 * - code can then be executed and other actions can be dispatched.
 * (Thunks are typically used to make async requests.)
 */

const getAllPostsPayloadCreator = async () => {
	const posts = await getAllPosts();
	return posts;
};

export const getAllPostsAsync = createAsyncThunk(
	'post/getAllPosts',
	getAllPostsPayloadCreator,
);

const getPostByIdPayloadCreator = async (id: number) => {
	const post = await getPostById(id);
	return post;
};

export const getPostByIdAsync = createAsyncThunk(
	'post/getPostById',
	getPostByIdPayloadCreator,
);

const createPostPayloadCreator = async (post: Post) => {
	const createdPost = await postPost(post);
	return createdPost;
};

export const createPostAsync = createAsyncThunk(
	'post/createPost',
	createPostPayloadCreator,
);

const putPostPayloadCreator = async (post: Post) => {
	const updatedPost = await putPost(post);
	return updatedPost;
};

export const putPostAsync = createAsyncThunk(
	'post/putPost',
	putPostPayloadCreator,
);

const patchPostPayloadCreator = async (post: Partial<Post>) => {
	const updatedPost = await patchPost(post);
	return updatedPost;
};

export const patchPostAsync = createAsyncThunk(
	'post/patchPost',
	patchPostPayloadCreator,
);

const deletePostPayloadCreator = async (id: number) => {
	const isSuccess = await deletePost(id);
	if (!isSuccess) throw Error('error deleting post');
	return id;
};

export const deletePostAsync = createAsyncThunk(
	'post/deletePost',
	deletePostPayloadCreator,
);

// thunks by hand, which may contain both sync and async logic
export const addPostByIfNotExists = (newPost: Post): AppThunk => async (
	dispatch,
	getState,
) => {
	const { post: postState } = getState();
	if (postState.posts.map(({ id }) => id).includes(newPost.id)) {
		throw Error('post already exists');
	}
	const postCreated = await postPost(newPost);
	dispatch(addPost(postCreated));
};
