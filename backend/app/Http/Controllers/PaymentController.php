<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePaymentWebhookRequest;
use App\Models\History;
use App\Models\Payment;
use App\Models\User;
use Exception;
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

    /**
   * @OA\Post(
   *     path="/api/payments/buy",
   *     summary="payment",
   *     description="payment",
   *     operationId="payment",
   *     tags={"Payment"},
   *     security={{ "bearerAuth": {} }},
   *     @OA\RequestBody(
   *         @OA\JsonContent(
   *            @OA\Property(property="jumlah", type="integer", example="10000"),
   *            @OA\Property(property="item_details", type="string", example="[]"),
   *         ),
   *     ),
   *     @OA\Response(
   *         response=201,
   *         description="get auth data",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="true"),
   *             @OA\Property(property="message", type="string", example="Payment gat way"),
   *             @OA\Property(property="data", type="string", example="[]"),
   *         )
   *     ),
   * )
   */
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

    /**
   * @OA\Post(
   *     path="/api/payments/status/:id",
   *     summary="payment",
   *     description="payment",
   *     operationId="payment status",
   *     tags={"Payment"},
   *     security={{ "bearerAuth": {} }},
   *     @OA\RequestBody(
   *         @OA\JsonContent(
   *            @OA\Property(property="status", type="integer", example="pending"),
   *            @OA\Property(property="payment_type", type="string", example="bank"),
   *         )
   *     ),
   *     @OA\Response(
   *         response=201,
   *         description="get auth data",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="true"),
   *             @OA\Property(property="message", type="string", example="Payment gat way"),
   *             @OA\Property(property="data", type="string", example="[]"),
   *         )
   *     ),
   * )
   */
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

    /**
   * @OA\Post(
   *     path="/api/payments",
   *     summary="payment",
   *     description="payment",
   *     operationId="all payment",
   *     tags={"Payment"},
   *     security={{ "bearerAuth": {} }},
   *     @OA\Response(
   *         response=201,
   *         description="get auth data",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="true"),
   *             @OA\Property(property="message", type="string", example="Payment gat way"),
   *             @OA\Property(property="data", type="string", example="[]"),
   *         )
   *     ),
   * )
   */
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

    /**
   * @OA\Get(
   *     path="/api/histories",
   *     summary="histories",
   *     description="histories by userId",
   *     operationId="all histories",
   *     tags={"History"},
   *     security={{ "bearerAuth": {} }},
   *     @OA\Response(
   *         response=201,
   *         description="get auth data",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="true"),
   *             @OA\Property(property="message", type="string", example="histories user"),
   *             @OA\Property(property="data", type="string", example="[]"),
   *         )
   *     ),
   * )
   */
    public function getHistory(){
        try {
            $payments = Payment::where("user_id", auth()->user()->id)->get();
            foreach($payments as $payment){
                $histories = History::where("payment_id", $payment->id)->get();
                $payment->history = $histories;
            }
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Data histori pembelanjaan",
                "data"      =>  $payments
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "status"    =>  false,
                "message"   =>  $th->getMessage()
            ]);
        }
    }

    /**
   * @OA\Patch(
   *     path="/api/payments/redirect",
   *     summary="payment",
   *     description="payment",
   *     operationId="Payment redirect",
   *     tags={"Payment"},
   *     security={{ "bearerAuth": {} }},
   *     @OA\RequestBody(
   *         @OA\JsonContent(
   *             @OA\Property(property="order_id", type="string", example="ADADEH-1-1"),
   *             @OA\Property(property="status_code", type="string", example="201"),
   *         ),
   *     ),
   *     @OA\Response(
   *         response=201,
   *         description="get auth data",
   *         @OA\JsonContent(
   *             @OA\Property(property="status", type="boolean", example="true"),
   *             @OA\Property(property="message", type="string", example="Payment gat way"),
   *             @OA\Property(property="data", type="string", example="[]"),
   *         )
   *     ),
   * )
   */
    public function getQuery(Request $request){
        try {
            $status = null;
            $payment = Payment::where("order_id", $request->order_id)->first();
            switch ($request->status_code) {
                case 200:
                    $status = "settlement";
                    break;
                case 201:
                    $status = "pending";
                    break;
                case 202:
                    $status = "denied";
                    break;
                case 407:
                    $status = "expire";
                    break;
                default:
                    $status = "error";
                    break;
            }
            $payment->update([
                "status"    =>  $status
            ]);
            return response()->json([
                "status"    =>  true,
                "message"   =>  "Data histori pembelanjaan dengan Kode: $request->order_id terupdate",
                "data"      =>  $payment
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "status"    =>  false,
                "message"   =>  $th->getMessage(),
            ]);
        }
    }

    public function updatePaymentWebhook(UpdatePaymentWebhookRequest $request) {
        try {
            $validated = $request->safe()->only(['order_id', 'transaction_status', 'payment_type']);
            $orderId = $validated['order_id'];
            $transactionStatus = $validated['transaction_status'];
            $paymentType = $validated['payment_type'];

            $payment = Payment::where('order_id', $orderId)->first();
            if($payment === null) throw new Exception("Payment Tidak Ditemukan");

            if($transactionStatus) $payment->status = $transactionStatus;
            if($paymentType) $payment->payment_type = $paymentType;
            $payment->save();

            return response()->json([
                "status"    =>  true,
                "message"   =>  "Status Payment Berhasil Diupdate",
                "data"      =>  $payment
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "status"    =>  false,
                "message"   =>  $th->getMessage(),
                "data"      =>  $payment
            ]);
        }
    }
}
