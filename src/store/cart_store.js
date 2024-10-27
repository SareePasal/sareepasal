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
            id: "AR-6053",
            name: 'Jari Embroidery & Sequence Blouse',
            price: 17.99,
            image: [
                { src: '/Images/Blouse/Leranath Fashion/AR-6053/AR6053 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "H-2276",
            name: 'NEW LAUNCHING BEAUTIFUL FLAIR GOWN',
            price: 34.99,
            image: [
                { src: '/Images/Gown/Leranath Fashion/H-2276/1.jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "LR-1005",
            name: 'GOWN WITH DUPATTA',
            price: 69.99,
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
            id: "IC-2411",
            name: 'Premium Silk Kurtha',
            price: 39.99,
            image: [
                { src: '/Images/MensWear/Leranath Fashion/IC-2411/IC-2411 (2).jpg', alt: '2', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "AG72579",
            name: 'BANGLORI SILK MENS KURTA',
            price: 49.99,
            image: [
                { src: '/Images/MensWear/Appereal Garment/72579/72579-4 (2).jpeg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "AG71422",
            name: 'SILK EMBROIDERY',
            price: 39.99,
            image: [
                { src: '/Images/MensWear/Appereal Garment/71422-1/71422-1 (2).jpeg', alt: '2', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "AG69762",
            name: 'RAYON LUCKNOWI SEQUENCE WORK MEN’S',
            price: 34.99,
            image: [
                { src: '/Images/MensWear/Appereal Garment/69762/69762-1.jpg', alt: '2', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "AG68734",
            name: 'COTTON JACQUARD WORK MEN’S',
            price: 34.99,
            image: [
                { src: '/Images/MensWear/Appereal Garment/68734/68734-7 (1).jpeg', alt: '2', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "AG67333",
            name: 'COTTON EMBROIDERY WORK MEN’S KURTA',
            price: 44.99,
            image: [
                { src: '/Images/MensWear/Appereal Garment/67333/67333-1 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "AG64101",
            name: 'COTTON SEQUENCE WORK MEN’S KURTA WITH PAYJAMA',
            price: 34.99,
            image: [
                { src: '/Images/MensWear/Appereal Garment/64101/64101-5.jpeg', alt: '2', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "DB-4090",
            name: 'JIMMY CHOO SILK WITH SEQUENCE EMBROIDERY DESIGN WORK',
            price: 69.99,
            image: [
                { src: '/Images/Saree/Leranath Fashion/DB-4090/DB-4090 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "FB-L228",
            name: 'Net saree with fancy milky rainbow sequence',
            price: 59.99,
            image: [
                { src: '/Images/Saree/Leranath Fashion/FB L228/FB L228 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "NA-4001",
            name: 'Banarasi saree',
            price: 59.99,
            image: [
                { src: '/Images/Saree/Leranath Fashion/NA-4001/NA-4001 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "VC-4052",
            name: 'Chiffon Georgette',
            price: 64.99,
            image: [
                { src: '/Images/Saree/Leranath Fashion/VC-4052/VC-4052 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "EG48594-3",
            name: 'GEORGETTE EMBROIDERY DESIGN WORK FULL STITCHED KURTI',
            price: 36.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/EG48594-3/EG48594-3 (2).jpg', alt: '2', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "73369",
            name: 'GEORGETTE EMBROIDERY WORK GOWN BOTTOM WITH DUPATTA',
            price: 54.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/73369/73369 (7).jpeg', alt: '7', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "73225-2",
            name: 'Chinon sequence embroidery work top palazzo with dupatta',
            price: 49.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/73225/73225-2 (1).jpg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "72483",
            name: 'ATTRACTIVE GEORGETTE EMBROIDERY WORK CHOLI WITH PRINTED SHRUG',
            price: 59.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/72483/72483 (8).jpg', alt: '8', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "72430",
            name: 'GEORGETTE EMBROIDERY WORK CHOLI SHARARA',
            price: 59.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/72430/72430 (2).jpg', alt: '2', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "71970",
            name: 'DESIGNER GEORGETTE EMBROIDERY LACE WORK SHRUG CHOLI',
            price: 59.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/71970/71970-1 (3).jpeg', alt: '3', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "71901",
            name: 'TOP PALAZZO KOTI WITH DUPATTA LAVENDER',
            price: 49.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/71901/71901 (1).jpg', alt: '1', width: 213, height: 300 },
            ],
            color: ""
        },
        {
            id: "71820",
            name: 'CHINON SILK EMBROIDERY WORK GOWN PALAZZO WITH DUPATTA MUSTARD',
            price: 49.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/71820/71820-3 (3).jpeg', alt: '3', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "71236",
            name: 'GEORGETTE SEQUENCE EMBROIDERY WORK GOWN PANT',
            price: 49.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/71236/71236 (1).jpeg', alt: '3', width: 225, height: 300 },
            ],
            color: ""
        },
        {
            id: "69583",
            name: 'Fancy organza embroidrey top palazzo with dupatta',
            price: 39.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/69583/69583 (1).jpeg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "AG68776",
            name: 'ROMAN COTTON PLAIN GOWN BOTTOM WITH EMBROIDERY WORK',
            price: 69.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/68776/68776-2 (1).jpeg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "68685",
            name: 'PARTY WEAR GEORGETTE EMBROIDERY SEQUENCE WORK TOP DHOTI',
            price: 54.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/68685/60670 (1).jpg', alt: '1', width: 230, height: 300 },
            ],
            color: ""
        },
        {
            id: "68177",
            name: 'GEORGETTE KALMKARI PRINT WORK ANARKALI GOWN BOTTOM WITH DUPATTA',
            price: 44.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/68177/68177 (4).jpeg', alt: '1', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "68133",
            name: 'GEORGETTE PLAIN GOWN BOTTOM WITH EMBROIDERY SEQUENCE',
            price: 44.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/68133/68133 (2).jpeg', alt: '2', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "65068",
            name: 'ORGANZA BEAUTIFUL PRINT WORK GOWN BOTTOM WITH DUPATTA RAM',
            price: 44.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/65068/65068-1 (1).jpeg', alt: '4', width: 300, height: 300 },
            ],
            color: ""
        },
        {
            id: "62914",
            name: 'TRENDY GEORGETTE EMBROIDERY THREAD WORK TOP PALAZZO',
            price: 44.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/62914-10/62914-10 (1).jpg', alt: '1', width: 280, height: 300 },
            ],
            color: ""
        },
        {
            id: "62914",
            name: 'GEORGETTE EMBROIDERY SEQUENCE WORK GOWN BOTTOM WITH DUPATTA YELLOW',
            price: 59.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/62597/62597 (1).jpeg', alt: '3', width: 225, height: 300 },
            ],
            color: ""
        },
        {
            id: "AG356",
            name: 'ROMAN COTTON PLAIN GOWN BOTTOM WITH EMBROIDERY WORK',
            price: 54.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/356-9356/AG356 (1).jpg', alt: '1', width: 330, height: 300 },
            ],
            color: ""
        },
        {
            id: "AG337",
            name: 'PURE CHINON EMBROIDERY LACE WORK GOWN ATTACHED DUPATTA',
            price: 44.99,
            image: [
                { src: '/Images/Suits/Appereal Garment/AG337-2/AG337-2 (3).jpeg', alt: '3', width: 300, height: 300 },
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
          increaseQuantityInCart: action,
          decreaseQuantityInCart: action,
          currentCart: computed,
          totalPrice: computed,
        })
      }

    removeFromCart = (id) =>  {
        this.carts = this.carts.filter(item => {
            return item.product_id !== id;
        });
    }
    increaseQuantityInCart = (id) => {
        this.carts.map(item => {
            if (item.id === id ) {
                item.quantity += 1;
                item.total = Math.round((item.quantity * item.price) *100)/100
            }
            return item;
        });
    }
    decreaseQuantityInCart = (id) =>  {
        this.carts.map(item => {
            if (item.id === id && item.quantity > 0){
                item.quantity -= 1;
                item.total = Math.round((item.quantity * item.price) *100)/100
            }
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
                    item.color = id.color
                    item.id = this.products[i].id
                    item.total = Math.round((item.quantity * item.price) *100)/100
                }
            }
            this.carts.push(item);
        }
    }
    get currentCart() {
        return this.carts;
    }

    get totalPrice(){
        return Math.round(this.carts.reduce((n,{total})=> n + total,0) * 100)/100
    }

}
export default Store;
