import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('Received request body:', req.body);

      const { amount } = req.body;
      if (!amount) {
        throw new Error('Amount is required');
      }

      console.log('Creating PaymentIntent with amount:', amount);

      // Create a PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Amount in cents
        currency: 'usd',
      });

      console.log('PaymentIntent created:', paymentIntent);

      // Return the client secret
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error in /api/payment:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}