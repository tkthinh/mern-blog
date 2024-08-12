export default function Sidebar() {
  return (
    <aside className="xl:col-span-4 hidden md:flex md:flex-col w-full h-full sticky top-36 space-y-4 p-6">
      <div>
        <h3 className="my-6 text-md lg:text-lg font-semibold">
          People you might be interested
        </h3>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center space-x-5">
            <div className="h-10 w-10 flex-none rounded-full bg-gray-300"></div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100">Anh Liêm</div>
              <div className="text-xs line-clamp-2 lg:line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                officiis obcaecati minima?
              </div>
            </div>
            <div>
              <button className="flex secondary-btn">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-20">
        <h3 className="my-6 text-lg font-semibold">Your reading list</h3>
        <div className="flex flex-col space-y-8">
          <a href="" className="group flex items-center space-x-6">
            <div className="aspect-square h-full w-2/5 rounded-xl bg-gray-300"></div>
            <div className="flex w-3/5 flex-col space-y-2">
              <div className="text-lg font-semibold decoration-blue-500 group-hover:underline">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                ipsa eveniet et.
              </div>
              <div className="line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                repudiandae placeat eaque illum soluta quisquam nulla ullam
                dolores.
              </div>
              <div className="flex w-full items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div>Anh Liêm &#x2022;</div>
                <div>01/01/2023</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </aside>
  );
}
