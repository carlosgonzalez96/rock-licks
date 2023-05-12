import type { RequestHandler } from "./$types";
import Stripe from 'stripe';

const SECRET_STRIPE_KEY = "sk_test_51KZKtCDvbmeAY9rtBdKyGVnAPGySbrvpz1SahPS7LMDBcYDXjlxtx46cqZGOYnWx84ZPWSc6AePYSyqd99jgC1A000v2UMdz8j";

const stripe = new Stripe(SECRET_STRIPE_KEY, {apiVersion: "2022-11-15"});

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json();
    const items = data.items;

    let lineItems : any = [];
    items.forEach((item: any) => {
        lineItems.push({ price: item.id, quantity: item.quantity })
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",

    });

    return new Response(
        JSON.stringify({ url: session.url }),
        {
            status: 200,
            headers: {'content-type': 'application/json'}
        }
    )
}