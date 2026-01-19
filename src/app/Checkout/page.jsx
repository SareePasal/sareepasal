import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
    // We check for the key INSIDE the function so Vercel doesn't crash during build
    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ error: "Stripe Key not configured in Vercel" }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const body = await request.json();
        const { cart, discountPercent } = body;
        const origin = request.headers.get("origin");

        const lineItems = cart.map((item) => {
            const cleanPrice = item.price.toString().replace(/[^0-9.]/g, "");
            const unitAmount = Math.round(parseFloat(cleanPrice) * 100);
            const discountedAmount = Math.round(unitAmount * (1 - (Number(discountPercent) || 0) / 100));

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: [], // Keep empty for testing
                        description: `Size: ${item.selectedSize}, Color: ${item.selectedColor}`,
                    },
                    unit_amount: discountedAmount, 
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