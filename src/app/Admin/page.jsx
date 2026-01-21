"use client";
import React, { useState, useEffect } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { auth, db, isAdmin } from '../../lib/firebase';
import { productRegistry } from '../../lib/productRegistry';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
    collection, getDocs, doc, setDoc, updateDoc, deleteDoc, 
    query, orderBy, writeBatch, addDoc, serverTimestamp 
} from 'firebase/firestore';
import { 
    Tag, Play, RefreshCw, Loader2, Save, Plus, X, 
    Edit3, Trash2, Package, ShoppingBag, Download, 
    User, Truck, Phone, CheckCircle2, Clock, Images, Bomb, FileJson, History, Undo2
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

    const fetchData = async () => {
        setLoading(true);
        try {
            const prodSnap = await getDocs(collection(db, "products"));
            setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })));
            const orderSnap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
            setOrders(orderSnap.docs.map(d => ({ id: d.id, ...d.data() })));
            const backupSnap = await getDocs(query(collection(db, "backups"), orderBy("createdAt", "desc")));
            setBackups(backupSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { if (user && isAdmin(user)) fetchData(); }, [user]);

    const handleCreateBackup = async (label = "Manual Ad-Hoc") => {
        setIsProcessing(true);
        try {
            const backupData = { label, createdAt: serverTimestamp(), productCount: products.length, data: products };
            await addDoc(collection(db, "backups"), backupData);
            if (!label.includes("AUTO")) alert(`Backup "${label}" saved! 💾`);
            fetchData();
        } catch (e) { alert("Backup failed: " + e.message); }
        finally { setIsProcessing(false); }
    };

    const handleSyncContent = async () => {
        if (!confirm("SYNC: Updates Images/Videos from code but KEEPS cloud prices. Continue?")) return;
        setIsProcessing(true);
        try {
            for (const key of Object.keys(productRegistry)) {
                const data = productRegistry[key];
                const productID = data.description.code || key;
                await setDoc(doc(db, "products", productID), {
                    allImages: data.images.map(img => img.src),
                    image: data.images[0].src,
                    videoUrl: data.description.videoUrl || "", 
                }, { merge: true });
            }
            alert("Sync Complete! 🌸");
            fetchData();
        } catch (e) { alert(e.message); }
        finally { setIsProcessing(false); }
    };

    const handleWipeAndRestore = async () => {
        const secret = prompt("DANGER: Wipes cloud and reloads from code files. Auto-backup will be made. Type 'WIPE' to confirm:");
        if (secret !== "WIPE") return;
        setIsProcessing(true);
        try {
            await handleCreateBackup("AUTO_PRE_WIPE"); 
            const batch = writeBatch(db);
            products.forEach((p) => batch.delete(doc(db, "products", p.id)));
            await batch.commit();

            for (const key of Object.keys(productRegistry)) {
                const data = productRegistry[key];
                const productID = data.description.code || key;
                await setDoc(doc(db, "products", productID), {
                    title: data.description.title, price: data.description.price, code: data.description.code,
                    details: data.description.detail?.join("\n") || "", image: data.images[0].src,
                    allImages: data.images.map(img => img.src), videoUrl: data.description.videoUrl || "",
                    type: "Saree", quantity: 10, isOnSale: false
                });
            }
            alert("System Restored from Code Files!");
            fetchData();
        } catch (e) { alert(e.message); }
        finally { setIsProcessing(false); }
    };

    const handleRestoreFromHistory = async (backupItem) => {
        if (!confirm(`RESTORE: This will overwrite EVERYTHING with data from "${backupItem.label}". Continue?`)) return;
        setIsProcessing(true);
        try {
            const batch = writeBatch(db);
            products.forEach((p) => batch.delete(doc(db, "products", p.id)));
            await batch.commit();
            for (const prod of backupItem.data) { await setDoc(doc(db, "products", prod.id), prod); }
            alert("Successfully restored from backup history! 🔄");
            fetchData();
        } catch (e) { alert(e.message); }
        finally { setIsProcessing(false); }
    };

    if (!user || !isAdmin(user)) return <div className="p-20 text-center font-serif text-pink-900 font-bold">Verifying Admin Access...</div>;

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                
                <div className="flex flex-col gap-8 mb-12">
                    {/* DANGER ZONE AT THE VERY TOP - ONLY ON INVENTORY TAB */}
                    {activeTab === "inventory" && (
                        <div className="bg-red-50 p-4 rounded-3xl border border-red-100 flex justify-between items-center animate-in fade-in slide-in-from-top-4">
                            <p className="text-red-700 text-[10px] font-bold px-4 uppercase tracking-wider">Danger: Wipe & Restore from Backup Files (Code)</p>
                            <button onClick={handleWipeAndRestore} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-red-800 transition-all"><Bomb size={16}/> WIPE & FORCE RESTORE</button>
                        </div>
                    )}

                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-sm border border-pink-50 overflow-x-auto no-scrollbar">
                            <button onClick={() => setActiveTab("orders")} className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'orders' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}><ShoppingBag size={18} /> ORDERS</button>
                            <button onClick={() => setActiveTab("inventory")} className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'inventory' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}><Package size={18} /> INVENTORY</button>
                            <button onClick={() => setActiveTab("history")} className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all ${activeTab === 'history' ? 'bg-pink-900 text-white shadow-xl' : 'text-gray-400'}`}><History size={18} /> BACKUP HISTORY</button>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            <button onClick={() => handleCreateBackup()} className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"><Save size={18}/> CREATE BACKUP</button>
                            <button onClick={handleSyncContent} className="bg-gray-900 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-black transition-all"><RefreshCw size={18}/> SYNC CONTENT</button>
                            <button onClick={() => setShowAddModal(true)} className="bg-pink-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-pink-700 transition-all"><Plus size={18}/> ADD NEW</button>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                {activeTab === "inventory" ? (
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-900 text-white text-[10px] uppercase tracking-widest">
                                <tr>
                                    <th className="p-8">Product</th>
                                    <th className="p-8 text-center">Category</th>
                                    <th className="p-8 text-center">Price</th>
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
                ) : activeTab === "history" ? (
                    <div className="space-y-4 animate-in slide-in-from-right-4">
                        <h2 className="text-2xl font-serif font-bold text-pink-900 px-4">Cloud Backup Log</h2>
                        {backups.map((b) => (
                            <div key={b.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-pink-100 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${(b.label || "").includes('AUTO') ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}><FileJson size={20}/></div>
                                    <div><p className="font-bold text-gray-800">{b.label || "Unnamed Backup"}</p><p className="text-xs text-gray-400">{b.createdAt?.toDate().toLocaleString()} • {b.productCount} Items</p></div>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => handleRestoreFromHistory(b)} className="text-blue-600 font-bold text-[10px] uppercase flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Undo2 size={14}/> Restore This</button>
                                    <button onClick={() => {
                                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(b.data, null, 2));
                                        const link = document.createElement('a'); link.href = dataStr; link.download = `sareepasal_${b.label}.json`; link.click();
                                    }} className="text-gray-400 hover:text-pink-600 transition-all"><Download size={18}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-6">
                                    <div><h3 className="font-bold text-xl text-pink-900">{order.customerName}</h3><p className="text-xs text-gray-400 uppercase font-black tracking-widest">{order.id}</p></div>
                                    <span className="bg-pink-50 text-pink-600 px-4 py-2 rounded-full font-bold text-xs">Total: ${order.totalAmount}</span>
                                </div>
                                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2"><Truck size={16}/> {order.shippingAddress}</div>
                                    <div className="flex items-center gap-2"><Phone size={16}/> {order.customerPhone}</div>
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
    const [videoUrl, setVideoUrl] = useState(item.videoUrl || "");

    return (
        <tr className="hover:bg-pink-50/10 transition-all">
            <td className="p-8 flex items-center gap-6">
                <img src={item.image} className="w-14 h-20 object-cover rounded-xl shadow-md border" alt="" />
                <div className="max-w-xs">
                    <p className="font-bold text-gray-900 leading-tight">{item.title}</p>
                    <p className="text-[10px] text-pink-600 font-bold uppercase mt-1">{item.code}</p>
                </div>
            </td>
            <td className="p-8 text-center">
                {isEditing ? (
                    <select className="p-2 border rounded font-bold text-xs uppercase" value={type} onChange={e => setType(e.target.value)}>
                        <option value="Saree">Saree</option><option value="Gown">Gown</option><option value="Lehenga">Lehenga</option><option value="Suit">Suit</option><option value="Men">Men</option>
                    </select>
                ) : (
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-black uppercase">{item.type || "Saree"}</span>
                )}
            </td>
            <td className="p-8 text-center">
                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <input className="p-2 border rounded font-bold text-pink-700 text-xs text-center" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
                        <input className="p-2 border rounded text-[8px] w-32" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="Video Path" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-gray-800">{item.price}</span>
                        {item.videoUrl && <span className="text-[8px] text-green-600 font-black mt-1 flex items-center gap-1"><Play size={8} fill="currentColor"/> VIDEO</span>}
                    </div>
                )}
            </td>
            <td className="p-8 text-right space-x-3">
                {isEditing ? (
                    <button onClick={() => { onUpdate(item.id, { price, type, videoUrl }); setIsEditing(false); }} className="text-green-600 font-bold underline text-xs">SAVE</button>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="text-gray-300 hover:text-pink-600 transition-colors"><Edit3 size={18}/></button>
                        <button onClick={() => onDelete(item.id)} className="text-gray-200 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    </>
                )}
            </td>
        </tr>
    );
}

function AddProductModal({ onClose, onSave }) {
    const [newP, setNewP] = useState({ title: "", price: "", code: "", image: "", type: "Saree", details: "", videoUrl: "" });
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
                <input required placeholder="Main Image Path" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, image: e.target.value})} />
                <input placeholder="Video Path (Optional)" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setNewP({...newP, videoUrl: e.target.value})} />
                <button className="w-full bg-pink-900 text-white py-4 rounded-2xl font-bold shadow-xl">SAVE PRODUCT</button>
                <button type="button" onClick={onClose} className="w-full text-gray-400 font-bold text-xs uppercase mt-2">Nevermind</button>
            </form>
        </div>
    );
}