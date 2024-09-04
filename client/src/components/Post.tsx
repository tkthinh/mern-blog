import React from 'react';
import { CiBookmarkCheck, CiBookmarkPlus } from 'react-icons/ci';

interface PostProp {
  postInfo: PostInfo;
}

interface PostInfo {
  id: string;
  title: string;
  poster: string;
  createdAt: string;
  description: string,
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
}

const Post: React.FC<PostProp> = ({ postInfo }) => {
  return (
    <div
      className='flex flex-col space-y-4 border-b border-gray-300 py-4 last:border-none'
    >
      <a
        href={`/user/${postInfo.author.id}`}
        className='group flex w-full cursor-pointer items-center space-x-2'
      >
        <div className='relative'>
          <img className='rounded-xl h-10 w-10' src={postInfo.author.photoUrl}/>
        </div>
        <div>
          <p className='font-semibold'>
            <span className='decoration-blue-500 group-hover:underline'>{postInfo.author.username}</span>{' '}
            &#x2022;
            <span className='mx-1'>{new Date(postInfo.createdAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}</span>
          </p>

          <p className='text-sm'>Founder, teacher & developer</p>
        </div>
      </a>
      <a
        href={`/post/${postInfo.id}`}
        className='group flex flex-col md:grid md:grid-cols-12 md:h-44 h-80 w-full gap-4 overflow-hidden'
      >
        <div className='block md:col-span-8 md:flex md:h-full w-full flex-col space-y-4'>
          <p className='text-2xl font-bold font-slab text-gray-800 dark:text-gray-50 decoration-blue-500 group-hover:underline'>
            {postInfo.title}
          </p>
          <p className='line-clamp-3 md:line-clamp-5 text-sm text-gray-500 dark:text-gray-300'>
            {postInfo.description}
          </p>
        </div>
        <div className='w-full h-full md:col-span-4'>
          <div>
            <img className='h-full w-full transform rounded-xl bg-gray-300 transition duration-300 hover:scale-105 hover:shadow-xl' src={postInfo.poster}/>
          </div>
        </div>
      </a>
      <div>
        <div className='flex w-full items-center justify-between space-x-4'>
          <div className='flex items-center space-x-2'>
            {postInfo.postTags.map((tag) => (
              <div key={`/search/tag?=${tag.tagId}`} className='rounded-2xl bg-gray-200/50 px-5 py-3'>
                {tag.tag.name}
              </div>
            ))}
          </div>
          <div>
            <CiBookmarkCheck className='cursor-pointer text-3xl text-blue-500' />
            <CiBookmarkPlus className='cursor-pointer text-3xl' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;