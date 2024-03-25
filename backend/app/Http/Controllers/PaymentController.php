<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public $data = [];
    public function __construct()
    {
        \Midtrans\Config::$serverKey    = config('services.midtrans.serverKey');
        \Midtrans\Config::$isProduction = config('services.midtrans.isProduction');
        \Midtrans\Config::$isSanitized  = config('services.midtrans.isSanitized');
        \Midtrans\Config::$is3ds        = config('services.midtrans.is3ds');
    }

    public function payment(Request $request)
    {
        DB::transaction(function () use ($request) {
            $payment = Payment::create([
                "user_id"   =>  auth()->user()->id,
                "jumlah"    =>  $request->jumlah,
                "order_id"  =>  "ADADEH-" . auth()->user()->id
            ]);

            $payload = [
                'transaction_details' => [
                    'order_id'     =>  $payment->order_id . "-" . $payment->id,
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
            $payment->order_id = $payment->order_id . "-" . $payment->id;
            $payment->save();
            $this->data = $payment;
        });

        return response()->json([
            'status'    => true,
            'message'   =>  'Payment gate way',
            'data'      => $this->data,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $payment = Payment::find($id);
        $payment->update($request->all());
        return response()->json([
            'status'    => true,
            "message"   => "Payment successfully updated",
            'data'      => $payment,
        ]);
    }

    function index(){
        try {
            $payments = Payment::all();
            foreach($payments as $payment){
                $user = User::find($payment->user_id);
                $payment->customer = $user->name;
            }
            return response()->json([
                'status'    => true,
                "message"   => "Payment gate way",
                'data'      => $payments,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status'    => false,
                "message"   => $th->getMessage(),
            ]);
        }
    }
}
