<?php

namespace App\Http\Controllers;

use App\Http\Resources\FollowerResource;
use App\Models\Follower;
use Illuminate\Http\Request;

class FollowersController extends GlavniController
{
    public function follow(Request $request)
    {
        $follower_id = $request->user()->id;
        $followed_id = $request->input('followed_id');

        $follower = Follower::where('follower_id', $follower_id)
            ->where('followed_id', $followed_id)
            ->first();

        if ($follower) {
            return $this->greska('Vec ste zapratili ovog korisnika');
        }

        $follower = new Follower();
        $follower->follower_id = $follower_id;
        $follower->followed_id = $followed_id;
        $follower->save();

        return $this->uspesno(new FollowerResource($follower), 'Zapratili ste korisnika');
    }

    public function unfollow(Request $request)
    {
        $follower_id = $request->user()->id;
        $followed_id = $request->input('followed_id');

        $follower = Follower::where('follower_id', $follower_id)
            ->where('followed_id', $followed_id)
            ->first();

        if (!$follower) {
            return $this->greska('Niste zapratili ovog korisnika');
        }

        $follower->delete();

        return $this->uspesno(new FollowerResource($follower), 'Odzapratili ste korisnika');
    }

    public function followers($id)
    {
        $followers = Follower::where('followed_id', $id)->get();
        return $this->uspesno(FollowerResource::collection($followers), 'Svi korisnici koji prate ovog korisnika');
    }
}
