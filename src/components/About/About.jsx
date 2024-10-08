import * as React from 'react';
import Card from '../Card/Card'
import Image from 'next/image'

const About = () => {
    const item = [
        {
            link: "/Urwashi",
            src: "/Urwashi.jpg",
            text: "Urwashi"
        }
    ]

    return (
        <div>
            <div class="grid sm:px-9 lg:gap-10md:gap-24 gap-9 justify-center m-4">
                {
                    item && item.map((object, i) =>
                        <Card key={i} link={object.link} text={object.text} src={object.src} />
                    )
                }
            </div>
            <div class="max-w-screen-xl flex justify-center mx-auto p-4">
                <span class="text-sm md:text-lg font-semibold text-gray-500 dark:text-gray-400">
                    Sare Pasal is an online boutique started by a stay-at-home mom, with the encouragement and support of her husband.
                    <br />It offers a wide range of ethnic wear, including sarees, lehengas, and suits, designed for Nepali and South Asian women.
                    <br />The shop also provides accessories such as necklaces, earrings, bangles, and more, ensuring women have everything they
                    <br />need for traditional events and special occasions. Sare Pasal prides itself on offering high-quality products at the most
                    <br />affordable prices compared to other competitive shops, delivering cultural richness and value right to the customer’s doorstep.
                </span>
            </div>


            <div class="grid grid-cols-4">
                <div class="col-span-1 rounded-lg bg-cover ">
                    <Image class="mx-1 "
                    src="/footerImage.jpg"
                    width={400}
                    height={400}
                    alt="footer Image"
                /></div>
                <div class="col-span-1 rounded-lg bg-cover ">
                    <Image class="mx-1 "
                    src="/footerImage.jpg"
                    width={400}
                    height={400}
                    alt="footer Image"
                /></div>
                <div class="col-span-1 rounded-lg bg-cover ">
                    <Image class="mx-1 "
                    src="/footerImage.jpg"
                    width={400}
                    height={400}
                    alt="footer Image"
                /></div>
                <div class="col-span-1 rounded-lg bg-cover ">
                    <Image class="mx-1 "
                    src="/footerImage.jpg"
                    width={400}
                    height={400}
                    alt="footer Image"
                /></div>
            </div>
        </div>
    )
}

export default About