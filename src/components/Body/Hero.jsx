import * as React from 'react';
import Card from '../Card/Card'

const Hero = () => {
    return (
        <div class="grid lg:grid-cols-5 lg:gap-36 sm:grid-cols-2 md:gap-24 gap-28 ">
            < HomePage key="1" />
        </div>

    )
}

const HomePage = () => {
    const item = [
        {
            link: "/Saree_All",
            src: "/Saree.png",
            text: "Saree"
        },
        {
            link: "/Gown",
            src: "/Gown.jpg",
            text: "Gown"
        },
        {
            link: "/Lehenga",
            src: "/Lehenga.jpg",
            text: "Lehenga"
        },
        {
            link: "/Blouse",
            src: "/Blouse.png",
            text: "Blouse"
        },
        {
            link: "/MensWear",
            src: "/Menswear.png",
            text: "Men's Wear"
        },
        {
            link: "/Petticoat",
            src: "/Petticoat.png",
            text: "Petticoat"
        },
        {
            link: "/Accessories",
            src: "/Accessories.png",
            text: "Accessories"
        },
        {
            link: "/Sale",
            src: "/sale.png",
            text: "Sale"
        },
    ]
    return (
        <div class="grid lg:grid-cols-4 sm:px-9 lg:gap-15 sm:grid-cols-2 md:gap-24 
                gap-9 justify-center m-4">
            {
                item && item.map((object, i) =>
                    <Card key={i} link={object.link} text={object.text} src={object.src} />
                )
            }
        </div>
    )
}

export default HomePage