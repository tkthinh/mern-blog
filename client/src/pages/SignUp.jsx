import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  function handleFormInput(event) {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return setErrorMessage(data.message);
      }

      navigate('/signin');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Create an account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Username
            </label>
            <div className='mt-2'>
              <input
                id='username'
                name='username'
                type='text'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6'
                onChange={handleFormInput}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6'
                onChange={handleFormInput}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Password
            </label>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6'
                onChange={handleFormInput}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='confirm-password'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Confirm password
            </label>
            <div className='mt-2'>
              <input
                id='confirm-password'
                name='confirm-password'
                type='password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6'
                onChange={handleFormInput}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500'
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='px-2'>Loading...</span>
                </>
              ) : (
                'Sign up'
              )}
            </button>
          </div>

          <div>
            {errorMessage && (
              <Alert color='failure' icon={HiInformationCircle}>
                <span className='font-medium'>{errorMessage}</span>
              </Alert>
            )}
          </div>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Already a member?
          <a
            href='/signin'
            className='font-semibold leading-6 text-cyan-500 hover:text-cyan-400'
          >
            {' '}
            Sign in now!
          </a>
        </p>
      </div>
    </div>
  );
}
