import Post from '../components/Post';

export default function User() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='my-10 mx-auto px-4 md:px-8 flex h-full w-full flex-col items-center justify-center lg:max-w-screen-md xl:max-w-screen-lg'>
        <div className='flex w-full flex-col rounded-3xl bg-white dark:bg-neutral-600 shadow-md'>
          <div className='relative h-44 w-full rounded-t-3xl bg-gradient-to-r from-rose-100 to-teal-100 dark:from-blue-200 dark:to-purple-400'>
            <div className='absolute -bottom-10 left-12'>
              <div className='group relative h-28 w-28 rounded-full border-2 border-white bg-gray-100'>
                <img
                  src='dummy-image.jpg'
                  alt='Dummy Name'
                  className='h-full w-full rounded-full'
                />
              </div>
            </div>
          </div>
          <div className='mt-10 ml-12 py-4 flex flex-col space-y-1 rounded-b-3xl'>
            <div className=''>
              <div className='text-2xl font-semibold '>Dummy Name</div>
              <div className='italic'>@dummyusername</div>
              <div>100 Posts</div>
              <div className='flex items-center space-x-4'>
                <button onClick={() => {}}>
                  <span>200</span> Followers
                </button>
                <button onClick={() => {}}>
                  <span>150</span> Followings
                </button>
              </div>
              <div className='flex w-full items-center space-x-4 mt-2'>
                <button
                  onClick={() => {}}
                  className='primary-btn'
                >
                  Unfollow
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('URL copied to clipboard 🥳');
                  }}
                  className='secondary-btn'
                >
                  <div>Share</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='my-10 w-full'>
          {[
            { id: 1, title: 'Dummy Post 1' },
            { id: 2, title: 'Dummy Post 2' },
          ].map((post) => (
            <Post key={post.id}>{post.title}</Post>
          ))}
        </div>
      </div>
    </div>
  );
}
