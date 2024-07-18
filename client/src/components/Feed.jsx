import Post from './Post';

export default function Feed() {
  return (
    <main className="xl:col-span-8 h-full w-full xl:border-r border-gray-400 px-4 xl:px-10">
        <h2 className='py-4 mb-4 text-xl'>Articles</h2>
        <div className='space-y-4'>
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </main>
  )
}
