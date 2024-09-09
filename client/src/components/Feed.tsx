import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { actionStart, actionSuccess, actionFailed } from '../redux/actionSlice';

import Post from './Post';
import { Alert, Spinner } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

interface PostInfo {
  id: string;
  title: string;
  poster: string;
  createdAt: string;
  description: string;
  author: {
    id: string;
    username: string;
    photoUrl: string;
  };
  postTags: {
    tagId: string;
    tag: {
      name: string;
    };
  }[];
  bookmarks: {
    id: string;
  };
}

export default function Feed() {
  const [posts, setPosts] = useState<PostInfo[]>();

  const [showMore, setShowMore] = useState<boolean>(true);

  const { currentUser } = useSelector((state: RootState) => state.user);
  const { loading, error: errorMessage } = useSelector((state: RootState) => state.action);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(actionStart());
        const res = await fetch(`/api/post/get`);

        const data = await res.json();
        if (!res.ok) {
          return dispatch(actionFailed(data.message));
        }
        if (data.results.length < 6) {
          setShowMore(false);
        }

        setPosts(data.results);
        dispatch(actionSuccess(data.message));
      } catch (error) {
        dispatch(actionFailed((error as Error).message));
      }
    };

    fetchData();
  }, []);

  async function handleShowMore() {
    const startIndex = posts?.length;
    try {
      dispatch(actionStart());
      const res = await fetch(`/api/post/get?startIndex=${startIndex}`);
      const data = await res.json();
      if (!res.ok) {
        return dispatch(actionFailed(data.message));
      }
      if (data.results.length < 6) {
        setShowMore(false);
      }
      setPosts((prev) => [...(prev || []), ...data.results]);
      dispatch(actionSuccess(data.message));
    } catch (error) {
      dispatch(actionFailed((error as Error).message));
    }
  }

  return (
    <main className='xl:col-span-8 h-full w-full xl:border-r border-gray-400 px-4 xl:px-10'>
      <h2 className='py-4 mb-4 text-xl'>Articles</h2>
      <div className='my-2 sm:mx-auto sm:w-full sm:max-w-sm'>
        {errorMessage && (
          <Alert color='failure' icon={HiInformationCircle}>
            <span className='font-medium'>{errorMessage}</span>
          </Alert>
        )}
        {loading ? (
          <div className='text-center'>
            <Spinner size='xl' />
          </div>
        ) : null}
      </div>
      <div className='space-y-4'>
        {posts &&
          posts.map((post) => (
            <Post key={post.id} postInfo={post} user={currentUser ? currentUser : undefined} />
          ))}
      </div>
      <div className='flex items-center justify-between mb-6'>
        {showMore && (
          <button className='secondary-btn mx-auto' onClick={handleShowMore}>
            Show more
          </button>
        )}
      </div>
    </main>
  );
}
