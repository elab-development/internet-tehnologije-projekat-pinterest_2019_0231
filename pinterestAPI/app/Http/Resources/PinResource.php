<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PinResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'pin_title' => $this->pin_title,
            'pin_description' => $this->pin_description,
            'image' => $this->image,
            'board' => new BoardResource($this->board),
        ];
    }
}
