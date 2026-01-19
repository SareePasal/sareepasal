import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("--- EMAIL SYSTEM: RECEIVING DATA ---", body);

        const { items, customerEmail, customerName, totalAmount, shippingAddress, discountAmount, subtotal } = body;

        // 1. Build the Item Table
        const BASE_URL = "https://www.sareepasal.com"; 
        const itemsHtml = items.map(item => {
            const itemImg = item.img || item.image || "";
            const fullImageUrl = itemImg.startsWith('http') ? itemImg : `${BASE_URL}${itemImg}`;
            return `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                        <img src="${fullImageUrl}" width="50" height="70" style="border-radius: 8px; object-fit: cover;" alt="product" />
                    </td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                        <div style="font-weight: bold;">${item.title}</div>
                        <div style="font-size: 11px; color: #666;">Size: ${item.selectedSize} | Color: ${item.selectedColor}</div>
                    </td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">${item.price}</td>
                </tr>
            `;
        }).join('');

        // 2. Send the Email
        const { data, error } = await resend.emails.send({
            from: "Saree Pasal <orders@sareepasal.com>",
            to: ["sareepasalusa@gmail.com"], // Change to [customerEmail, "sareepasalusa@gmail.com"] after domain verification
            subject: `Order Confirmed - Saree Pasal`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #fce7f3; border-radius: 20px;">
                    <h2 style="color: #be185d; text-align: center;">New Order Received!</h2>
                    <p><strong>Customer:</strong> ${customerName}</p>
                    <p><strong>Shipping Address:</strong> ${shippingAddress}</p>
                    <hr style="border: 1px solid #fce7f3; margin: 20px 0;" />
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="color: #be185d; font-size: 12px; text-align: left; border-bottom: 2px solid #fce7f3;">
                                <th style="padding: 10px;">Item</th>
                                <th style="padding: 10px;">Details</th>
                                <th style="padding: 10px;">Qty</th>
                                <th style="padding: 10px;">Price</th>
                            </tr>
                        </thead>
                        <tbody>${itemsHtml}</tbody>
                    </table>
                    <div style="text-align: right; margin-top: 30px; padding: 20px; background: #fdf2f8; border-radius: 15px;">
                        <p style="margin: 5px 0; color: #666;">Subtotal: $${subtotal}</p>
                        <p style="margin: 5px 0; color: #16a34a; font-weight: bold;">Discount Applied: -$${discountAmount}</p>
                        <h2 style="margin: 10px 0; color: #be185d;">Total Paid: $${totalAmount}</h2>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error("RESEND ERROR:", error);
            return NextResponse.json({ error }, { status: 400 });
        }

        console.log("--- EMAIL SENT SUCCESSFULLY ---");
        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("API CRASHED:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}