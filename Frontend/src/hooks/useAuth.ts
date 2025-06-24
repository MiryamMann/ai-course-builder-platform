
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isAdmin: auth.user?.isAdmin === true,
    loading: auth.loading,
    error: auth.error
  };
};
