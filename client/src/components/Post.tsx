import { CiBookmarkCheck, CiBookmarkPlus } from "react-icons/ci";

export default function Post() {
  return (
    <div
      key="dummyPostId"
      className="flex flex-col space-y-4 border-b border-gray-300 py-4 last:border-none"
    >
      <a
        href="/user/dummyUsername"
        className="group flex w-full cursor-pointer items-center space-x-2"
      >
        <div className="relative h-10 w-10 rounded-full bg-gray-400">
          <div className="rounded-xl"></div>
        </div>
        <div>
          <p className="font-semibold">
            <span className="decoration-blue-500 group-hover:underline">
              Dummy Author
            </span>{" "}
            &#x2022;
            <span className="mx-1">01/01/2023</span>
          </p>

          <p className="text-sm">Founder, teacher & developer</p>
        </div>
      </a>
      <a
        href="/dummyPostSlug"
        className="group flex flex-col md:grid md:grid-cols-12 md:h-44 h-80 w-full gap-4 overflow-hidden"
      >
        <div className="block md:col-span-8 md:flex md:h-full w-full flex-col space-y-4">
          <p className="text-2xl font-bold font-slab text-gray-800 dark:text-gray-50 decoration-blue-500 group-hover:underline">
            Dummy Post Title
          </p>
          <p className="line-clamp-3 md:line-clamp-5 text-sm text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
            dolorem repudiandae, soluta accusamus velit provident temporibus
            dignissimos delectus? Alias, velit voluptas dolore asperiores soluta
            molestias ad iusto nulla dolor consectetur ex assumenda fuga eius
            deleniti inventore culpa labore praesentium tempora. Necessitatibus
            blanditiis corrupti ullam non animi iure quam porro sapiente
            molestias magni cumque, debitis ab fugiat ipsa itaque facere harum
            quibusdam, quasi aliquid esse. Adipisci minus recusandae nihil quae
            voluptatum incidunt veritatis, aut facilis consectetur molestias
            ipsa provident corrupti necessitatibus modi eveniet odio inventore
            ipsam consequuntur consequatur error eaque labore ipsum voluptatem
            ea! Velit nostrum qui doloremque, nisi commodi exercitationem
            eveniet asperiores quia incidunt obcaecati distinctio magnam
            similique. Totam modi mollitia exercitationem maiores vero aut.
            Reprehenderit molestias sint ea aliquam, esse nostrum ut officiis.
          </p>
        </div>
        <div className="w-full h-full md:col-span-4">
          <div className="h-full w-full transform rounded-xl bg-gray-300 transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="rounded-xl"></div>
          </div>
        </div>
      </a>
      <div>
        <div className="flex w-full items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            {["Tag1", "Tag2", "Tag3"].map((tag, index) => (
              <div
                key={`dummyTagId-${index}`}
                className="rounded-2xl bg-gray-200/50 px-5 py-3"
              >
                {tag}
              </div>
            ))}
          </div>
          <div>
            <CiBookmarkCheck className="cursor-pointer text-3xl text-blue-500" />
            <CiBookmarkPlus className="cursor-pointer text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
