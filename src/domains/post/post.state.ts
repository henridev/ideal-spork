export interface Post {
	author: string,
	id: number,
	title: string,
	body: string
}

export interface PostFilters extends Partial<Post> { }

export interface PostState {
	posts: Post[];
	filters: PostFilters
	status: 'idle' | 'loading' | 'error'
	selectedPost?: Post
}

const postState: PostState = {
	posts: [],
	filters: {},
	status: 'idle',
};

export default postState;
