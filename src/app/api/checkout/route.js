import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const body = await request.json();
        // 1. Get the cart and the discount percentage from the frontend
        const { cart, discountPercent } = body;

        console.log("--- PRICE CALCULATION ---");
        console.log("Discount being applied:", discountPercent, "%");

        const lineItems = cart.map((item) => {
            // 2. Clean the price string (remove $, commas)
            const cleanPrice = item.price.toString().replace(/[^0-9.]/g, "");
            const unitAmountInCents = Math.round(parseFloat(cleanPrice) * 100);
            
            // 3. APPLY THE DISCOUNT HERE
            // Example: 10000 cents * (1 - 10/100) = 9000 cents
            const discountMultiplier = 1 - (Number(discountPercent) / 100);
            const finalUnitAmount = Math.round(unitAmountInCents * discountMultiplier);

            console.log(`Product: ${item.title} | Original: ${unitAmountInCents} | After ${discountPercent}% off: ${finalUnitAmount}`);

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: [], 
                        description: `Size: ${item.selectedSize}, Color: ${item.selectedColor} (${discountPercent}% OFF Applied)`,
                    },
                    unit_amount: finalUnitAmount, // <--- This is the price Stripe will charge
                },
                quantity: item.quantity || 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${request.headers.get("origin")}/success`,
            cancel_url: `${request.headers.get("origin")}/Checkout`,
            shipping_address_collection: { allowed_countries: ["US"] },
        });

        return NextResponse.json({ url: session.url });

    } catch (err) {
        console.error("STRIPE ERROR:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}