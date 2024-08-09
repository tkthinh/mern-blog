import { Avatar, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { FiEdit } from 'react-icons/fi';
import { CiSearch, CiLight } from 'react-icons/ci';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../redux/store';

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate()

  return (
    <header className='h-18 w-full mb-4 border-b-[1px] shadow-sm border-gray-300 bg-white'>
      <Navbar fluid rounded>
        <Navbar.Brand href='/' className=''>
          <div className='flex items-center justify-between gap-1 text-xl font-bold uppercase tracking-wide'>
            <span className='text-gray-600'>Blog</span>
            <span className='rounded-lg bg-gray-600 px-1 py-0.5 text-white'>
              Field
            </span>
          </div>
        </Navbar.Brand>
        <TextInput
          className='hidden md:block'
          id='search'
          placeholder='Search...'
          icon={CiSearch}
          required
        />
        <div className='flex gap-x-4 md:order-2'>
          <div className='flex gap-x-4 md:order-2'>
            <button className='text-2xl'>
              <CiLight />
            </button>
            {currentUser ? (
              <>
                <button className='hidden md:flex items-center gap-2 rounded border border-gray-300 px-4 py-2 transition hover:border-cyan-500 hover:text-gray-900'>
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
              <button className='flex items-center rounded border border-gray-300 px-4 py-2 transition hover:border-cyan-500 hover:text-gray-900' onClick={() => navigate('/signin')}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </Navbar>
    </header>
  );
}
