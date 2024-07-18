import { Avatar, Dropdown, Navbar, TextInput } from 'flowbite-react';

import { FiEdit } from 'react-icons/fi';
import { CiSearch, CiLight } from 'react-icons/ci';

export default function Header() {
  const status = 'authenticated';

  return (
    <header className='h-18 w-full mb-4 border-b-[1px] shadow-md border-gray-400 bg-white'>
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
            {status === 'authenticated' ? (
              <>
                <button className='hidden md:flex items-center gap-2 rounded-lg border-[2px] border-gray-300 px-4 py-2 transition hover:border-cyan-500 hover:text-gray-900'>
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
                      img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                      rounded
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className='block text-sm'>Bonnie Green</span>
                    <span className='block truncate text-sm font-medium'>
                      name@flowbite.com
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Write Blog</Dropdown.Item>
                  <Dropdown.Item>My Reading List</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <button className='flex items-center rounded border border-gray-300 px-4 py-2 transition hover:border-cyan-500 hover:text-gray-900'>
                Sign in
              </button>
            )}
          </div>
        </div>
      </Navbar>
    </header>
  );
}
