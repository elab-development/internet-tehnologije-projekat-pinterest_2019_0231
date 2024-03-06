<?php

namespace App\Http\Controllers;

use App\Http\Resources\PinResource;
use App\Models\Pin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PinController extends GlavniController
{
    public function index()
    {
        $pins = Pin::all();
        return $this->uspesno(PinResource::collection($pins), 'Svi pinovi su uspesno prikazani');
    }

    public function show($id)
    {
        $pin = Pin::find($id);
        if (!$pin) {
            return $this->greska('Trazeni pin ne postoji');
        }
        return $this->uspesno(new PinResource($pin), 'Trazeni pin je uspesno prikazan');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pin_title' => 'required',
            'pin_description' => 'required',
            'image' => 'required',
            'board_id' => 'required|exists:boards,id|numeric'
        ]);

        if ($validator->fails()) {
            return $this->greska('Greska pri validaciji', $validator->errors());
        }

        $pin = new Pin();
        $pin->pin_title = $request->pin_title;
        $pin->pin_description = $request->pin_description;
        $pin->image = $request->image;
        $pin->board_id = $request->board_id;
        $pin->save();

        return $this->uspesno(new PinResource($pin), 'Pin je uspesno kreiran');
    }

    public function update(Request $request, $id)
    {
        $pin = Pin::find($id);
        if (!$pin) {
            return $this->greska('Trazeni pin ne postoji');
        }

        $validator = Validator::make($request->all(), [
            'pin_title' => 'required',
            'pin_description' => 'required',
            'image' => 'required',
            'board_id' => 'required|exists:boards,id|numeric'
        ]);

        if ($validator->fails()) {
            return $this->greska('Greska pri validaciji', $validator->errors());
        }

        $pin->pin_title = $request->pin_title;
        $pin->pin_description = $request->pin_description;
        $pin->image = $request->image;
        $pin->board_id = $request->board_id;
        $pin->save();

        return $this->uspesno(new PinResource($pin), 'Pin je uspesno azuriran');
    }

    public function destroy($id)
    {
        $pin = Pin::find($id);
        if (!$pin) {
            return $this->greska('Trazeni pin ne postoji');
        }
        $pin->delete();
        return $this->uspesno(new PinResource($pin), 'Pin je uspesno obrisan');
    }

    public function boardPins($id)
    {
        $pins = Pin::where('board_id', $id)->get();
        return $this->uspesno(PinResource::collection($pins), 'Svi pinovi su uspesno prikazani');
    }

    public function paginatePins(Request $request)
    {
        $perPage = $request->input('per_page') ?? 5;
        $pins = Pin::paginate($perPage);
        return $this->uspesno($pins, 'Svi pinovi su uspesno prikazani');
    }
}
