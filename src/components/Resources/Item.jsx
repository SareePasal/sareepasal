import * as React from 'react';
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function IndividualItem({items}){
    let source = await RemoteMdxPage(items.content)
    return(
      <article class="p-4 flex flex-col justify-between gap-2 border rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-400/40 text-align: left;  leading-4">
        <Link  href={`/Resource/${encodeURIComponent(items.id)}`}>
          <header class="text-center p-2 md:p-4 font-bold text-gray-500 dark:text-white">
              <h1 class="text-lg">
                {items.Title}
              </h1>
          </header>
          <div class="m-4 text-sm md:text-sm font-semibold text-gray-500  line-clamp-2 md:line-clamp-4 hover:line-clamp-4 dark:text-white">
            {source}
          </div>
          <footer class="flex items-center justify-between leading-none p-5 md:p-4 text-gray-500 dark:text-white">
              <p class="ml-2 text-sm">
                  LINS
              </p>
              <p class="text-grey-darker text-sm">
                {items.Date}
            </p>
          </footer>
        </Link>
      </article> 
    )
}


async function RemoteMdxPage(markdown) {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  return <MDXRemote source={markdown} />
}
