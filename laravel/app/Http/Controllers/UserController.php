<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10); // Número de elementos por página, valor predeterminado de 10
        $users = User::paginate($perPage);
        
        return response()->json($users);
    }
}
