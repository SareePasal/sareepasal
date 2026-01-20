"use client";
import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { auth, db, isAdmin } from '../../lib/firebase';
import { productRegistry } from '../../lib/productRegistry';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { 
    Tag, Play, RefreshCw, Loader2, Save, Plus, X, 
    Edit3, Trash2, Package, ShoppingBag, Download, 
    User, Truck, Phone, CheckCircle2, Clock, BarChart3
} from 'lucide-react';

export default function AdminDashboard() {
    const [user] = useAuthState(auth);
    const [activeTab, setActiveTab] = useState("orders"); // Orders is the default view
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // 1. DATA LOADER
    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Products
            const prodSnap = await getDocs(collection(db, "products"));
            const prodList = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            setProducts(prodList.sort((a, b) => (a.title || "").localeCompare(b.title || "")));

            // Fetch Orders
            const orderQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
            const orderSnap = await getDocs(orderQuery);
            setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
            console.error("Dashboard Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && isAdmin(user)) fetchData();
    }, [user]);

    // 2. EXPORT SALES FOR BOOKKEEPING
    const exportToCSV = () => {
        const headers = "Order ID,Date,Customer,Email,Phone,Total,Discount,Status,Address\n";
        const rows = orders.map(o => {
            const date = o.createdAt?.toDate().toLocaleDateString() || "N/A";
            return `${o.id.slice(0,8)},${date},"${o.customerName}",${o.customerEmail},${o.customerPhone},${o.totalAmount},${o.discountAmount},${o.status},"${o.shippingAddress}"`;
        }).join('\n');
        
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SareePasal_Bookkeeping_${new Date().toLocaleDateString()}.csv`;
        a.click();
    };

    // 3. BULK RESCUE SYNC (Moves items from your code to Cloud)
    const handleRescueSync = async () => {
        if (!confirm("Move all products from code to Cloud? This fixes categories and pricing fields.")) return;
        setIsSyncing(true);
        try {
            const productKeys = Object.keys(productRegistry);
            for (const key of productKeys) {
                const data = productRegistry[key];
                let detectedType = "Saree";
                if (key.toLowerCase().includes('gown')) detectedType = "Gown";
                else if (key.toLowerCase().includes('lehenga')) detectedType = "Lehenga";
                else if (key.toLowerCase().includes('suit')) detectedType = "Suit";
                else if (key.toLowerCase().includes('men')) detectedType = "Men";

                await setDoc(doc(db, "products", key), {
                    title: data.description.title,
                    price: data.description.price,
                    oldPrice: data.description.oldPrice || "",
                    code: data.description.code,
                    image: data.images[0].src,
                    type: detectedType,
                    isOnSale: false,
                    showInBanner: false,
                    quantity: 10,
                    details: Array.isArray(data.description.detail) ? data.description.detail.join('\n') : data.description.detail,
                    variants: [] 
                }, { merge: true });
            }
            alert("Sync Complete! 🌸");
            fetchData();
        } catch (err) { alert(err.message); }
        finally { setIsSyncing(false); }
    };

    if (!user || !isAdmin(user)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center">
                <div className="bg-white p-16 rounded-[3.5rem] shadow-2xl border-4 border-pink-50 max-w-lg">
                    <Loader2 className="animate-spin mx-auto text-pink-600 mb-6" size={50} />
                    <h1 className="text-3xl font-serif font-bold text-pink-900 uppercase tracking-tighter">Admin Verification</h1>
                    <p className="text-gray-400 mt-4 italic">Welcome back, Owner. Please sign in with your business Gmail.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                
                {/* --- NAVIGATION BAR --- */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-sm border border-pink-50">
                        <button onClick={() => setActiveTab("orders")} className={`px-10 py-4 rounded-2xl font-black text-xs tracking-widest flex items-center gap-3 transition-all ${activeTab === 'orders' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400 hover:bg-pink-50'}`}>
                            <ShoppingBag size={18} /> RECENT ORDERS
                        </button>
                        <button onClick={() => setActiveTab("inventory")} className={`px-10 py-4 rounded-2xl font-black text-xs tracking-widest flex items-center gap-3 transition-all ${activeTab === 'inventory' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400 hover:bg-pink-50'}`}>
                            <Package size={18} /> INVENTORY
                        </button>
                    </div>

                    <div className="flex gap-4">
                        {activeTab === 'orders' ? (
                            <button onClick={exportToCSV} className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black text-xs tracking-widest flex items-center gap-2 shadow-xl hover:bg-green-700 transition-all uppercase">
                                <Download size={18} /> Export for Accountant
                            </button>
                        ) : (
                            <>
                                <button onClick={() => setShowAddModal(true)} className="bg-pink-600 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest flex items-center gap-2 shadow-xl hover:bg-pink-700 transition-all uppercase">
                                    <Plus size={18}/> New Arrival
                                </button>
                                <button onClick={handleRescueSync} disabled={isSyncing} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest flex items-center gap-2 shadow-xl hover:bg-black transition-all uppercase">
                                    {isSyncing ? <Loader2 className="animate-spin" /> : <RefreshCw size={18}/>} Sync Cloud
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* --- TAB CONTENT: ORDERS --- */}
                {activeTab === "orders" ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
                        <div className="flex items-center gap-3 text-pink-900">
                            <BarChart3 size={32} />
                            <h2 className="text-4xl font-serif font-bold italic">Sales Ledger</h2>
                        </div>
                        {orders.length > 0 ? orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden hover:border-pink-200 transition-all">
                                <div className="p-10 flex flex-col md:flex-row justify-between gap-10">
                                    <div className="space-y-6 flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Order ID: {order.id.slice(0,8)}</span>
                                            <span className="text-xs text-gray-400 font-bold uppercase">{order.createdAt?.toDate().toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-bold text-3xl text-gray-900 uppercase flex items-center gap-3"><User size={24} className="text-pink-600"/> {order.customerName}</h3>
                                            <div className="mt-4 space-y-3">
                                                <p className="text-gray-500 font-medium flex items-start gap-3"><Truck size={20} className="text-pink-200 mt-1 shrink-0"/> {order.shippingAddress}</p>
                                                <p className="text-gray-500 font-medium flex items-center gap-3"><Phone size={18} className="text-pink-200 shrink-0"/> {order.customerPhone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-pink-50/30 p-8 rounded-[2.5rem] min-w-[350px] border border-pink-50">
                                        <h4 className="text-[11px] font-black text-pink-900 uppercase mb-5 tracking-widest border-b border-pink-100 pb-2">Line Items</h4>
                                        {order.items?.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm mb-3 font-medium text-gray-700">
                                                <span>{item.quantity}x {item.title}</span>
                                                <span className="font-black text-pink-900">{item.price}</span>
                                            </div>
                                        ))}
                                        <div className="mt-6 pt-6 border-t-2 border-pink-100 flex justify-between items-center">
                                            <span className="font-black text-gray-900 text-sm uppercase">Total Collected</span>
                                            <span className="text-3xl font-black text-pink-700 font-sans">${order.totalAmount}</span>
                                        </div>
                                        {order.discountAmount > 0 && (
                                            <p className="text-right text-[10px] text-green-600 font-bold mt-2 italic">Promo Savings: -${order.discountAmount}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-10 py-5 flex justify-between items-center">
                                    <div className={`flex items-center gap-2 font-black text-[10px] tracking-widest uppercase ${order.status === 'Pending' ? 'text-orange-500' : 'text-green-600'}`}>
                                        {order.status === 'Pending' ? <Clock size={16}/> : <CheckCircle2 size={16}/>} Status: {order.status}
                                    </div>
                                    <button 
                                        onClick={() => updateDoc(doc(db, "orders", order.id), { status: "Shipped" }).then(fetchData)}
                                        className="bg-white border border-gray-200 px-6 py-2 rounded-full text-[10px] font-black uppercase hover:bg-pink-900 hover:text-white transition-all shadow-sm"
                                    >
                                        Mark as Dispatched
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="p-20 text-center bg-white rounded-[3rem] text-gray-300 italic font-serif text-xl border-4 border-dashed border-gray-50">You haven't received any orders yet.</div>
                        )}
                    </div>
                ) : (
                    /* --- TAB CONTENT: INVENTORY --- */
                    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-5">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.3em]">
                                <tr>
                                    <th className="p-8">Product</th>
                                    <th className="p-8">Category</th>
                                    <th className="p-8">Price Logic</th>
                                    <th className="p-8 text-center">Badges</th>
                                    <th className="p-8 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map((item) => (
                                    <ProductRow 
                                        key={item.id} 
                                        item={item} 
                                        onUpdate={(id, data) => updateDoc(doc(db, "products", id), data).then(fetchData)} 
                                        onDelete={(id) => confirm("Permanently delete this item?") && deleteDoc(doc(db, "products", id)).then(fetchData)} 
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} onSave={fetchData} />}
            <Footer />
        </main>
    );
}

// SUB-COMPONENT: PRODUCT ROW (Inline Editor)
function ProductRow({ item, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState({ ...item });

    return (
        <tr className="hover:bg-pink-50/10 transition-all group">
            <td className="p-8 flex items-center gap-6">
                <div className="w-16 h-24 rounded-xl overflow-hidden shadow-md border border-gray-100 shrink-0">
                    <img src={item.image} className="w-full h-full object-cover object-top" alt="" />
                </div>
                <div className="max-w-xs">
                    {isEditing ? (
                        <input className="w-full p-2 text-xs border rounded-lg focus:ring-1 focus:ring-pink-500 font-bold" value={tempData.title} onChange={e => setTempData({...tempData, title: e.target.value})} />
                    ) : (
                        <>
                            <p className="font-black text-gray-900 text-sm leading-tight line-clamp-2">{item.title}</p>
                            <p className="text-[9px] text-pink-600 font-black uppercase mt-2 tracking-widest">{item.code}</p>
                        </>
                    )}
                </div>
            </td>
            
            <td className="p-8">
                <select 
                    className={`p-3 text-[10px] font-black uppercase rounded-xl border transition-all ${isEditing ? 'bg-white border-pink-300 shadow-sm' : 'bg-gray-100 border-transparent cursor-not-allowed opacity-60'}`}
                    value={isEditing ? tempData.type : (item.type || "Saree")}
                    disabled={!isEditing}
                    onChange={e => setTempData({...tempData, type: e.target.value})}
                >
                    <option value="Saree">Saree</option>
                    <option value="Gown">Gown</option>
                    <option value="Lehenga">Lehenga</option>
                    <option value="Suit">Suit</option>
                    <option value="Men">Men</option>
                </select>
            </td>

            <td className="p-8">
                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col"><label className="text-[8px] font-black text-gray-400 uppercase">Now</label><input className="w-24 p-2 text-xs border rounded-lg font-black text-pink-700" value={tempData.price} onChange={e => setTempData({...tempData, price: e.target.value})} /></div>
                        <div className="flex flex-col"><label className="text-[8px] font-black text-gray-400 uppercase">Was</label><input className="w-24 p-2 text-xs border rounded-lg font-black text-gray-300 line-through" value={tempData.oldPrice} onChange={e => setTempData({...tempData, oldPrice: e.target.value})} /></div>
                    </div>
                ) : (
                    <div>
                        {item.oldPrice && <p className="text-[10px] text-red-300 line-through font-black">{item.oldPrice}</p>}
                        <p className="text-lg font-black text-gray-800">{item.price}</p>
                    </div>
                )}
            </td>

            <td className="p-8 text-center">
                <div className="flex justify-center gap-3">
                    <button onClick={() => onUpdate(item.id, { isOnSale: !item.isOnSale })} className={`p-3 rounded-2xl transition-all ${item.isOnSale ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}`}><Tag size={16}/></button>
                    <button onClick={() => onUpdate(item.id, { showInBanner: !item.showInBanner })} className={`p-3 rounded-2xl transition-all ${item.showInBanner ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}`}><Play size={16}/></button>
                </div>
            </td>

            <td className="p-8 text-right">
                {isEditing ? (
                    <div className="flex justify-end gap-2">
                        <button onClick={() => { onUpdate(item.id, tempData); setIsEditing(false); }} className="bg-pink-900 text-white p-3 rounded-xl shadow-xl hover:bg-black"><Save size={20}/></button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-400 p-3 rounded-xl hover:bg-gray-200"><X size={20}/></button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-3 items-center">
                        <button onClick={() => setIsEditing(true)} className="text-gray-300 hover:text-pink-600 transition-colors"><Edit3 size={24}/></button>
                        <button onClick={() => onDelete(item.id)} className="text-gray-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={22}/></button>
                    </div>
                )}
            </td>
        </tr>
    );
}

// SUB-COMPONENT: ADD NEW MODAL
function AddProductModal({ onClose, onSave }) {
    const [newP, setNewP] = useState({ title: "", price: "", oldPrice: "", code: "", image: "", type: "Saree", details: "", quantity: 10 });
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "products", newP.code || Date.now().toString()), { ...newP, isOnSale: false, showInBanner: false, variants: [] });
            alert("Live!"); onSave(); onClose();
        } catch (err) { alert(err.message); }
    };
    return (
        <div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <form onSubmit={handleAdd} className="bg-white p-12 rounded-[4rem] w-full max-w-2xl space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto border-8 border-pink-50">
                <h2 className="text-4xl font-serif font-bold text-pink-900 italic">Add New Arrival</h2>
                <div className="space-y-4">
                    <input required placeholder="Full Product Title" className="w-full p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 font-bold" onChange={e => setNewP({...newP, title: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="Current Price ($)" className="p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 font-black text-pink-700" onChange={e => setNewP({...newP, price: e.target.value})} />
                        <select className="p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 font-black uppercase text-xs tracking-widest" onChange={e => setNewP({...newP, type: e.target.value})}>
                            <option value="Saree">Saree</option><option value="Gown">Gown</option><option value="Lehenga">Lehenga</option><option value="Suit">Suit</option><option value="Men">Men</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="Unique Code (e.g. KS-101)" className="p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500" onChange={e => setNewP({...newP, code: e.target.value})} />
                        <input placeholder="Original Price (Was $)" className="p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 opacity-60" onChange={e => setNewP({...newP, oldPrice: e.target.value})} />
                    </div>
                    <input required placeholder="Image Link (e.g. /Saree.png)" className="w-full p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500" onChange={e => setNewP({...newP, image: e.target.value})} />
                    <textarea rows="3" placeholder="Fabric, Fit, and Style details..." className="w-full p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 italic" onChange={e => setNewP({...newP, details: e.target.value})} />
                </div>
                <button className="w-full bg-pink-900 text-white py-6 rounded-[2.5rem] font-black text-lg shadow-2xl shadow-pink-900/30 hover:bg-black transition-all">SAVE TO STOREFRONT</button>
                <button type="button" onClick={onClose} className="w-full text-gray-400 font-bold text-xs uppercase tracking-widest">Nevermind, go back</button>
            </form>
        </div>
    );
}