import {  NextResponse } from "next/server";

const stripe = require("stripe")(process.env.S_S_KEY);

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);

  const stripeSessionId = searchParams.get("session_id");


  if (!stripeSessionId?.length)
    return NextResponse.redirect("/Cart");

  const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

  if (session.status === "complete") {
    // Go to a success page!
    return NextResponse.redirect(
      `/Success`,
    );
  }

  if (session.status === "open") {
    // Here you'll likely want to head back to some pre-payment page in your checkout 
    // so the user can try again
    return NextResponse.redirect(
      `/Cart`,
    );
  }

  return  NextResponse.redirect("/Cart");
};