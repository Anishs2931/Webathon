import { Link } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Webathon
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            {isSignedIn ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <SignInButton mode="modal">
                  <button className="text-blue-600 hover:text-blue-700">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 