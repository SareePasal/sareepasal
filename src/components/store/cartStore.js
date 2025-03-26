// store/cartStore.js
import { makeAutoObservable, toJS } from "mobx";

class CartStore {
  currentCart = [];
  selectedState = '';
  stateTaxRate = 0;
  
  // State tax rates (can be moved to constants if preferred)
  stateTaxRates = {
    'Alabama': 0.04,
    'Alaska': 0,
    'Arizona': 0.056,
    'Arkansas': 0.065,
    'California': 0.0725,
    'Colorado': 0.029,
    'Connecticut': 0.0635,
    'Delaware': 0,
    'Florida': 0.06,
    'Georgia': 0.04,
    'Hawaii': 0.04,
    'Idaho': 0.06,
    'Illinois': 0.0625,
    'Indiana': 0.07,
    'Iowa': 0.06,
    'Kansas': 0.065,
    'Kentucky': 0.06,
    'Louisiana': 0.0445,
    'Maine': 0.055,
    'Maryland': 0.06,
    'Massachusetts': 0.0625,
    'Michigan': 0.06,
    'Minnesota': 0.06875,
    'Mississippi': 0.07,
    'Missouri': 0.04225,
    'Montana': 0,
    'Nebraska': 0.055,
    'Nevada': 0.0685,
    'New Hampshire': 0,
    'New Jersey': 0.06625,
    'New Mexico': 0.05125,
    'New York': 0.04,
    'North Carolina': 0.0475,
    'North Dakota': 0.05,
    'Ohio': 0.0575,
    'Oklahoma': 0.045,
    'Oregon': 0,
    'Pennsylvania': 0.06,
    'Rhode Island': 0.07,
    'South Carolina': 0.06,
    'South Dakota': 0.045,
    'Tennessee': 0.07,
    'Texas': 0.0625,
    'Utah': 0.0485,
    'Vermont': 0.06,
    'Virginia': 0.043,
    'Washington': 0.065,
    'West Virginia': 0.06,
    'Wisconsin': 0.05,
    'Wyoming': 0.04
  };

  constructor() {
    makeAutoObservable(this);
    this.loadCart();
    this.loadState(); // Load saved state if available
  }

  // Load cart from localStorage
  loadCart = () => {
    try {
      const savedCart = localStorage.getItem('sareePasalCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          this.currentCart = parsedCart;
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    }
  };

  // Load state from localStorage
  loadState = () => {
    try {
      const savedState = localStorage.getItem('sareePasalState');
      if (savedState) {
        const { state, taxRate } = JSON.parse(savedState);
        this.selectedState = state;
        this.stateTaxRate = taxRate;
      }
    } catch (error) {
      console.error('Failed to load state from localStorage', error);
    }
  };

  // Save state to localStorage
  saveState = () => {
    try {
      localStorage.setItem('sareePasalState', JSON.stringify({
        state: this.selectedState,
        taxRate: this.stateTaxRate
      }));
    } catch (error) {
      console.error('Failed to save state to localStorage', error);
    }
  };

  // Save cart to localStorage
  saveCart = () => {
    try {
      localStorage.setItem('sareePasalCart', JSON.stringify(toJS(this.currentCart)));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  };

  // Set shipping state and calculate tax rate
  setShippingState = (state) => {
    this.selectedState = state;
    this.stateTaxRate = this.stateTaxRates[state] || 0;
    this.saveState();
  };

  // Calculate taxes
  get taxes() {
    return parseFloat((this.totalPrice * this.stateTaxRate).toFixed(2));
  }

  // Calculate grand total
  get grandTotal() {
    return parseFloat((this.totalPrice + this.taxes).toFixed(2));
  }

  // Add item to cart or increase quantity
  addToCart = (item) => {
    if (!item?.id || typeof item?.price !== 'number') {
      console.error('Invalid item format', item);
      return false;
    }

    const price = typeof item.price === 'string' 
      ? parseFloat(item.price) 
      : item.price;

    if (isNaN(price)) {
      console.error('Invalid price value:', item.price);
      return false;
    }

    const existingItem = this.currentCart.find(i => 
      i.id === item.id && 
      (i.color || '') === (item.color || '') && 
      (i.size || '') === (item.size || '')
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.currentCart.push({ 
        id: item.id,
        name: item.name || 'Unnamed Product',
        price: price,
        image: item.image || item.images?.[0] || '/default-product.jpg',
        color: item.color || '',
        size: item.size || '',
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }
    
    this.saveCart();
    return true;
  };

  // Increase quantity of specific item
  increaseQuantityInCart = (itemId) => {
    const item = this.currentCart.find(i => i.id === itemId);
    if (item) {
      item.quantity += 1;
      this.saveCart();
    }
  };

  // Decrease quantity or remove item
  decreaseQuantityInCart = (itemId) => {
    const itemIndex = this.currentCart.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
      if (this.currentCart[itemIndex].quantity > 1) {
        this.currentCart[itemIndex].quantity -= 1;
      } else {
        this.currentCart.splice(itemIndex, 1);
      }
      this.saveCart();
    }
  };

  // Clear the entire cart
  clearCart = () => {
    this.currentCart = [];
    try {
      localStorage.removeItem('sareePasalCart');
    } catch (error) {
      console.error('Failed to clear cart from localStorage', error);
    }
  };

  // Set cart from external source (for hydration)
  setCart = (items) => {
    if (Array.isArray(items)) {
      this.currentCart = items;
      this.saveCart();
    }
  };

  // Calculate total price
  get totalPrice() {
    return parseFloat(this.currentCart.reduce(
      (total, item) => total + (Number(item.price) * Number(item.quantity)),
      0
    ).toFixed(2));
  }

  // Get total item count
  get itemCount() {
    return this.currentCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }
}

export default CartStore;