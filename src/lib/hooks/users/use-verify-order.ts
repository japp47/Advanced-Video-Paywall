import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
    (typeof client.api.payments)["verify-payment"]["$post"], 200
>;

type RequestType = InferRequestType<
    (typeof client.api.payments)["verify-payment"]["$post"]
>["json"];

export const useVerifyPayment = () => {
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn:async(json) => {
            const response = await client.api.payments["verify-payment"].$post({json})
            if(!response.ok) {
                throw new Error(response.statusText)
            }
            return await response.json();
        },
        onError: (error) => {
            toast.error("Payment Not Verified");
        },
        onSuccess: () => {
            toast.success("Payment Verified successfully");
        }
    })
    return mutation;
}