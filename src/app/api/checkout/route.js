import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
    // 1. Get the key inside the function
    const secretKey = process.env.STRIPE_SECRET_KEY;

    // 2. If the key is missing, don't crash, just return an error
    if (!secretKey) {
        console.error("ERROR: STRIPE_SECRET_KEY is not set in Vercel Environment Variables.");
        return NextResponse.json({ error: "Store configuration error. Please contact admin." }, { status: 500 });
    }

    // 3. Initialize Stripe ONLY when this function is called
    const stripe = new Stripe(secretKey);

    try {
        const body = await request.json();
        const { cart, discountPercent } = body;
        const origin = request.headers.get("origin");

        const lineItems = cart.map((item) => {
            const cleanPrice = item.price.toString().replace(/[^0-9.]/g, "");
            const unitAmount = Math.round(parseFloat(cleanPrice) * 100);
            const discountMultiplier = 1 - (Number(discountPercent) / 100);
            const finalUnitAmount = Math.round(unitAmount * discountMultiplier);

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: [], // Keep empty for localhost/build testing
                        description: `Size: ${item.selectedSize}, Color: ${item.selectedColor}`,
                    },
                    unit_amount: finalUnitAmount, 
                },
                quantity: item.quantity || 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${origin}/success`,
            cancel_url: `${origin}/Checkout`,
            shipping_address_collection: { allowed_countries: ["US"] },
        });

        return NextResponse.json({ url: session.url });

    } catch (err) {
        console.error("STRIPE API ERROR:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}