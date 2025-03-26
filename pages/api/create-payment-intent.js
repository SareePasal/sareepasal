import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;
      console.log('Creating PaymentIntent for amount:', amount);

      // Create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Amount in cents
        currency: 'usd',
      });

      console.log('PaymentIntent created:', paymentIntent);

      // Return the client secret
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating PaymentIntent:', error);
      res.status(500).json({ error: 'Failed to create PaymentIntent' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}