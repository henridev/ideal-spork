import api from '../../config/network';
import { Post } from './post.state';

const prefixUrl = 'http://localhost:4001';
const prefix = 'posts';

export const getPostById = async (id: number): Promise<Post> => {
	const res = await api.get(`${prefix}/${id}`, { prefixUrl });
	return res.json();
};

export const getAllPosts = async (): Promise<Post[]> => {
	const res = await api.get(prefix, { prefixUrl });
	return res.json();
};

export const postPost = async (post: Post): Promise<Post> => {
	const res = await api.post(prefix, { prefixUrl, json: post });
	return res.json();
};

export const putPost = async (post: Post): Promise<Post> => {
	const res = await api.put(`${prefix}/${post.id}`, { prefixUrl, json: post });
	return res.json();
};

export const patchPost = async (post: Partial<Post>): Promise<Post> => {
	const res = await api.patch(`${prefix}/${post.id}`, { prefixUrl, json: post });
	return res.json();
};

export const deletePost = async (id: number): Promise<boolean> => {
	const res = await api.delete(`${prefix}/${id}`, { prefixUrl });
	return res.json();
};
