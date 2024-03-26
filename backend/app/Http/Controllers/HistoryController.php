<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $history = History::insert($request->all());
            return response()->json([
                "status"    =>  true,
                "message"   =>  "History successfully created",
                "data"      =>  $history
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "status"    =>  false,
                "message"   =>  $th->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(History $history)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, History $history)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(History $history)
    {
        //
    }
}
