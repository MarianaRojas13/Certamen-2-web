<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LecturasController;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get("medidas/get",[LecturasController::class,"getMedidas"]);
Route::get("lecturas/get",[LecturasController::class,"getLecturas"]);
Route::get("lecturas/filtrar",[LecturasController::class,"filtrarLecturas"]);
Route::post("lecturas/post",[LecturasController::class,"crearLectura"]);
Route::post("lecturas/delete",[LecturasController::class,"eliminarLectura"]);