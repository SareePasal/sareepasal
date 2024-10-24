// assets/js/Store.js
import { makeObservable,observable,action, computed } from "mobx";

class Store {
    products = [
        {
            id: "AR-6047",
            name: 'Zimichoo Balloon Sleeves Blouse',
            price: 19.99,
            image: [
                { src: '/Images/Blouse/Leranath Fashion/AR-6047/AR-6047-1.jpg', alt: '1', width: 300, height: 300 }
            ],
            color: ""
        },
        {
            id: "AR-6058",
            name: 'Silky Zimichoo Blouse',
            price: 17.99,
            image: [
                { src: '/Images/Blouse/Leranath Fashion/AR-6058/AR-6058 (1).jpg', alt: '1', width: 300, height: 300 }
            ],
            color: ""
        },
        {
            id: "H-2276",
            name: 'NEW LAUNCHING BEAUTIFUL FLAIR GOWN',
            price: 39.99,
            image: [
                { src: '/Images/Gown/Leranath Fashion/H-2276/1.jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "LR-1005",
            name: 'GOWN WITH DUPATTA',
            price: 79.99,
            image: [
                { src: '/Images/Gown/Leranath Fashion/LR-1005/LR-1005 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "L-3057",
            name: 'Premium Heavy Faux Georgette Embellished Lehenga',
            price: 94.99,
            image: [
                { src: '/Images/Lehenga/Leranath Fashion/L-3057/L-3057 (1).jpg', alt: '1', width: 430, height: 430 },
            ],
            color: ""
        },
        {
            id: "L-3066",
            name: 'Kasturi Silk Georgette Lehenga',
            price: 99.99,
            image: [
                { src: '/Images/Lehenga/Leranath Fashion/L-3066/L-3066 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "L-3074",
            name: 'Sparkling Lehenga',
            price: 129.99,
            image: [
                { src: '/Images/Lehenga/Leranath Fashion/L-3074/L-3074 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "IC-2411",
            name: 'Premium Silk Kurtha',
            price: 39.99,
            image: [
                { src: '/Images/MensWear/Leranath Fashion/IC-2411/IC-2411 (4).jpg', alt: '4', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "P-1233",
            name: 'Petticoat',
            price: 8.99,
            image: [
                { src: '/Images/Petticoat/Leranath Fashion/Item1/Petticoat1.jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "DB-4090",
            name: 'JIMMY CHOO SILK WITH SEQUENCE EMBROIDERY DESIGN WORK',
            price: 99.99,
            image: [
                { src: '/Images/Saree/Leranath Fashion/DB-4090/DB-4090 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "FB-L228",
            name: 'Net saree with fancy milky rainbow sequence',
            price: 79.99,
            image: [
                { src: '/Images/Saree/Leranath Fashion/FB L228/FB L228 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "NA-4001",
            name: 'Banarasi saree',
            price: 79.99,
            image: [
                { src: '/Images/Saree/Leranath Fashion/NA-4001/NA-4001 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "VC-4052",
            name: 'Chiffon Georgette',
            price: 79.99,
            image: [
                { src: '/Images/Saree/Leranath Fashion/VC-4052/VC-4052 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
    ];
    carts = [];

    constructor() {
        makeObservable(this, {
          carts: observable,
          addToCart: action,
          removeFromCart: action,
          increaseQuantityInCar: action,
          decreaseQuantityInCart: action,
          currentCart: computed,
          totalPrice: computed,
        })
      }

    get totalPrice(){
        
    }
    removeFromCart = (id) =>  {
        this.carts = this.carts.filter(item => {
            return item.product_id !== id;
        });
    }
    increaseQuantityInCar = (id) => {
        this.carts.map(item => {
            if (item.product_id === id) item.quantity += 1;
            return item;
        });
    }
    decreaseQuantityInCart = (id) =>  {
        this.carts.map(item => {
            if (item.product_id === id && item.quantity > 1) item.quantity -= 1;
            return item;
        });
    }
    addToCart = (id) => {
        let found = false;
        this.carts.map(item => {
            if (item.id === id.id) {
                item.quantity += 1;
                item.total += item.price;
                found = true;
            }
            return item;
        });
        if (!found) {
            let item = {}
            for (let i in this.products) {
                if (id.id === this.products[i].id) {
                    item.image = this.products[i].image;
                    item.name = this.products[i].name;
                    item.price = this.products[i].price;
                    item.quantity = 1
                    item.id = this.products[i].id
                    item.total = item.quantity * item.price
                }
            }
            this.carts.push(item);
        }
    }
    get currentCart() {
        return this.carts;
    }

    get totalPrice(){
        return this.carts.reduce((n,{total})=> n + total,0)
    }
}
export default Store;
