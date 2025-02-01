import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// POST handler
export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse JSON body
        const { products } = body; //1st add the object name here
        console.log(products);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: products.map((product: any) => ({
                price_data: {
                    currency: "usd", // Change to your preferred currency
                    product_data: {
                        name: product.name,
                        images: [product.imageUrl]
                    },
                    unit_amount: product.price * 100, // Convert to cents
                },
                quantity: product.quantity
            })),
            mode: "payment",
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/cancel`,
        });


        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Method Not Allowed for other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
    );
}