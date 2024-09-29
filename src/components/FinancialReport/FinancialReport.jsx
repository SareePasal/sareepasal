import * as React from 'react';



function FinancialReporting ({title,content,heading,balanceHeading}){
    const contTable = []
    const bHeading = 
    <thead class=" hover:bg-cyan-600 bg-sky-500/100 ">    
            <tr class="">   
                <th scope="col" class=" md:px-6  md:py-4 ">
                    <span class="text-xs">{balanceHeading[0]}</span></th>
                <th scope="col" class=" sm:font-bold md:px-6  md:py-4 text-xs">{balanceHeading[1]}</th>
                <th scope="col" class=" sm:font-bold md:px-6  md:py-4 text-sm">{balanceHeading[2]}</th>
                <th scope="col" class=" sm:font-bold md:px-6  md:py-4 text-sm">{balanceHeading[3]}</th>
                <th scope="col" class=" sm:font-bold md:px-6  md:py-4 text-sm">{balanceHeading[4]}</th>
                
            </tr>
        </thead>
    const headItem = 
    <thead class=" hover:bg-cyan-600 bg-sky-500/100 "> 
        <tr class="">   
            <th scope="col" class=" md:px-6  md:py-4 ">
                <span class="text-sm">{heading[0]}</span></th>
            <th scope="col" class=" sm:font-bold md:px-6  md:py-4 text-xs">{heading[1]}</th>
            <th scope="col" class=" sm:font-bold md:px-6  md:py-4 text-xs">{heading[2]}</th>
            <th scope="col" class=" sm:font-bold md:px-6  md:py-4 text-xs">{heading[3]}</th>
            <th scope="col" class=" sm:font-bold md:px-6  md:py-4 text-xs">{heading[4]}</th>
        </tr>
        </thead>

content.map((val,index) => {
    contTable.push(
        <tr class="border-b border-neutral-00 bg-black/[0.02] dark:border-white/10 hover:bg-cyan-200 " key={index}>
                <td class=" text-black lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 text-xs border-2" key={index}>{val[0]}</td>
                <td class="lg:whitespace-nowrap  text-black lg:px-6  lg:py-4 text-xs border-2" key={index}>{val[1]}</td>
                <td class="lg:whitespace-nowrap text-black lg:px-6  lg:py-4 text-xs border-2" key={index}>{val[2]}</td>
                <td class="lg:whitespace-nowrap text-black lg:px-6  lg:py-4 text-xs border-2" key={index}>{val[3]}</td>
                <td class="lg:whitespace-nowrap text-black lg:px-6  lg:py-4 text-xs border-2" key={index}>{val[4]}</td>
            </tr>
        )
    })  
    return(
        <div class=" bg-white flex flex-row justify-center text-center sm:px-6">
            <div class="p-4">
                <h1 class="text-lg sm:text-xl font-semibold whitespace-nowrap text-gray-500 mx-auto text-center dark:text-gray-400">
                    {title}
                </h1>
                <div class="mt-5 sm:mt-20 border-4 border-black">
                    <div class="overflow-hidden ">
                        <table class="w-full text-center text-xs font-light dark:text-white border-collapse ">
                                { (title.includes("Checking"))
                                ? 
                                bHeading:
                                headItem
                            }
                            <tbody> 
                                {contTable}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>    
    )
}

const FinancialReport = ({content}) => {
    let totalData = []
    if (Array.isArray(content)){
        totalData = content.map((item)=> {
            return <FinancialReporting key={item.title} title={item.title} content={item.content} heading={item.rowHeading} balanceHeading={item.balanceHeading}/>
        })
    }else{
        totalData = <FinancialReporting  key={content.title} title={content.title} content={content.content} heading={content.rowHeading} balanceHeading={content.balanceHeading}/>
    }
    return(
        <>
        {totalData}
        </>
    )
}

export default FinancialReport