import { useDispatch, useSelector } from 'react-redux';
import { actionFailed, actionStart, actionSuccess } from '../redux/actionSlice';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';

interface Bookmark {
  id: string;
  post: Post;
  user: User;
}

interface User {
  username: string;
  photoUrl: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  authorId: string;
  slug: string;
  poster: string;
  createdAt: string;
  updatedAt: string;
}

export default function Sidebar() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);

  const [bookmarkLists, setBookmarkLists] = useState<Bookmark[]>([]);

  if (currentUser) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch(actionStart());
          const res = await fetch(`/api/ix/get/bookmark?userId=${currentUser.id}`);

          const data = await res.json();
          if (!res.ok) {
            return dispatch(actionFailed(data.message));
          }

          setBookmarkLists(data);
          dispatch(actionSuccess(data.message));
        } catch (error) {
          dispatch(actionFailed((error as Error).message));
        }
      };

      fetchData();
    }, []);
  }

  return (
    <aside className='xl:col-span-4 hidden md:flex md:flex-col w-full h-full sticky top-36 space-y-4 p-6'>
      <div>
        <h3 className='my-6 text-md lg:text-lg font-semibold'>
          People you might be interested
        </h3>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-row items-center space-x-5'>
            <div className='h-10 w-10 flex-none rounded-full bg-gray-300'></div>
            <div>
              <div className='text-sm font-bold text-gray-900 dark:text-gray-100'>Anh Liêm</div>
              <div className='text-xs line-clamp-2 lg:line-clamp-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum officiis obcaecati
                minima?
              </div>
            </div>
            <div>
              <button className='flex secondary-btn'>Follow</button>
            </div>
          </div>
        </div>
      </div>
      <div className='sticky top-20'>
        <h3 className='my-6 text-lg font-semibold'>Your reading list</h3>
        {bookmarkLists?.length > 0 ?
          bookmarkLists.map((bookmark) => (
            <div className='flex flex-col space-y-8 mb-4'>
              <a href={`/post/${bookmark.post.id}`} className='group flex items-center space-x-6'>
                <div className='aspect-square h-full w-2/5 rounded-xl'>
                <img src={bookmark.post.poster} /></div>
                <div className='flex w-3/5 flex-col space-y-2'>
                  <div className='text-lg font-semibold decoration-blue-500 group-hover:underline'>
                    {bookmark.post.title}
                  </div>
                  <div className='line-clamp-2'>
                    {bookmark.post.description}
                  </div>
                  <div className='flex w-full items-center space-x-4'>
                    <div>{new Date(bookmark.post.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </a>
            </div>
          )) : (<p>You have no bookmark yet.</p>)}
      </div>
    </aside>
  );
}
