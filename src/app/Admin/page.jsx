"use client";
import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { auth, db, isAdmin } from '../../lib/firebase';
import { productRegistry } from '../../lib/productRegistry';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { 
    Tag, Play, RefreshCw, Loader2, Save, Plus, X, 
    Edit3, Trash2, Package, ShoppingBag, Download, 
    User, Truck, Phone, CheckCircle2, Clock, Images
} from 'lucide-react';

export default function AdminDashboard() {
    const [user] = useAuthState(auth);
    const [activeTab, setActiveTab] = useState("inventory"); 
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const prodSnap = await getDocs(collection(db, "products"));
            setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })));
            const orderSnap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
            setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { if (user && isAdmin(user)) fetchData(); }, [user]);

    // --- MAGIC BUTTON: GRABS ALL IMAGES FROM CODE ---
    const handleForceImageSync = async () => {
        if (!confirm("This will find all missing images in your code and add them to the cloud. Prices will NOT be changed. Continue?")) return;
        setIsSyncing(true);
        try {
            for (const key of Object.keys(productRegistry)) {
                const data = productRegistry[key];
                const productID = data.description.code || key;
                
                // We use merge: true so we don't overwrite your manual price edits!
                await setDoc(doc(db, "products", productID), {
                    allImages: data.images.map(img => img.src), // Grabs the whole list
                    image: data.images[0].src, // Main thumbnail
                }, { merge: true });
            }
            alert("Success! All product galleries are now updated in the Cloud! 🌸");
            fetchData();
        } catch (e) { alert(e.message); }
        finally { setIsSyncing(false); }
    };

    if (!user || !isAdmin(user)) return <div className="p-20 text-center font-serif text-pink-900 font-bold">Verifying Admin Access...</div>;

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-sm border border-pink-50">
                        <button onClick={() => setActiveTab("orders")} className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'orders' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}><ShoppingBag size={18} /> ORDERS</button>
                        <button onClick={() => setActiveTab("inventory")} className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'inventory' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}><Package size={18} /> INVENTORY</button>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={handleForceImageSync} disabled={isSyncing} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:bg-black transition-all">
                            {isSyncing ? <Loader2 className="animate-spin" size={18}/> : <Images size={18}/>} SYNC ALL IMAGES
                        </button>
                        <button onClick={() => setShowAddModal(true)} className="bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:bg-pink-700 transition-all"><Plus size={18}/> ADD NEW</button>
                    </div>
                </div>

                {activeTab === "inventory" ? (
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-900 text-white text-[10px] uppercase tracking-widest">
                                <tr>
                                    <th className="p-8">Product</th>
                                    <th className="p-8">Price</th>
                                    <th className="p-8 text-center">Images</th>
                                    <th className="p-8 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map((item) => (
                                    <ProductRow key={item.id} item={item} onUpdate={(id, data) => updateDoc(doc(db, "products", id), data).then(fetchData)} onDelete={(id) => confirm("Delete?") && deleteDoc(doc(db, "products", id)).then(fetchData)} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* Orders list - abbreviated here for space, keep your existing Order code */
                    <div className="p-20 text-center text-gray-400 italic">Switch to inventory to edit products.</div>
                )}
            </div>
            <Footer />
        </main>
    );
}

function ProductRow({ item, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [price, setPrice] = useState(item.price);
    const galleryCount = item.allImages?.length || 1;

    return (
        <tr className="hover:bg-pink-50/10 transition-all">
            <td className="p-8 flex items-center gap-6">
                <img src={item.image} className="w-14 h-20 object-cover rounded-xl shadow-md border" alt="" />
                <div>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    <p className="text-[10px] text-pink-600 font-bold uppercase">{item.code}</p>
                </div>
            </td>
            <td className="p-8">
                {isEditing ? <input className="w-24 p-2 border rounded font-bold text-pink-700" value={price} onChange={e => setPrice(e.target.value)} /> : <span className="font-bold text-gray-800">{item.price}</span>}
            </td>
            <td className="p-8 text-center">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    {galleryCount} Photos
                </span>
            </td>
            <td className="p-8 text-right space-x-3">
                {isEditing ? (
                    <button onClick={() => { onUpdate(item.id, { price }); setIsEditing(false); }} className="text-green-600 font-bold underline">SAVE</button>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="text-gray-300 hover:text-pink-600"><Edit3 size={18}/></button>
                        <button onClick={() => onDelete(item.id)} className="text-gray-200 hover:text-red-500"><Trash2 size={18}/></button>
                    </>
                )}
            </td>
        </tr>
    );
}

// Keep your existing AddProductModal code below...
function AddProductModal({ onClose, onSave }) {
    const [newP, setNewP] = useState({ title: "", price: "", code: "", image: "", type: "Saree", details: "" });
    const handleAdd = async (e) => {
        e.preventDefault();
        await setDoc(doc(db, "products", newP.code || Date.now().toString()), { ...newP, quantity: 10, allImages: [newP.image], isOnSale: false, showInBanner: false });
        alert("Added!"); onSave(); onClose();
    };
    return (
        <div className="fixed inset-0 z-[300] bg-black/60 flex items-center justify-center p-4">
            <form onSubmit={handleAdd} className="bg-white p-10 rounded-[3rem] w-full max-w-lg space-y-4 shadow-2xl">
                <h2 className="text-2xl font-serif font-bold text-pink-900 mb-4 tracking-tighter">Add New Arrival</h2>
                <input required placeholder="Title" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, title: e.target.value})} />
                <div className="flex gap-4">
                    <input required placeholder="Price" className="w-1/2 p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, price: e.target.value})} />
                    <select className="w-1/2 p-4 bg-gray-50 rounded-2xl font-bold uppercase text-xs" onChange={e => setNewP({...newP, type: e.target.value})}>
                        <option value="Saree">Saree</option><option value="Gown">Gown</option><option value="Lehenga">Lehenga</option><option value="Suit">Suit</option><option value="Men">Men</option>
                    </select>
                </div>
                <input required placeholder="Code" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, code: e.target.value})} />
                <input required placeholder="Main Image URL" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, image: e.target.value})} />
                <button className="w-full bg-pink-900 text-white py-4 rounded-2xl font-bold shadow-xl">SAVE PRODUCT</button>
                <button type="button" onClick={onClose} className="w-full text-gray-400 font-bold text-xs uppercase mt-2">Nevermind</button>
            </form>
        </div>
    );
}