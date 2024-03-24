"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Payment() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzExMTgwNDI0LCJleHAiOjE3MTExODQwMjQsIm5iZiI6MTcxMTE4MDQyNCwianRpIjoiSW9LRVFYcFpaVEFWSjZJUyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Pw3CfOzHOMKBv5PuU5iS1yEB7YPxKYER78DuMHgRLsE";
  const handlePayment = async () => {
    try {
      const data = {
        payment_type: "",
        order_id: Math.floor(Math.random()*999999),
        jumlah: 2000,
        item_details: [
          {
            id: 1,
            name: "Sepatu Hitam",
            price: 50000,
            quantity: 2,
            category: "Livestyle",
          },
          {
            id: 2,
            name: "Sepatu Putih",
            price: 50000,
            quantity: 2,
            category: "Modern",
          },
        ],
      };
      const response = await axios.post(
        "http://localhost:8000/api/payment",
        data,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      snap.pay(response.data.data.snap_token, {
        onSuccess: async function (result: any) {
          console.log("success");
          console.log(result);
          try {
            const data = {
              status: "success",
              payment_type: result.payment_type
            };
            await axios.patch(`http://localhost:8000/api/payment/status/${response.data.data.id}`, data, {
              headers: {
                Authorization: `bearer ${token}`,
              },
            });
          } catch (error) {
              console.log(error)
          }
        },
        onPending: function (result: any) {
          console.log("pending");
          console.log(result);
        },
        onError: function (result: any) {
          console.log("error");
          console.log(result);
        },
        onClose: function (result: any) {
            console.log(result);
          console.log("customer closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="relative top-20 min-h-[calc(100vh-80px)]">
        <Button variant={"default"} onClick={handlePayment}>
          Payment
        </Button>
      </section>
    </>
  );
}
