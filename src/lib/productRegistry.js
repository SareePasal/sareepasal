/*** Add your PRODUCTS HERE  ***/

// We must include "../components/" in the path so the computer knows where to look
/*Sarees*/
import KimoraSindhuri from '../components/Saree/KimoraSindhuri';
import Akshita765 from '../components/Saree/Akshita765'; // Fixed: added components/
import KimoraSindhuriAnokhi from "../components/Saree/KimoraSindhuriAnokhi";
import Karigari from "../components/Saree/Karigari";
import Glint from "../components/Saree/Glint";
import DS610 from "../components/Saree/DS610";
import Suman01 from "../components/Saree/Suman01";
import FBL228 from "../components/Saree/FBL228";
import NA4001 from "../components/Saree/NA4001";
import DB4090 from "../components/Saree/DB4090";
import VC4052 from "../components/Saree/VC4052";

/*... Gowns ...*/
import RT10074 from '../components/Gowns/RT10074';
import RT1004 from "../components/Gowns/RT1004";
import RT1003 from "../components/Gowns/RT1003";
import H2276 from "../components/Gowns/H2276";
import LR1005 from "../components/Gowns/LR1005";

/*... Lehenga ...*/
import RT1001 from '../components/Lehenga/RT1001';
import RT1001copy from "../components/Lehenga/RT1001copy";
import RT1001copy2 from "../components/Lehenga/RT1001copy2";
import RT1002 from "../components/Lehenga/RT1002";
import RT1002copy from "../components/Lehenga/RT1002copy";
import DLC1008 from "../components/Lehenga/DLC1008";
import Hazel2302 from "../components/Lehenga/Hazel2302";
import RT106 from "../components/Lehenga/RT106";
import L3066 from "../components/Lehenga/L3066";
import L3057 from "../components/Lehenga/L3057";
import L3074 from "../components/Lehenga/L3074";

/*... Suit ...*/
import RT1003Eba from '../components/Suit/RT1003Eba';
import RT1006 from "../components/Suit/RT1006"
import RT1007 from "../components/Suit/RT1007"
import Aanaya7700 from "../components/Suit/Aanaya7700"
import GloriousS52 from "../components/Suit/GloriousS52"
import AG71901 from "../components/Suit/AG71901"
import AG69583 from "../components/Suit/AG69583"
import AG62914 from "../components/Suit/AG62914"
import EG48594 from "../components/Suit/EG48594"
import AG68685 from "../components/Suit/AG68685"
import AG72483 from "../components/Suit/AG72483"
import AG71970 from "../components/Suit/AG71970"
import AG337 from "../components/Suit/AG337"
import AG72430 from "../components/Suit/AG72430"
import AG68133 from "../components/Suit/AG68133.js"
import AG71820 from "../components/Suit/AG71820"
import AG71236 from "../components/Suit/AG71236"
import AG68177 from "../components/Suit/AG68177"
import AG73031 from "../components/Suit/AG73031"
import AG65068 from "../components/Suit/AG65068"
import AG73369 from "../components/Suit/AG73369"
import AG356 from "../components/Suit/AG356"
import AG68776 from "../components/Suit/AG68776"


export const productRegistry = {

    // ... Sarees ...
    "kimora": KimoraSindhuri,
    "KimoraSindhuriAnokhi": KimoraSindhuriAnokhi,
    "karigari": Karigari,
    "glint": Glint,
    "akshita765": Akshita765,
    "ds610": DS610,
    "suman01": Suman01,
    "fbl228": FBL228,
    "na4001": NA4001,
    "db4090": DB4090,
    "vc4052": VC4052,    
    "rt1001": RT1001,
    "eba-suit": RT1003Eba,
    "akshita": Akshita765,

    // ... Gowns ...
    "rt10074": RT10074,
    "rt1004": RT1004,
    "rt1003": RT1003,
    "h2276": H2276,
    "lr1005": LR1005,

    /*... Lehenga ...*/
    "rt1001": RT1001,
    "rt1001copy": RT1001copy,
    "rt1001copy2": RT1001copy2,
    "rt1002": RT1002,
    "rt1002copy": RT1002copy,
    "dlc1008": DLC1008,
    "hazel2302": Hazel2302,
    "rt106": RT106,
    "l3066": L3066,
    "l3057": L3057,
    "l3074": L3074,

    /*... Suit ...*/
    "rt1003eba": RT1003Eba,
    "rt1006": RT1006,
    "rt1007": RT1007,
    "aanaya7700": Aanaya7700,
    "gloriouss52": GloriousS52,
    "ag71901": AG71901,
    "ag69583": AG69583,
    "ag62914": AG62914,
    "eg48594": EG48594,
    "ag68685": AG68685,
    "ag72483": AG72483,
    "ag71970": AG71970,
    "ag337": AG337,
    "ag72430": AG72430,
    "ag68133": AG68133,
    "ag71820": AG71820,
    "ag71236": AG71236,
    "ag68177": AG68177,
    "ag73031": AG73031,
    "ag65068": AG65068,
    "ag73369": AG73369,
    "ag356": AG356,
    "ag68776": AG68776,




};
export function getProductById(id) {
    if (!id) return null;
    return productRegistry[id.toLowerCase()] || null;
}