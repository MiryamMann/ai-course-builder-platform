
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isAdmin } = useAuth();
console.log('Navbar user:', user);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            AI Learning Platform
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/lessons">
                  <Button variant="ghost">Lessons</Button>
                </Link>
                <Link to="/history">
                  <Button variant="ghost">History</Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost">Admin Panel</Button>
                  </Link>
                )}
                <span className="text-sm text-gray-600">
                  Welcome {user?.name}
                </span>
                <Button onClick={handleLogout} variant="outline">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
