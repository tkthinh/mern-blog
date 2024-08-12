import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { Button } from 'flowbite-react';

export default function () {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className='flex min-h-full flex-col justify-center gap-y-10 max-w-lg mx-auto'>
      <div className='p-6 lg:px-8 bg-slate-100 dark:bg-neutral-600 shadow-sm rounded'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight'>
            User Info
          </h2>
        </div>

        <div className='group relative h-28 w-28 sm:mx-auto rounded-full border-2 border-white bg-gray-100 text-black dark:bg-gray-500 dark:text-white'>
          <label
            htmlFor='avatarFile'
            className='absolute z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-full transition group-hover:bg-black/40'
          >
            <span className='hidden text-3xl text-white group-hover:block'>
              Edit
            </span>{' '}
            <input
              type='file'
              name='avatarFile'
              id='avatarFile'
              className='sr-only'
              accept='image/*'
              onChange={() => {}}
              multiple={false}
            />
          </label>
          <img
            src={currentUser?.photoUrl}
            alt={`${currentUser?.username}'s Avatar`}
            className='rounded-full border-[4px] border-gray-400'
          />
        </div>

        {/* <div className='w-32 h-32 sm:mx-auto'>
          <img
            src={currentUser?.photoUrl}
            alt={`${currentUser?.username}'s Avatar`}
            className='rounded-full border-[4px] border-gray-400'
          />
        </div> */}

        <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6'>
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6'
              >
                Username
              </label>
              <div>
                <input
                  id='username'
                  name='username'
                  type='text'
                  disabled
                  placeholder={currentUser?.username}
                  className='cursor-not-allowed block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6'
              >
                Email address
              </label>
              <div>
                <input
                  id='email'
                  name='email'
                  type='email'
                  disabled
                  placeholder={currentUser?.email}
                  className='cursor-not-allowed block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='p-6 lg:px-8 bg-slate-100 dark:bg-neutral-600 shadow-sm rounded'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='text-center text-2xl font-bold leading-9 tracking-tight'>
            Change Your Password
          </h2>
        </div>

        <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6'>
            <div>
              <label
                htmlFor='current-password'
                className='block text-sm font-medium leading-6'
              >
                Current Password
              </label>
              <div>
                <input
                  id='current-password'
                  name='current-password'
                  type='password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='new-password'
                className='block text-sm font-medium leading-6'
              >
                New Password
              </label>
              <div>
                <input
                  id='new-password'
                  name='new-password'
                  type='password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='confirm-password'
                className='block text-sm font-medium leading-6'
              >
                Confirm New Password
              </label>
              <div>
                <input
                  id='confirm-password'
                  name='confirm-password'
                  type='password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <button className='w-full primary-btn'>Change Password</button>
          </form>
        </div>
      </div>

      <Button color='failure'>Delete Account</Button>
    </div>
  );
}
