import Post from "../components/Post";

export default function User() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='my-10 mx-auto px-4 md:px-8 flex h-full w-full flex-col items-center justify-center lg:max-w-screen-md xl:max-w-screen-lg'>
        <div className='flex w-full flex-col rounded-3xl bg-white shadow-md'>
          <div className='relative h-44 w-full rounded-t-3xl bg-gradient-to-r from-rose-100 to-teal-100'>
            <div className='absolute -bottom-10 left-12'>
              <div className='group relative h-28 w-28 rounded-full border-2 border-white bg-gray-100'>
                {true && ( // Replace with currentUser.data?.user?.id === userProfile.data?.id
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
                )}
                {!true && ( // Replace with !objectImage && userProfile.data?.image
                  <img
                    src='dummy-image.jpg' // Replace with userProfile.data?.image
                    alt='Dummy Name' // Replace with userProfile.data?.name ?? ""
                    className='h-full w-full rounded-full'
                  />
                )}
                {true && ( // Replace with objectImage
                  <img
                    src='dummy-object-image.jpg' // Replace with objectImage
                    alt='Dummy Name' // Replace with userProfile.data?.name ?? ""
                    className='rounded-full'
                  />
                )}
              </div>
            </div>
          </div>
          <div className='mt-10 ml-12 flex flex-col space-y-0.5 rounded-b-3xl py-4'>
            <div className='text-2xl font-semibold text-gray-800'>
              Dummy Name
            </div>
            <div className='text-gray-600'>@dummyusername</div> 
            <div className='text-gray-600'>100 Posts</div> 
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => {}}
                className='text-gray-700 hover:text-gray-900'
              >
                <span className='text-gray-900'>200</span> Followers
              </button>
              <button
                onClick={() => {}}
                className='text-gray-700 hover:text-gray-900'
              >
                <span className='text-gray-900'>150</span> Followings
              </button>
            </div>
            <div className='flex w-full items-center space-x-4'>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('URL copied to clipboard 🥳'); // Replace toast.success with alert for simplicity
                }}
                className='mt-2 flex transform items-center space-x-3 rounded border border-gray-200 px-4 py-2 transition hover:border-gray-900 hover:text-gray-900 active:scale-95 '
              >
                <div>Share</div>
              </button>
              {true && ( // Replace with userProfile.isSuccess && userProfile.data?.followedBy
                <button
                  onClick={() => {}}
                  className='mt-2 flex items-center space-x-3 rounded border border-gray-400/50 bg-white px-4 py-2 transition hover:border-gray-900 hover:text-gray-900'
                >
                  Unfollow
                </button>
              )}
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
