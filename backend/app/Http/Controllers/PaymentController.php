<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function __construct()
    {
        \Midtrans\Config::$serverKey    = config('services.midtrans.serverKey');
        \Midtrans\Config::$isProduction = config('services.midtrans.isProduction');
        \Midtrans\Config::$isSanitized  = config('services.midtrans.isSanitized');
        \Midtrans\Config::$is3ds        = config('services.midtrans.is3ds');
    }

    public function payment(Request $request){
        DB::transaction(function() use($request) {
            $payment = Payment::create([
                "user_id"   =>  auth()->user()->id,
                "jumlah"    =>  $request->jumlah,
                "order_id"  =>  $request->order_id
            ]);

            $payload = [
                'transaction_details' => [
                    'order_id'     => $request->order_id,
                    'gross_amount' => $payment->jumlah,
                ],
                'customer_details' => [
                    'first_name' => auth()->user()->name,
                    'email'      => auth()->user()->email,
                ],
                'item_details' => $request->item_details,
            ];

            $snapToken = \Midtrans\Snap::getSnapToken($payload);
            $paymentUrl = \Midtrans\Snap::createTransaction($payload)->redirect_url;
            $payment->snap_token = $snapToken;
            $payment->payment_url = $paymentUrl;
            $payment->save();

            $this->response['snap_token'] = $snapToken;
            $this->response['payment_url'] = $paymentUrl;
            $this->response['id'] = $payment->id;
        });

        return response()->json([
            'status'     => 'success',
            'message'   =>  'Payment gate way',
            'data' => $this->response,
        ]);
    }

    public function updateStatus(Request $request, $id){
        $payment = Payment::find($id);
        $payment->update([
            "status"    =>  $request->status,
            "payment_type"=> $request->payment_type
        ]);
        return response()->json([
            'status'     => 'success',
            "message"   =>  "Payment gate way",
            'data' => $payment,
        ]);
    }
}
