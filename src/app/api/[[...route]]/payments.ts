import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator"
import { verifyAuth } from "@hono/auth-js";
import { z } from "zod";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
const app = new Hono()
    .post("/verify-payment",
        verifyAuth(),
        zValidator(
            "json", 
            z.object({
                orderId: z.string(),
                paymentId: z.string(),
                signature: z.string()
            })
        ),
        async (c) => {
            const session = c.get("authUser");
            const { orderId, paymentId, signature } = c.req.valid('json');
            if(!session.token?.email) {
                return c.json({ error: "unauthorized"}, 401);
            }

            const crypt = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
            crypt.update(`${orderId}|${paymentId}`);
            const digest = crypt.digest("hex");

            const isVerified = digest === signature;
            if(!isVerified) {
                return c.json({ error: "invalid signature" }, 400);
            }
            await db.update(users).set({isPremium: true}).where(eq(users.email, session.token.email));
            return c.json({data: isVerified }, 200);
        }
    )
    .post("/create-order",
        verifyAuth(),
        zValidator("json", z.object({
            planId: z.string()
        })) ,
        async (c) => {
            const session = c.get("authUser")
            if(!session.token?.email) {
                return c.json({ error: "unauthorized"}, 401);
            }
            
            let option = {
                amount: 999,
                currency: "INR",
                receipt: "order_rcptid_11"
            }

            const order = await razorpay.orders.create(option);

            if(!order) {
                return c.json({ error: "failed to create order"}, 500);
            }
            return c.json({
                data: order
            }, 200)
        }
    )

export default app