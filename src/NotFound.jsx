// NotFound.js
import { IconGhost } from "@tabler/icons-react";

const NotFound = () => {
  return (
    <div className="to-purple-900 flex h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-900 text-white">
      {/* Ghost Icon */}
      <IconGhost size={80} className="mb-4 animate-bounce text-yellow-500" />

      {/* Title */}
      <h1 className="mb-2 text-6xl font-extrabold">404</h1>

      {/* Subtitle */}
      <p className="mb-6 text-xl text-gray-300">
        Oops! It seems you're lost in space.
      </p>

      {/* Back to Home Button */}
      <a
        href="/"
        className="transform rounded-full bg-pink-600 px-6 py-3 text-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-pink-700"
      >
        Take Me Home
      </a>
    </div>
  );
};

export default NotFound;
