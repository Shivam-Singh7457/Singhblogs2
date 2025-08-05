import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import AdPlaceholder from '../components/AdPlaceholder';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/post/getPosts`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Hero section */}
      <div className='flex flex-col gap-6 pt-24 pb-10 px-3 max-w-6xl mx-auto text-center'>
        <h1 className='text-4xl font-extrabold lg:text-6xl'>Blogging Beyond Boundaries</h1>
        <p className='text-gray-500 text-sm sm:text-base'>
          Unleash Your Voice, Ignite Your Passion
        </p>

        {/* Links to View Posts and Create Post */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Link
            to='/search'
            className='text-sm sm:text-base text-teal-500 font-bold hover:underline'
          >
            View all posts
          </Link>
          <Link to='/create-post'>
            <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-md shadow hover:scale-105 transition'>
              Create a Post
            </button>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className='p-4 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      {/* Posts Section */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {posts.length > 0 && (
          <div className='flex flex-col gap-10'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>

            {/* Grid of posts */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {posts.map((post, index) => (
                <div key={post._id} className='w-full'>
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            {/* Ad banners after every 3 posts */}
            <div className='flex flex-col gap-10'>
              {posts.map((_, index) =>
                (index + 1) % 3 === 0 ? (
                  <div key={`ad-${index}`} className='w-full flex justify-center'>
                    <AdPlaceholder
                      image='/assets/banner728x90.jpg'
                      size='728x90'
                      label='Sponsored Ad'
                    />
                  </div>
                ) : null
              )}
            </div>

            {/* View all posts button at the bottom */}
            <Link
              to='/search'
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
