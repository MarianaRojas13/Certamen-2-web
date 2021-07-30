<?php

use Illuminate\Support\Facades\Route;

Route::view("/","home")->name("home");
Route::view("/home","home")->name("home");
Route::view("/registrar_lectura", "registrar_lectura")->name("registrar_lectura");
Route::view("/mediciones_existentes", "mediciones_existentes")->name("mediciones_existentes");