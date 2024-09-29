import * as React from 'react';

const GeneralMember = ({id,name,expiration}) => {
    return(
        <tr class="border-b border-neutral-00 bg-black/[0.02] dark:border-white/10 hover:bg-cyan-200">
            <td class="capitalize text-black lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 py-1 font-medium">{name}</td>
            <td class="lg:whitespace-nowrap text-black lg:px-6 px-1 lg:py-4 py-1 font-medium">{expiration}</td>
            <td class="lg:whitespace-nowrap text-black lg:px-6 px-1 lg:py-4 py-1 font-medium">General</td>
        </tr>
    )
}

export default GeneralMember


