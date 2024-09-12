import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { actionFailed, actionStart, actionSuccess } from '../redux/actionSlice';

import { PostInfo } from '@type/global';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [bookmarkedPosts, setBookmarkedPosts] = useState<PostInfo[]>([]);

  useEffect(() => {
    if (currentUser) {
      const fetchBookmarks = async () => {
        try {
          dispatch(actionStart());
          const res = await fetch(`/api/ix/get/bookmark?userId=${currentUser.id}`);
          const data = await res.json();
          if (!res.ok) {
            return dispatch(actionFailed(data.message));
          }
          setBookmarkedPosts(data.map((bookmark: { post: PostInfo }) => bookmark.post));
          dispatch(actionSuccess(data.message));
        } catch (error) {
          dispatch(actionFailed((error as Error).message));
        }
      };

      fetchBookmarks();
    }
  }, [currentUser, dispatch]);

  const handleBookmarkChange = (postInfo: PostInfo, isBookmarked: boolean) => {
    if (isBookmarked) {
      setBookmarkedPosts((prev) => [...prev, postInfo]);
    } else {
      setBookmarkedPosts((prev) => prev.filter((post) => post.id !== postInfo.id));
    }
  };

  return (
    <div className='xl:grid xl:grid-cols-12'>
      <Feed onBookmarkChange={handleBookmarkChange} />
      {currentUser && <Sidebar bookmarkedPosts={bookmarkedPosts} />}
    </div>
  );
};

export default Home;
