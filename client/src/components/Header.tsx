import { Avatar, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { FiEdit } from 'react-icons/fi';
import { CiSearch, CiLight } from 'react-icons/ci';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';

import { toggleTheme } from '../redux/themeSlice';
import { userClear } from '../redux/userSlice';

export default function Header() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignout() {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      dispatch(userClear());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header
      className='h-18 w-full mb-4 border-b-[1px] shadow-sm border-gray-300 bg-white'
    >
      <Navbar fluid rounded className='dark:text-gray-200 dark:bg-neutral-800'>
        <Navbar.Brand href='/' className=''>
          <div className='flex items-center justify-between gap-1 text-xl font-bold uppercase tracking-wide'>
            <span className='text-gray-600 dark:text-gray-200'>Blog</span>
            <span className='rounded-lg px-1 py-0.5 bg-gray-600 text-white dark:bg-gray-200 dark:text-gray-600'>
              Field
            </span>
          </div>
        </Navbar.Brand>
        <TextInput
          className='hidden md:block '
          id='search'
          placeholder='Search...'
          icon={CiSearch}
          required
        />
        <div className='flex gap-x-4 md:order-2'>
          <div className='flex gap-x-4 md:order-2'>
            <button className='text-2xl' onClick={() => dispatch(toggleTheme())}>
              <CiLight />
            </button>
            {currentUser ? (
              <>
                <button
                  className='hidden md:flex primary-btn'
                  onClick={() => navigate('/new-post')}
                >
                  Write
                  <div>
                    <FiEdit />
                  </div>
                </button>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<Avatar alt='User settings' img={currentUser.photoUrl} rounded />}
                >
                  <Dropdown.Header>
                    <span className='block text-sm font-bold'>@{currentUser.username}</span>
                    <span className='block truncate text-sm font-medium'>
                      {currentUser.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item href={`/user/${currentUser.id}`}>Profile</Dropdown.Item>
                  <Dropdown.Item href={'/new-post'}>Create Post</Dropdown.Item>
                  <Dropdown.Item href={'/reading-list'}>My Reading List</Dropdown.Item>
                  <Dropdown.Item href={'/setting'}>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <button className='flex secondary-btn' onClick={() => navigate('/signin')}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </Navbar>
    </header>
  );
}
