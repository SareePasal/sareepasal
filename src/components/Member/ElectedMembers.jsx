import * as React from 'react';

import ElectedMember from './ElectedMember';

const electedMember = [
    {
        name: "Kul Prasad Gouli (Rajan)",
        nepaliName: "कुल प्रसाद गौली (राजन)",
        imageLocation: "/Members/RajanGouli.png",
        position: "President",
        nepaliPostion: "अघ्यक्ष"
    },
    {
        name: "Sabitra Siwakoti",
        nepaliName: "सावित्रा सिवाकोटी",
        imageLocation: "/Members/SabitraSiwakoti.png",
        position: "Senior Vice President",
        nepaliPostion: "बरिस्ठ उपाध्यक्ष"
    },
    {
        name: "Gokul Sapkota",
        nepaliName: "गोकुल सापकोटा",
        imageLocation: "/Members/GokulSapkota.png",
        position: "Vice President",
        nepaliPostion: "उपाध्यक्ष"
    },
    {
        name: "Indira Simkhada",
        nepaliName: "इन्दिरा सिंखडा (पाण्डे)",
        imageLocation: "/Members/IndiraSimkhada.png",
        position: "Vice President",
        nepaliPostion: "उपाध्यक्ष"
    },
    {
        name: "RAJENDRA KUMAR KARKI",
        nepaliName: "राजेन्द्र कुमार कार्की",
        imageLocation: "/Members/RAJENDRAKUMARKARKI.png",
        position: "General Secretary",
        nepaliPostion: "महासचिव"
    },
    {
        name: "Deepak Adhikari",
        nepaliName: "दिपक अधिकारी",
        imageLocation: "/Members/DeepakAdhikari.png",
        position: "Secretary",
        nepaliPostion: "सचिव"
    },
    {
        name: "Mohan Chettry",
        nepaliName: "मोहन क्षेत्री",
        imageLocation: "/Members/MohanChettry.png",
        position: "Secretary",
        nepaliPostion: "सचिव"
    },
    {
        name: "Nirmal Thapaliya",
        nepaliName: "निर्मल थपलिया",
        imageLocation: "/Members/NirmalThapaliya.png",
        position: "Treasurer",
        nepaliPostion: "कोषाध्यक्ष"
    },
    {
        name: "Ram Kumar Rai",
        nepaliName: "राम कुमार राई",
        imageLocation: "/Members/RamKumarRai.png",
        position: "Co-Treasurer",
        nepaliPostion: "सह कोषाध्यक्ष"
    },
    {
        name: "Ambika Phuyal",
        nepaliName: "अम्बिका फुँयाल",
        imageLocation: "/Members/AmbikaPhuyal.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Bikash Mainali",
        nepaliName: "विकास मैनाली",
        imageLocation: "/Members/BIkashMainali.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Bimala Bhandari",
        nepaliName: "विमला भण्डारी",
        imageLocation: "/Members/BimalaBhandari.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Dr.Yam Raj Giri",
        nepaliName: "डा. यम राज गिरी",
        imageLocation: "/Members/YamRajGiri.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Gyanu Chand",
        nepaliName: "ज्ञानु चन्द",
        imageLocation: "/Members/GyanuChand.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Ravi Khadka",
        nepaliName: "रवि खड्का",
        imageLocation: "/Members/RaviKhadka.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Raj kumar Tamang",
        nepaliName: "राज कुमार तामांग",
        imageLocation: "/Members/RajKumarTamang.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Roshni Sitaula",
        nepaliName: "रोश्नी सिटौला",
        imageLocation: "/Members/RoshniSitaula.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Sujan Regmi",
        nepaliName: "सुजन रेग्मी",
        imageLocation: "/Members/SujanRegmi.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Namita Paudel",
        nepaliName: "नमिता पौडेल",
        imageLocation: "/Members/NamitaPaudel.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Niraj Sapkota",
        nepaliName: "निरज सापकोटा",
        imageLocation: "/Members/NirajSapkota.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Suman Bastola",
        nepaliName: "सुमन बास्तोला",
        imageLocation: "/Members/SumanBastola.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
]

const ElectedMembers = () => {
    return(
        <div class=" bg-white flex flex-col">
            <div class="flex flex-col font-bold justify-center items-center text-md">
                <h4>2024-2025 Elected Members</h4>
                <h6> २०२४ - २०२५ कार्यसमिति सदस्य</h6>
            </div>      
            <div class="md:grid md:grid-cols-4 md:gap-4 sm:mx-auto" >                                     
                {electedMember.map(function(object, i){
                    return <ElectedMember 
                        name={object["name"]} 
                        nepaliName={object["nepaliName"]} 
                        imageLocation={object["imageLocation"]} 
                        position={object["position"]}
                        nepaliPostion={object["nepaliPostion"]}
                        key={i} />;
                })}
             </div> 
    </div>
            
    )
}

export default ElectedMembers