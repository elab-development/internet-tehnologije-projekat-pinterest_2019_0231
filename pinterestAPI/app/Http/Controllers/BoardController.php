<?php

namespace App\Http\Controllers;

use App\Http\Resources\BoardResource;
use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BoardController extends GlavniController
{
    public function index()
    {
        $boards = Board::all();
        return $this->uspesno(BoardResource::collection($boards), 'Sve table su uspesno prikazane');
    }

    public function show($id)
    {
        $board = Board::find($id);
        if (!$board) {
            return $this->greska('Trazena tabla ne postoji');
        }
        return $this->uspesno(new BoardResource($board), 'Trazena tabla je uspesno prikazana');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'user_id' => 'required|exists:users,id|numeric'
        ]);

        $board = new Board();
        $board->title = $request->title;
        $board->description = $request->description;
        $board->user_id = $request->user_id;
        $board->save();

        return $this->uspesno(new BoardResource($board), 'Tabla je uspesno kreirana');
    }

    public function update(Request $request, $id)
    {
        $board = Board::find($id);
        if (!$board) {
            return $this->greska('Trazena tabla ne postoji');
        }

        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'user_id' => 'required|exists:users,id|numeric'
        ]);

        $board->title = $request->title;
        $board->description = $request->description;
        $board->user_id = $request->user_id;
        $board->save();

        return $this->uspesno(new BoardResource($board), 'Tabla je uspesno azurirana');
    }

    public function destroy($id)
    {
        $board = Board::find($id);
        if (!$board) {
            return $this->greska('Trazena tabla ne postoji');
        }
        $board->delete();
        return $this->uspesno(new BoardResource($board), 'Tabla je uspesno obrisana');
    }

    public function userBoards($id)
    {
        $boards = Board::where('user_id', $id)->get();
        return $this->uspesno(BoardResource::collection($boards), 'Sve table korisnika su uspesno prikazane');
    }
    public function pinsPerBoard(Request $request)
    {
        $pinsPerBoards = Board::select('boards.title', DB::raw('count(pins.id) as pins_count'))
            ->join('pins', 'boards.id', '=', 'pins.board_id')
            ->groupBy('boards.title')
            ->get();

        return $this->uspesno($pinsPerBoards, 'Broj pinova po tablama je uspesno prikazan');
    }
}
