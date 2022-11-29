import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthInfo } from './api/authApi';
import LoginModal from './pages/auth/LoginModal';
import { setUser } from './redux/slices/userSlice';
import AppRoutes from './routes/AppRoutes';

const App = () => {
	const isLogin = useSelector((state) => !!state.user.data.accessToken);
	const dispatch = useDispatch();
	useQuery('user', getAuthInfo, {
		enabled: isLogin,
		onSuccess: (data) => {
			dispatch(setUser(data));
		},
	});

	return (
		<div className="h-screen w-screen overflow-hidden">
			<LoginModal />
			{/* <SocketClient /> */}
			<AppRoutes />
		</div>
	);
};

export default App;
