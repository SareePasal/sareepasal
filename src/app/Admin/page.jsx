"use client";
import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { auth, db, isAdmin } from '../../lib/firebase';
import { productRegistry } from '../../lib/productRegistry';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
    collection, getDocs, doc, setDoc, updateDoc, deleteDoc, 
    query, orderBy, writeBatch, addDoc, serverTimestamp, getDoc 
} from 'firebase/firestore';
import { 
    Tag, Play, RefreshCw, Loader2, Save, Plus, X, 
    Edit3, Trash2, Package, ShoppingBag, Download, 
    User, Truck, Phone, CheckCircle2, Clock, Filter, Search, FileJson, 
    History as HistoryIcon, Undo2, Bomb, ShieldCheck
} from 'lucide-react';

export default function AdminDashboard() {
    const [user] = useAuthState(auth);
    const [activeTab, setActiveTab] = useState("inventory"); 
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [backups, setBackups] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterCat, setFilterCat] = useState("All");

    const fetchData = async () => {
        setLoading(true);
        try {
            const prodSnap = await getDocs(collection(db, "products"));
            let list = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            
            // Sort logic: Group by Category then Title
            list.sort((a, b) => {
                const catA = (a.type || "Z").toLowerCase();
                const catB = (b.type || "Z").toLowerCase();
                if (catA < catB) return -1;
                if (catA > catB) return 1;
                return (a.title || "").localeCompare(b.title || "");
            });
            setProducts(list);

            const orderSnap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
            setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })));

            const backupSnap = await getDocs(query(collection(db, "backups"), orderBy("createdAt", "desc")));
            setBackups(backupSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) { console.error("Load Error:", err); }
        finally { setLoading(false); }
    };

    useEffect(() => { if (user && isAdmin(user)) fetchData(); }, [user]);

    // --- 1. CREATE BACKUP (RESTORED) ---
    const handleCreateBackup = async (label = "Manual Admin Backup") => {
        setIsProcessing(true);
        try {
            const backupData = { 
                label, 
                createdAt: serverTimestamp(), 
                productCount: products.length, 
                data: products 
            };
            await addDoc(collection(db, "backups"), backupData);
            if (!label.includes("AUTO")) alert(`Backup "${label}" saved successfully! 💾`);
            fetchData();
        } catch (e) { alert("Backup failed: " + e.message); }
        finally { setIsProcessing(false); }
    };

    // --- 2. SMART SYNC (PREVENTS DUPLICATES & PROTECTS PRICES) ---
    const handleSyncContent = async () => {
        if (!confirm("SYNC: This adds products by Code. Existing prices/categories are 100% SAFE. Continue?")) return;
        setIsProcessing(true);
        try {
            const keys = Object.keys(productRegistry);
            for (const key of keys) {
                const data = productRegistry[key];
                // Use Product Code as ID to prevent duplicates
                const productCode = (data.description.code || key).replace(/\s+/g, '').toUpperCase();
                const docRef = doc(db, "products", productCode);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Update only missing content
                    const cloud = docSnap.data();
                    const updates = {};
                    if (!cloud.videoUrl && data.description.videoUrl) updates.videoUrl = data.description.videoUrl;
                    if (!cloud.allImages || cloud.allImages.length === 0) updates.allImages = data.images.map(i => i.src);
                    if (Object.keys(updates).length > 0) await updateDoc(docRef, updates);
                } else {
                    // Create New
                    let type = "Saree";
                    const lowerKey = key.toLowerCase();
                    if (lowerKey.includes('gown')) type = "Gown";
                    else if (lowerKey.includes('lehenga')) type = "Lehenga";
                    else if (lowerKey.includes('suit')) type = "Suit";
                    else if (lowerKey.includes('pet')) type = "Petticoat";
                    else if (lowerKey.startsWith('ab') || lowerKey.startsWith('an') || lowerKey.startsWith('ad')) type = "Accessories";

                    await setDoc(docRef, {
                        title: data.description.title, price: data.description.price, code: productCode,
                        type: type, image: data.images[0].src, allImages: data.images.map(img => img.src),
                        details: data.description.detail?.join("\n") || "", videoUrl: data.description.videoUrl || "",
                        quantity: 10, isOnSale: false, variants: []
                    });
                }
            }
            alert("Smart Sync Complete! 🌸");
            fetchData();
        } catch (e) { alert("Sync Error: " + e.message); }
        finally { setIsProcessing(false); }
    };

    // --- 3. DANGER WIPE ---
    const handleWipeAndRestore = async () => {
        const secret = prompt("DANGER: This wipes the cloud. Manual changes will be LOST. Type 'WIPE' to confirm:");
        if (secret !== "WIPE") return;
        setIsProcessing(true);
        try {
            await handleCreateBackup("AUTO_PRE_WIPE"); 
            const batch = writeBatch(db);
            products.forEach((p) => batch.delete(doc(db, "products", p.id)));
            await batch.commit();
            await handleSyncContent();
        } catch (e) { alert(e.message); }
        finally { setIsProcessing(false); }
    };

    const handleRestoreFromHistory = async (backupItem) => {
        if (!confirm(`RESTORE: Overwrite everything with "${backupItem.label}"?`)) return;
        setIsProcessing(true);
        try {
            const batch = writeBatch(db);
            products.forEach((p) => batch.delete(doc(db, "products", p.id)));
            await batch.commit();
            for (const prod of backupItem.data) { await setDoc(doc(db, "products", prod.id), prod); }
            alert("Restored! 🔄");
            fetchData();
        } catch (e) { alert(e.message); }
        finally { setIsProcessing(false); }
    };

    const displayItems = products.filter(p => {
        const matchesSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || p.code?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = filterCat === "All" || p.type === filterCat;
        return matchesSearch && matchesCat;
    });

    if (!user || !isAdmin(user)) return <div className="p-20 text-center font-serif font-bold text-pink-900">Verifying Admin Access...</div>;

    return (
        <main className="min-h-screen bg-gray-50 pb-20 text-gray-800">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                
                {activeTab === "inventory" && (
                    <div className="bg-red-50 p-4 rounded-3xl border border-red-100 flex justify-between items-center mb-8">
                        <p className="text-red-700 text-[10px] font-black uppercase tracking-widest ml-4 italic underline underline-offset-4">Danger Zone: Refresh Database from Code Files</p>
                        <button onClick={handleWipeAndRestore} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-red-800 transition-all shadow-lg"><Bomb size={16}/> WIPE & FORCE RESTORE</button>
                    </div>
                )}

                <div className="flex flex-col gap-8 mb-12">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-sm border border-pink-50 overflow-x-auto no-scrollbar">
                            <button onClick={() => setActiveTab("orders")} className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'orders' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}><ShoppingBag size={18} /> ORDERS</button>
                            <button onClick={() => setActiveTab("inventory")} className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'inventory' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}><Package size={18} /> INVENTORY</button>
                            <button onClick={() => setActiveTab("history")} className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'history' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}><HistoryIcon size={18} /> BACKUP LOG</button>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            <button onClick={() => handleCreateBackup()} className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all uppercase text-[10px] tracking-widest"><ShieldCheck size={18}/> Create Backup</button>
                            <button onClick={handleSyncContent} className="bg-gray-900 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-black transition-all uppercase text-[10px] tracking-widest"><RefreshCw size={18}/> Sync Content</button>
                            <button onClick={() => setShowAddModal(true)} className="bg-pink-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-pink-700 transition-all uppercase text-[10px] tracking-widest"><Plus size={18}/> Add New</button>
                        </div>
                    </div>
                </div>

                {activeTab === "inventory" ? (
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-6 bg-gray-900 flex flex-wrap gap-4 items-center justify-between">
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input className="w-full bg-gray-800 border-none rounded-xl py-2.5 pl-10 text-white text-sm focus:ring-1 focus:ring-pink-500" placeholder="Search by name or code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest">
                                <Filter size={14} className="text-pink-500" /> Filter:
                                <select className="bg-gray-800 border-none rounded-lg p-2 focus:ring-1 focus:ring-pink-500 cursor-pointer" value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
                                    <option value="All">All Categories</option>
                                    <option value="Saree">Saree</option><option value="Gown">Gown</option><option value="Lehenga">Lehenga</option><option value="Suit">Suit</option><option value="Men">Men</option><option value="Petticoat">Petticoat</option><option value="Accessories">Accessories</option>
                                </select>
                            </div>
                        </div>

                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b">
                                <tr>
                                    <th className="p-8">Garment</th>
                                    <th className="p-8 text-center">Category</th>
                                    <th className="p-8 text-center">Price</th>
                                    <th className="p-8 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {displayItems.map((item) => (
                                    <ProductRow key={item.id} item={item} onUpdate={(id, data) => updateDoc(doc(db, "products", id), data).then(fetchData)} onDelete={(id) => confirm("Delete permanently?") && deleteDoc(doc(db, "products", id)).then(fetchData)} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : activeTab === "history" ? (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold text-pink-900 px-4 flex items-center gap-2 underline decoration-pink-200">System Backup History</h2>
                        {backups.map((b) => (
                            <div key={b.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-pink-100 flex justify-between items-center transition-all hover:border-pink-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><FileJson size={20}/></div>
                                    <div><p className="font-bold text-gray-800">{b.label}</p><p className="text-xs text-gray-400 font-medium">{b.createdAt?.toDate().toLocaleString()} • {b.productCount} Items</p></div>
                                </div>
                                <button onClick={() => handleRestoreFromHistory(b)} className="text-blue-600 font-black text-[10px] uppercase flex items-center gap-1 bg-blue-50 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all">Restore</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4 px-4">
                            <h2 className="text-3xl font-serif font-bold text-pink-900 flex items-center gap-2"><ShoppingBag /> Recent Sales</h2>
                            <button onClick={() => {}} className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold text-[10px] uppercase shadow-lg flex items-center gap-2 transition-all hover:bg-green-700 uppercase tracking-widest"><Download size={14}/> Export CSV</button>
                        </div>
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-6">
                                    <div><h3 className="font-bold text-2xl uppercase tracking-tighter text-pink-900 italic">{order.customerName}</h3><p className="text-xs text-gray-400 font-black uppercase tracking-widest mt-1">ID: {order.id.slice(0,10)}</p></div>
                                    <div className="text-right"><p className="text-3xl font-black text-gray-900">${order.totalAmount}</p><button onClick={() => updateDoc(doc(db, "orders", order.id), { status: "Shipped" }).then(fetchData)} className="bg-gray-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase mt-2">{order.status === 'Pending' ? 'Mark Shipped' : 'Shipped ✓'}</button></div>
                                </div>
                                <div className="flex flex-wrap gap-10 text-sm text-gray-600 border-t pt-6 font-medium italic">
                                    <p className="flex items-start gap-2"><Truck size={18} className="text-pink-200 shrink-0"/> {order.shippingAddress}</p>
                                    <p className="flex items-center gap-2"><Phone size={18} className="text-pink-200 shrink-0"/> {order.customerPhone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} onSave={fetchData} />}
            <Footer />
        </main>
    );
}

function ProductRow({ item, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [price, setPrice] = useState(item.price);
    const [type, setType] = useState(item.type || "Saree");

    return (
        <tr className="hover:bg-pink-50/10 transition-all group font-medium border-l-4 border-transparent hover:border-pink-500">
            <td className="p-8 flex items-center gap-6">
                <img src={item.image} className="w-14 h-20 object-cover rounded-xl shadow-md border border-pink-50" alt="" />
                <div className="max-w-xs">
                    <p className="font-bold text-gray-900 leading-tight text-lg">{item.title}</p>
                    <p className="text-[9px] text-pink-600 font-black uppercase mt-1 tracking-widest">{item.code}</p>
                </div>
            </td>
            <td className="p-8 text-center">
                {isEditing ? (
                    <select className="p-2 border rounded-lg font-bold text-xs uppercase bg-white border-pink-200" value={type} onChange={e => setType(e.target.value)}>
                        <option value="Saree">Saree</option><option value="Gown">Gown</option><option value="Lehenga">Lehenga</option><option value="Suit">Suit</option><option value="Men">Men</option><option value="Petticoat">Petticoat</option><option value="Accessories">Accessories</option>
                    </select>
                ) : (
                    <span className="bg-pink-50 text-pink-700 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{item.type || "Saree"}</span>
                )}
            </td>
            <td className="p-8 text-center">
                {isEditing ? <input className="w-24 p-2 border rounded-lg font-black text-pink-700 text-xs text-center border-pink-200" value={price} onChange={e => setPrice(e.target.value)} /> : <span className="font-black text-gray-800 text-lg">{item.price}</span>}
            </td>
            <td className="p-8 text-right space-x-3">
                {isEditing ? (
                    <div className="flex justify-end gap-2">
                        <button onClick={() => { onUpdate(item.id, { price, type }); setIsEditing(false); }} className="bg-pink-900 text-white p-2 rounded-lg shadow-lg uppercase text-[10px] font-black">Save</button>
                        <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-400 p-2 rounded-lg text-[10px] uppercase font-black">X</button>
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

function AddProductModal({ onClose, onSave }) {
    const [newP, setNewP] = useState({ title: "", price: "", code: "", image: "", type: "Saree", details: "" });
    const handleAdd = async (e) => {
        e.preventDefault();
        const id = newP.code.replace(/\s+/g, '').toUpperCase();
        await setDoc(doc(db, "products", id), { ...newP, quantity: 10, allImages: [newP.image], isOnSale: false, showInBanner: false, variants: [] });
        alert("Success! Product Added."); onSave(); onClose();
    };
    return (
        <div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleAdd} className="bg-white p-12 rounded-[4rem] w-full max-w-xl space-y-6 shadow-2xl relative border-8 border-pink-50">
                <button type="button" onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-red-500"><X size={32}/></button>
                <h2 className="text-3xl font-serif font-bold text-pink-900 mb-2 italic tracking-tighter">New Product Arrival</h2>
                <input required placeholder="Product Title" className="w-full p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 font-bold shadow-inner" onChange={e => setNewP({...newP, title: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="Price ($)" className="p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 font-black text-pink-700 shadow-inner" onChange={e => setNewP({...newP, price: e.target.value})} />
                    <select className="p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 font-black uppercase text-xs tracking-widest shadow-inner cursor-pointer" onChange={e => setNewP({...newP, type: e.target.value})}>
                        <option value="Saree">Saree</option><option value="Gown">Gown</option><option value="Lehenga">Lehenga</option><option value="Suit">Suit</option><option value="Men">Men</option><option value="Petticoat">Petticoat</option><option value="Accessories">Accessories</option>
                    </select>
                </div>
                <input required placeholder="Unique Code" className="w-full p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 shadow-inner" onChange={e => setNewP({...newP, code: e.target.value})} />
                <input required placeholder="Main Image URL" className="w-full p-5 bg-gray-50 rounded-3xl border-none focus:ring-2 focus:ring-pink-500 shadow-inner" onChange={e => setNewP({...newP, image: e.target.value})} />
                <button className="w-full bg-pink-900 text-white py-5 rounded-[2.5rem] font-black text-lg shadow-2xl shadow-pink-900/30 hover:bg-black transition-all uppercase tracking-[0.2em]">Add to Collection</button>
            </form>
        </div>
    );
}