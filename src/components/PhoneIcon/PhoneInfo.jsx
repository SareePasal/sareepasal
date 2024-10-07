import * as React from 'react';

export default function PhoneIcon () {
  return (
    <div>
      <a class="text-black" href="tel:347-771-2375">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 my-2 px-5 rounded-lg">
            <svg class="h-10 w-10 text-black" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">  
                <path stroke="none" d="M0 0h24v24H0z"/>
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 7a2 2 0 0 1 2 2" />
                <path d="M15 3a6 6 0 0 1 6 6" />
            </svg></button></a>
           <a class="text-black text-sm  dark:text-blue-950 font-bold" href="tel:347-771-2375">
            <br/>To make an order Call using above button</a>
        </div>
  );
}
