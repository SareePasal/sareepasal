"use client";
import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { auth, db, isAdmin } from '../../lib/firebase';
import { productRegistry } from '../../lib/productRegistry';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, getDoc, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
    Tag, Play, RefreshCw, Loader2, Save, Plus, X, 
    Edit3, Trash2, Package, ShoppingBag, Bomb, ShieldCheck, 
    History, RotateCcw, Download, User, Truck, Phone, CheckCircle2, Clock, BarChart3
} from 'lucide-react';

export default function AdminDashboard() {
    const [user] = useAuthState(auth);
    const [activeTab, setActiveTab] = useState("orders"); // Orders is default
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [backups, setBackups] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Products
            const prodSnap = await getDocs(collection(db, "products"));
            setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })));

            // 2. Fetch Orders (Newest First)
            const orderSnap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
            setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })));
            
            // 3. Fetch Backups
            const backupSnap = await getDocs(query(collection(db, "backups"), orderBy("createdAt", "desc")));
            setBackups(backupSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { if (user && isAdmin(user)) fetchData(); }, [user]);

    // --- BOOKKEEPING: Export to Excel ---
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
        a.download = `SareePasal_Ledger_${new Date().toLocaleDateString()}.csv`;
        a.click();
    };

    // --- SMART SYNC (SAFE: Won't overwrite your manual price changes) ---
    const handleSmartSync = async () => {
        setIsSyncing(true);
        try {
            const productKeys = Object.keys(productRegistry);
            for (const key of productKeys) {
                const codeData = productRegistry[key];
                const productID = codeData.description.code || key;
                const docRef = doc(db, "products", productID);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    let type = "Saree";
                    const lowerKey = key.toLowerCase();
                    if (lowerKey.includes('gown')) type = "Gown";
                    else if (lowerKey.includes('lehenga')) type = "Lehenga";
                    else if (lowerKey.includes('suit')) type = "Suit";
                    else if (lowerKey.includes('pet')) type = "Petticoat";
                    else if (lowerKey.startsWith('ab') || lowerKey.startsWith('an')) type = "Accessories";

                    await setDoc(docRef, {
                        title: codeData.description.title,
                        price: codeData.description.price,
                        code: codeData.description.code,
                        image: codeData.images[0].src,
                        type: type,
                        isOnSale: false,
                        quantity: 10,
                        variants: []
                    });
                }
            }
            alert("Smart Sync Complete!"); fetchData();
        } catch (e) { alert(e.message); }
        finally { setIsSyncing(false); }
    };

    // --- WIPE & BACKUP ---
    const handleWipeWithBackup = async () => {
        if (!confirm("⚠️ DANGER: Delete everything? (A backup will be saved first).")) return;
        setIsSyncing(true);
        try {
            if (products.length > 0) {
                await addDoc(collection(db, "backups"), {
                    snapshot: products,
                    createdAt: serverTimestamp(),
                    itemCount: products.length
                });
            }
            const querySnapshot = await getDocs(collection(db, "products"));
            for (const document of querySnapshot.docs) { await deleteDoc(doc(db, "products", document.id)); }
            alert("Wiped! Find your backup in the 'Backups' tab."); fetchData();
        } catch (e) { alert(e.message); }
        finally { setIsSyncing(false); }
    };

    // --- RESTORE ---
    const handleRestore = async (backupData) => {
        if (!confirm("Restore this version? This will replace your current items.")) return;
        setIsSyncing(true);
        try {
            for (const item of backupData.snapshot) { await setDoc(doc(db, "products", item.id), item); }
            alert("Restore Success!"); fetchData();
        } catch (e) { alert(e.message); }
        finally { setIsSyncing(false); }
    };

    if (!user || !isAdmin(user)) return <div className="p-20 text-center font-serif text-pink-900 font-bold">Verifying Admin...</div>;

    return (
        <main className="min-h-screen bg-gray-50 pb-20 text-gray-900">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                
                {/* --- 3-TAB NAVIGATION --- */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-sm border border-pink-50">
                        <button onClick={() => setActiveTab("orders")} className={`px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${activeTab === 'orders' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}>
                            <ShoppingBag size={18} /> ORDERS
                        </button>
                        <button onClick={() => setActiveTab("inventory")} className={`px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${activeTab === 'inventory' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}>
                            <Package size={18} /> INVENTORY
                        </button>
                        <button onClick={() => setActiveTab("backups")} className={`px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${activeTab === 'backups' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}>
                            <History size={18} /> BACKUPS
                        </button>
                    </div>

                    <div className="flex gap-3">
                        {activeTab === 'orders' ? (
                            <button onClick={exportToCSV} className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg"><Download size={18} /> EXPORT LEDGER (CSV)</button>
                        ) : (
                            <>
                                <button onClick={handleSmartSync} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all text-xs">SMART SYNC</button>
                                <button onClick={handleWipeWithBackup} className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all text-xs">WIPE</button>
                            </>
                        )}
                    </div>
                </div>

                {/* --- TAB 1: ORDERS --- */}
                {activeTab === "orders" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-3xl font-serif font-bold text-pink-900 mb-6 flex items-center gap-2 italic"><BarChart3 /> Business Ledger</h2>
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-8 flex flex-col md:flex-row justify-between gap-8">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest">ORDER #{order.id.slice(0,5).toUpperCase()}</span>
                                            <span className="text-xs text-gray-400 font-medium">{order.createdAt?.toDate().toLocaleString()}</span>
                                        </div>
                                        <h3 className="font-bold text-2xl uppercase tracking-tighter flex items-center gap-2"><User size={18} className="text-pink-600"/> {order.customerName}</h3>
                                        <div className="space-y-1 italic text-gray-500 text-sm">
                                            <p className="flex items-center gap-2"><Truck size={14}/> {order.shippingAddress}</p>
                                            <p className="flex items-center gap-2"><Phone size={14}/> {order.customerPhone}</p>
                                        </div>
                                    </div>
                                    <div className="bg-pink-50/50 p-6 rounded-3xl min-w-[300px]">
                                        {order.items?.map((item, i) => (
                                            <div key={i} className="flex justify-between text-xs mb-2"><span className="font-medium">{item.quantity}x {item.title}</span><span className="font-bold">{item.price}</span></div>
                                        ))}
                                        <div className="border-t mt-4 pt-4 flex justify-between items-center"><span className="font-bold text-gray-900">COLLECTED:</span><span className="text-2xl font-black text-pink-700">${order.totalAmount}</span></div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-8 py-4 flex justify-between items-center">
                                    <span className={`text-[10px] font-black uppercase ${order.status === 'Pending' ? 'text-orange-500' : 'text-green-600'}`}>{order.status}</span>
                                    <button onClick={() => updateDoc(doc(db, "orders", order.id), { status: "Shipped" }).then(fetchData)} className="text-[10px] font-black text-pink-900 hover:underline">MARK AS SHIPPED</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- TAB 2: INVENTORY --- */}
                {activeTab === "inventory" && (
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-900 text-white text-[10px] uppercase tracking-widest">
                                <tr><th className="p-6">Product</th><th className="p-6">Category</th><th className="p-6">Price</th><th className="p-6 text-right">Action</th></tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((item) => (
                                    <ProductRow key={item.id} item={item} onUpdate={(id, data) => updateDoc(doc(db, "products", id), data).then(fetchData)} onDelete={(id) => confirm("Delete?") && deleteDoc(doc(db, "products", id)).then(fetchData)} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- TAB 3: BACKUPS --- */}
                {activeTab === "backups" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold text-pink-900">Safety Restore Points</h2>
                        {backups.map((b) => (
                            <div key={b.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex justify-between items-center">
                                <div><p className="font-bold text-gray-800 text-lg">{b.createdAt?.toDate().toLocaleString()}</p><p className="text-sm text-gray-400 italic">{b.itemCount} items captured in this snapshot</p></div>
                                <button onClick={() => handleRestore(b)} className="bg-pink-50 text-pink-600 px-8 py-3 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-pink-600 hover:text-white transition-all"><RotateCcw size={16} /> RESTORE THIS VERSION</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}

function ProductRow({ item, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [price, setPrice] = useState(item.price);
    const [type, setType] = useState(item.type || "Saree");
    return (
        <tr className="hover:bg-pink-50/10">
            <td className="p-6 flex items-center gap-4">
                <img src={item.image} className="w-12 h-16 object-cover rounded-lg shadow-sm" alt="" />
                <div><p className="font-bold text-gray-900 text-xs">{item.title}</p><p className="text-[9px] text-pink-600 font-bold uppercase">{item.code}</p></div>
            </td>
            <td className="p-6">
                {isEditing ? (
                    <select className="p-1 text-xs border rounded" value={type} onChange={e => setType(e.target.value)}>
                        <option value="Saree">Saree</option><option value="Gown">Gown</option><option value="Lehenga">Lehenga</option><option value="Suit">Suit</option><option value="Men">Men</option><option value="Petticoat">Petticoat</option><option value="Accessories">Accessories</option>
                    </select>
                ) : <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.type}</span>}
            </td>
            <td className="p-6">
                {isEditing ? <input className="w-24 p-2 border rounded text-xs font-bold" value={price} onChange={e => setPrice(e.target.value)} /> : <span className="font-bold text-pink-700">{item.price}</span>}
            </td>
            <td className="p-6 text-right space-x-3">
                {isEditing ? <button onClick={async () => { await onUpdate(item.id, { price, type }); setIsEditing(false); }} className="text-green-600 font-bold underline text-xs">SAVE</button> : <button onClick={() => setIsEditing(true)} className="text-gray-300 hover:text-pink-600 transition-colors"><Edit3 size={18}/></button>}
                <button onClick={() => onDelete(item.id)} className="text-gray-100 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
            </td>
        </tr>
    );
}