import * as React from 'react';

const Donation = () => {
    return(
        <div class="flex w-96 sm:w-5/6 mx-auto">
            <div class="flex flex-row justify-between mx-auto p-4">
                <form class="w-full max-w-lg ">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            First Name
                          </label>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 
                                        leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" required/>
                          <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Last Name
                          </label>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                                        leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                                        type="text" placeholder="" required/>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-donation-amount">
                            Donation Amount $$
                          </label>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                                        leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-donation-amount" 
                                        type="text" placeholder="" required/>
                          <p class="text-gray-600 text-xs italic">Do not include Dollar $$ Sign</p>
                          <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-street-address">
                              Street Address
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                                          leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="street-address" 
                                          type="text" placeholder=""/><br/>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            City
                          </label>
                          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                                        leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" 
                                        type="text" placeholder="Hicksville"/>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            State
                          </label>
                        <div class="relative">
                          <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option>New York</option>
                            <option>New Jersey</option>
                            <option>Maryland</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                        Zip
                      </label>
                      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                                    leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" 
                                    type="text" placeholder="11801"/>
                    </div>
                    </div>
                    <br/>
                    <div class="flex flex-col items-center justify-center">
                      <button class="flex flex-col items-center justify-center bg-sky-800 hover:bg-sky-950 text-white font-bold py-2 px-10 mt-3 rounded">Send message ✉</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Donation