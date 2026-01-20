// src/lib/searchLogic.js
import { productRegistry } from './productRegistry';

export function searchProducts(query) {
    if (!query || query.length < 2) return [];
    const searchTerm = query.toLowerCase().trim();
    
    // Convert the registry into a list
    const allProducts = Object.keys(productRegistry).map(key => ({
        id: key,
        ...productRegistry[key]
    }));

    return allProducts.filter(item => {
        // Safety check: Make sure description exists
        if (!item.description) return false;

        const title = (item.description.title || "").toLowerCase();
        
        // Handle detail being an array or a string
        const detailText = Array.isArray(item.description.detail) 
            ? item.description.detail.join(" ").toLowerCase() 
            : (item.description.detail || "").toLowerCase();

        const colors = (item.description.colors || "").toLowerCase();
        const code = (item.description.code || "").toLowerCase();

        return title.includes(searchTerm) || 
               detailText.includes(searchTerm) || 
               colors.includes(searchTerm) ||
               code.includes(searchTerm);
    });
}