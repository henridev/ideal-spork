import { RootState } from '../../config/store';

const selectUser = (state: RootState) => state.auth.user;

export default selectUser;
