import { useUser } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
        Welcome to Webathon
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Build something amazing for the hackathon!
      </p>
      {isSignedIn ? (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Hello, {user.firstName}!
          </h2>
          <p className="mt-2 text-gray-600">
            Start building your project now.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-gray-600">
            Sign in to get started with your project.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home; 