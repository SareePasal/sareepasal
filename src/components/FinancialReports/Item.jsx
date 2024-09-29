import * as React from 'react';
import Link from 'next/link'

export default async function IndividualItem({title,location}){
    return(
      <article class="p-4 flex flex-col justify-between gap-2 border rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-gray-400/40 text-align: left;  leading-4">
        <Link  href={`/FinancialReports/${encodeURIComponent(location)}`}>
          <header class="text-center p-2 md:p-4 font-bold text-gray-500 dark:text-white">
              <h1 class="text-lg">
                {title}
              </h1>
          </header>
          <footer class="flex items-center justify-between leading-none p-5 md:p-4 text-gray-500 dark:text-white">
              <p class="ml-2 text-sm">
                  LINS
              </p>
          </footer>
        </Link>
      </article> 
    )
}
