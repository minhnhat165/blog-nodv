import { IconButton } from '@mui/material';
import MenuTrigger from '../../../components/MenuTrigger/MenuTrigger';
import PostMenu from './PostPreview/PostPreviewMenu';

const PostAction = () => {
	return (
		<div className="flex gap-2">
			<IconButton size="small" className="h-8 w-8">
				<i className="fa-light fa-bookmark"></i>
			</IconButton>
			<IconButton size="small" className="h-8 w-8">
				<i className="fa-light fa-circle-minus"></i>
			</IconButton>

			<MenuTrigger>
				<PostMenu />
			</MenuTrigger>
		</div>
	);
};

export default PostAction;