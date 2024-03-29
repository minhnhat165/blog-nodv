import { PostListFetch } from '../../../features/post/components';
import { getPosts } from '../../../api/postApi';
import { useSearchParams } from 'react-router-dom';

const StoriesTab = () => {
	const [searchParams] = useSearchParams();
	const storeKey = ['posts', searchParams.get('query')];

	return (
		<PostListFetch
			filter={{
				title: searchParams.get('query'),
			}}
			queryKey={storeKey}
			queryFn={getPosts}
		/>
	);
};

export default StoriesTab;
