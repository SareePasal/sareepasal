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
    User, Truck, Phone, CheckCircle2, Clock 
} from 'lucide-react';

export default function AdminDashboard() {
    const [user] = useAuthState(auth);
    const [activeTab, setActiveTab] = useState("orders"); // Orders is default
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // 1. Fetch All Data (Products and Orders)
    const fetchData = async () => {
        setLoading(true);
        try {
            // Load Products
            const prodSnap = await getDocs(collection(db, "products"));
            const prodList = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            setProducts(prodList.sort((a, b) => a.title.localeCompare(b.title)));

            // Load Orders (Newest First)
            const orderQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
            const orderSnap = await getDocs(orderQuery);
            setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) {
            console.error("Dashboard Load Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && isAdmin(user)) fetchData();
    }, [user]);

    // 2. Export Sales to CSV (Excel)
    const exportToCSV = () => {
        const headers = "Order ID,Date,Customer,Email,Phone,Total,Status,Address\n";
        const rows = orders.map(o => {
            const date = o.createdAt?.toDate().toLocaleDateString() || "N/A";
            return `${o.id.slice(0,8)},${date},"${o.customerName}",${o.customerEmail},${o.customerPhone},${o.totalAmount},${o.status},"${o.shippingAddress}"`;
        }).join('\n');
        
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SareePasal_Sales_${new Date().toLocaleDateString()}.csv`;
        a.click();
    };

    // 3. Rescue Sync (Teleport all products from code files to Cloud)
    const handleRescueSync = async () => {
        if (!confirm("This will push all items from your code to the database. Continue?")) return;
        setIsSyncing(true);
        try {
            const productKeys = Object.keys(productRegistry);
            for (const key of productKeys) {
                const data = productRegistry[key];
                
                // Smart Category Detection
                let detectedType = "Saree";
                if (key.toLowerCase().includes('gown')) detectedType = "Gown";
                else if (key.toLowerCase().includes('lehenga')) detectedType = "Lehenga";
                else if (key.toLowerCase().includes('suit')) detectedType = "Suit";
                else if (key.toLowerCase().includes('men')) detectedType = "Men";

                await setDoc(doc(db, "products", key), {
                    title: data.description.title,
                    price: data.description.price,
                    code: data.description.code,
                    image: data.images[0].src,
                    type: detectedType,
                    isOnSale: false,
                    showInBanner: false,
                    quantity: 10,
                    details: Array.isArray(data.description.detail) ? data.description.detail.join('\n') : data.description.detail,
                    variants: [] // Starts empty for new variant table
                }, { merge: true });
            }
            alert("Rescue Sync Complete! All items are now in the cloud.");
            fetchData();
        } catch (err) { alert("Sync Error: " + err.message); }
        finally { setIsSyncing(false); }
    };

    if (!user || !isAdmin(user)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center p-10">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-pink-100 max-w-md">
                    <Loader2 className="animate-spin mx-auto text-pink-600 mb-4" size={40} />
                    <h1 className="text-2xl font-serif font-bold text-pink-900">Verifying Admin Access</h1>
                    <p className="text-gray-500 mt-2 italic text-sm">Please log in with sareepasalusa@gmail.com to enter the Control Room.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                
                {/* ADMIN HEADER & TABS */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                        <button onClick={() => setActiveTab("orders")} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'orders' ? 'bg-pink-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
                            <ShoppingBag size={18} /> RECENT ORDERS
                        </button>
                        <button onClick={() => setActiveTab("inventory")} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${activeTab === 'inventory' ? 'bg-pink-900 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}>
                            <Package size={18} /> INVENTORY
                        </button>
                    </div>

                    <div className="flex gap-3">
                        {activeTab === 'orders' ? (
                            <button onClick={exportToCSV} className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-green-700 transition-all">
                                <Download size={18} /> EXPORT SALES (CSV)
                            </button>
                        ) : (
                            <>
                                <button onClick={() => setShowAddModal(true)} className="bg-pink-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-pink-700 transition-all">
                                    <Plus size={18}/> ADD PRODUCT
                                </button>
                                <button onClick={handleRescueSync} disabled={isSyncing} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-black transition-all">
                                    {isSyncing ? <RefreshCw className="animate-spin" size={18}/> : <RefreshCw size={18}/>} RESCUE SYNC
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* --- ORDERS TAB CONTENT --- */}
                {activeTab === "orders" ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-3xl font-serif font-bold text-pink-900">Active Sales Ledger</h2>
                        {orders.length > 0 ? orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-8 flex flex-col md:flex-row justify-between gap-8">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold">ORD #{order.id.slice(0,8).toUpperCase()}</span>
                                            <span className="text-xs text-gray-400 font-medium">{order.createdAt?.toDate().toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-2xl uppercase text-gray-900 flex items-center gap-2"><User size={20} className="text-pink-600"/> {order.customerName}</h3>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-gray-600 text-sm flex items-center gap-2"><Truck size={16} className="text-gray-400"/> {order.shippingAddress}</p>
                                                <p className="text-gray-600 text-sm flex items-center gap-2"><Phone size={16} className="text-gray-400"/> {order.customerPhone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-pink-50/50 p-6 rounded-[2rem] min-w-[320px] border border-pink-100">
                                        <h4 className="text-[10px] font-bold text-pink-900 uppercase mb-4 tracking-widest">Order Summary</h4>
                                        {order.items?.map((item, i) => (
                                            <div key={i} className="flex justify-between text-xs mb-2 border-b border-pink-100/50 pb-2 last:border-none">
                                                <span className="font-medium text-gray-700">{item.quantity}x {item.title} ({item.selectedSize})</span>
                                                <span className="font-bold text-pink-900">{item.price}</span>
                                            </div>
                                        ))}
                                        <div className="mt-4 pt-2 flex justify-between items-center">
                                            <span className="font-bold text-gray-900 text-xs uppercase">Total Paid</span>
                                            <span className="text-2xl font-bold text-pink-700">${order.totalAmount}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-900 px-8 py-4 flex justify-between items-center">
                                    <span className={`text-[10px] font-bold flex items-center gap-2 ${order.status === 'Pending' ? 'text-orange-400' : 'text-green-400'}`}>
                                        {order.status === 'Pending' ? <Clock size={14}/> : <CheckCircle2 size={14}/>} {order.status.toUpperCase()}
                                    </span>
                                    <button 
                                        onClick={() => updateDoc(doc(db, "orders", order.id), { status: "Shipped" }).then(fetchData)}
                                        className="bg-white/10 text-white px-4 py-1 rounded-full text-[10px] font-bold hover:bg-white hover:text-black transition-all"
                                    >
                                        MARK AS SHIPPED
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="p-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200 text-gray-400 italic">No orders found.</div>
                        )}
                    </div>
                ) : (
                    /* --- INVENTORY TAB CONTENT --- */
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-900 text-white text-[10px] uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="p-8">Product</th>
                                    <th className="p-8">Category Type</th>
                                    <th className="p-8">Price</th>
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
                                        onDelete={(id) => confirm("Delete this?") && deleteDoc(doc(db, "products", id)).then(fetchData)} 
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ADD PRODUCT MODAL */}
            {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} onSave={fetchData} />}
            <Footer />
        </main>
    );
}

// INLINE EDITOR COMPONENT
function ProductRow({ item, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState({ ...item });

    return (
        <tr className="hover:bg-pink-50/10 transition-all group font-medium">
            <td className="p-8 flex items-center gap-6">
                <img src={item.image} className="w-14 h-20 object-cover rounded-xl shadow-md border border-gray-100" alt="" />
                <div className="max-w-[250px]">
                    {isEditing ? (
                        <input className="w-full p-2 text-xs border rounded-lg focus:ring-1 focus:ring-pink-500" value={tempData.title} onChange={e => setTempData({...tempData, title: e.target.value})} />
                    ) : (
                        <>
                            <p className="font-bold text-gray-900 text-sm line-clamp-2">{item.title}</p>
                            <p className="text-[9px] text-pink-600 font-bold uppercase mt-1 tracking-widest">{item.code}</p>
                        </>
                    )}
                </div>
            </td>
            
            <td className="p-8">
                <select 
    className={`p-2 text-xs border rounded-lg font-bold ${isEditing ? 'bg-white border-pink-300' : 'bg-gray-50 border-transparent text-gray-400'}`}
    value={isEditing ? tempData.type : (item.type || "")} // Use empty string if missing
    disabled={!isEditing}
    onChange={e => setTempData({...tempData, type: e.target.value})}
>
    <option value="" disabled>Select Type</option>
    <option value="Saree">Saree</option>
    <option value="Gown">Gown</option>
    <option value="Lehenga">Lehenga</option>
    <option value="Suit">Suit</option>
    <option value="Men">Men</option>
</select>
            </td>

            <td className="p-8">
                {isEditing ? (
                    <input className="w-24 p-2 text-xs border rounded font-bold text-pink-700" value={tempData.price} onChange={e => setTempData({...tempData, price: e.target.value})} />
                ) : (
                    <span className="font-bold text-gray-800">{item.price}</span>
                )}
            </td>

            <td className="p-8 text-center">
                <div className="flex justify-center gap-3">
                    <button onClick={() => onUpdate(item.id, { isOnSale: !item.isOnSale })} className={`p-3 rounded-xl transition-all ${item.isOnSale ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}><Tag size={16}/></button>
                    <button onClick={() => onUpdate(item.id, { showInBanner: !item.showInBanner })} className={`p-3 rounded-xl transition-all ${item.showInBanner ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}><Play size={16}/></button>
                </div>
            </td>

            <td className="p-8 text-right">
                {isEditing ? (
                    <div className="flex justify-end gap-2">
                        <button onClick={() => { onUpdate(item.id, tempData); setIsEditing(false); }} className="bg-pink-900 text-white p-2 rounded-lg shadow-md hover:bg-black"><Save size={18}/></button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-300"><X size={18}/></button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setIsEditing(true)} className="text-gray-300 hover:text-pink-600 p-2 transition-colors"><Edit3 size={20}/></button>
                        <button onClick={() => onDelete(item.id)} className="text-gray-200 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={20}/></button>
                    </div>
                )}
            </td>
        </tr>
    );
}

// MODAL COMPONENT: ADD NEW
function AddProductModal({ onClose, onSave }) {
    const [newP, setNewP] = useState({ title: "", price: "", code: "", image: "", type: "Saree", details: "" });
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "products", newP.code || Date.now().toString()), { ...newP, isOnSale: false, showInBanner: false, quantity: 10, variants: [] });
            alert("New product is live!"); onSave(); onClose();
        } catch (err) { alert("Error: " + err.message); }
    };
    return (
        <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleAdd} className="bg-white p-12 rounded-[3.5rem] w-full max-w-xl space-y-5 shadow-2xl relative">
                <h2 className="text-3xl font-serif font-bold text-pink-900">Add New Treasure</h2>
                <input required placeholder="Product Title" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-500" onChange={e => setNewP({...newP, title: e.target.value})} />
                <div className="flex gap-4">
                    <input required placeholder="Price ($)" className="w-1/2 p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, price: e.target.value})} />
                    <select className="w-1/2 p-4 bg-gray-50 rounded-2xl font-bold" onChange={e => setNewP({...newP, type: e.target.value})}>
                        <option value="Saree">Saree</option><option value="Gown">Gown</option><option value="Lehenga">Lehenga</option><option value="Suit">Suit</option><option value="Men">Men</option>
                    </select>
                </div>
                <input required placeholder="Unique Code" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, code: e.target.value})} />
                <input required placeholder="Image Link" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, image: e.target.value})} />
                <textarea rows="3" placeholder="Fabric details..." className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, details: e.target.value})} />
                <button className="w-full bg-pink-900 text-white py-5 rounded-2xl font-bold shadow-xl">SAVE TO DATABASE</button>
                <button type="button" onClick={onClose} className="w-full text-gray-400 font-bold text-sm">CANCEL</button>
            </form>
        </div>
    );
}