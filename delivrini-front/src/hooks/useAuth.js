import { useAppSelector } from '../store/hooks';
//

// ----------------------------------------------------------------------

const useAuth = () => {
  const userInfo = useAppSelector((state) => state.authReducer.userInfo);

  return { user: userInfo };
};

export default useAuth;
