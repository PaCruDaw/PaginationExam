<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('limit', 25); // Si no se especifica, el límite será 25
        $offset = $request->input('offset', 0); // Si no se especifica, el desplazamiento será 0

        $users = User::offset($offset)->limit($limit)->get();

        return response()->json($users);
    }

    public function getUsersCount()
    {
        try {
            // Usa el método count() en el modelo User para contar los registros
            $count = User::count();
            // Devuelve el total de registros como respuesta JSON
            return response()->json(['count' => $count]);
        } catch (\Exception $e) {
            // Maneja cualquier excepción y devuelve un mensaje de error
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }
}
