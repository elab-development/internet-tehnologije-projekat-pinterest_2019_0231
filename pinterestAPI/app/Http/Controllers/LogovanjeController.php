<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LogovanjeController extends GlavniController
{
    public function login(Request $request)
    {
        $podaci = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!auth()->attempt($podaci)) {
            return $this->greska('Pogrešan email ili lozinka');
        }

        $korisnik = auth()->user();

        return $this->uspesno([
            'korisnik' => $korisnik,
            'token' => $korisnik->createToken('token')->plainTextToken
        ], 'Uspešno ste se ulogovali');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->greska('Greška pri validaciji', $validator->errors());
        }

        $korisnik = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'name' => $request->name,
            'role' => 'user'
        ]);

        return $this->uspesno($korisnik, 'Uspešno ste se registrovali');
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return $this->uspesno([], 'Uspešno ste se izlogovali');
    }
}
