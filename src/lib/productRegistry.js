/*** Add your PRODUCTS HERE  ***/

// We must include "../components/" in the path so the computer knows where to look
import KimoraSindhuri from '../components/Saree/KimoraSindhuri';
import RT10074 from '../components/Gowns/RT10074';
import RT1001 from '../components/Lehenga/RT1001'; // Fixed: added components/
import RT1003Eba from '../components/Suit/RT1003Eba'; // Fixed: added components/
import Akshita765 from '../components/Saree/Akshita765'; // Fixed: added components/
import KimoraSindhuriAnokhi from "../components/Saree/KimoraSindhuriAnokhi"
import Karigari from "../components/Saree/Karigari"
import Glint from "../components/Saree/Glint"
import DS610 from "../components/Saree/DS610"
import Suman01 from "../components/Saree/Suman01"
import FBL228 from "../components/Saree/FBL228"
import NA4001 from "../components/Saree/NA4001"
import DB4090 from "../components/Saree/DB4090"
import VC4052 from "../components/Saree/VC4052"


export const productRegistry = {
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
    "rt10074": RT10074,
    "rt1001": RT1001,
    "eba-suit": RT1003Eba,
    "akshita": Akshita765,
    // ... add the rest here ...
};

export function getProductById(id) {
    if (!id) return null;
    return productRegistry[id.toLowerCase()] || null;
}