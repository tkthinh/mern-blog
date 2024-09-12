import { PostInfo } from '@type/global';

interface SidebarProps {
  bookmarkedPosts: PostInfo[];
}

export default function Sidebar({ bookmarkedPosts }: SidebarProps) {
  return (
    <aside className='xl:col-span-4 hidden md:flex md:flex-col w-full h-full sticky top-36 space-y-4 p-6'>
      <div>
        <h3 className='my-6 text-md lg:text-lg font-semibold'>
          People you might be interested
        </h3>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-row items-center space-x-5'>
            <div className='h-10 w-10 flex-none rounded-full bg-gray-300'></div>
            <div>
              <div className='text-sm font-bold text-gray-900 dark:text-gray-100'>Anh Liêm</div>
              <div className='text-xs line-clamp-2 lg:line-clamp-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum officiis obcaecati
                minima?
              </div>
            </div>
            <div>
              <button className='flex secondary-btn'>Follow</button>
            </div>
          </div>
        </div>
      </div>

      <div className='sticky top-20'>
        <h3 className='my-6 text-lg font-semibold'>Your reading list</h3>
        {bookmarkedPosts?.length > 0 ? (
          bookmarkedPosts.map((post) => (
            <div key={post.id} className='flex flex-col space-y-8 mb-4'>
              <a href={`/post/${post.id}`} className='group flex items-center space-x-6'>
                <div className='aspect-square h-full w-2/5 rounded-xl'>
                  <img src={post.poster} alt={post.title} />
                </div>
                <div className='flex w-3/5 flex-col space-y-2'>
                  <div className='text-lg font-semibold decoration-blue-500 group-hover:underline'>
                    {post.title}
                  </div>
                  <div className='line-clamp-2'>{post.description}</div>
                  <div className='flex w-full items-center space-x-4'>
                    <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <p>You have no bookmarks yet.</p>
        )}
      </div>
    </aside>
  );
}
