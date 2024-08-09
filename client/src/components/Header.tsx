import { Avatar, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { FiEdit } from 'react-icons/fi';
import { CiSearch, CiLight } from 'react-icons/ci';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../redux/store';

import {toggleTheme} from '../redux/themeSlice'

export default function Header() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <header className='h-18 w-full mb-4 border-b-[1px] shadow-sm border-gray-300 bg-white'>
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
                <button className='hidden md:flex items-center gap-2 px-4 py-2 rounded border transition border-blue-500 hover:bg-blue-500 hover:text-white'>
                  Write
                  <div>
                    <FiEdit />
                  </div>
                </button>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                      alt='User settings'
                      img= {currentUser.photoUrl}
                      rounded
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className='block text-sm font-bold'>@{currentUser.username}</span>
                    <span className='block truncate text-sm font-medium'>
                    {currentUser.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item><Link to={'/'}>Dashboard</Link></Dropdown.Item>
                  <Dropdown.Item><Link to={'/'}>Create Post</Link></Dropdown.Item>
                  <Dropdown.Item><Link to={'/'}>My Reading List</Link></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <button className='flex items-center rounded border px-4 py-2 transition border-blue-500 hover:bg-blue-500 hover:text-white' onClick={() => navigate('/signin')}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </Navbar>
    </header>
  );
}
