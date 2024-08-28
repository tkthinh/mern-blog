import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { actionStart, actionSuccess, actionFailed } from '../redux/actionSlice';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

interface PostData {
  id: string;
  title: string;
  content: string;
  poster: string;
  authorId: string;
  createdAt: Date;
  postTags: {
    tagId: string;
    tag: {
      name: string;
    };
  }[];
}

export default function PostDetail() {
  const { id } = useParams();

  const [postData, setPostData] = useState<PostData>();

  const { loading, error: errorMessage } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(actionStart());
        const res = await fetch(`/api/post/p/${id}`);

        const data = await res.json();
        if (!res.ok) {
          return dispatch(actionFailed(data.message));
        }
        setPostData(data);
        dispatch(actionSuccess(data.message));
      } catch (error) {
        dispatch(actionFailed((error as Error).message));
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className='my-2 sm:mx-auto sm:w-full sm:max-w-sm h-6'>
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
      {postData && (
        <div className='mx-auto max-w-6xl flex flex-col gap-6 p-4 md:px-8 md:py-6'>
          <div className='w-full h-auto md:h-[50vh]'>
            <img
              src={postData.poster}
              alt='Poster'
              className='w-full h-full mx-auto aspect-[21/9] object-cover rounded'
            />
          </div>
          <h1>{postData.title}</h1>
          <div className='flex gap-x-3'>
            {postData.postTags.map((tag) => (
              <a className='underline' key={tag.tagId} href={`/t/${tag.tagId}`}>
                #{tag.tag.name}
              </a>
            ))}
          </div>
          {parse(postData.content)}
        </div>
      )}
    </>
  );
}
