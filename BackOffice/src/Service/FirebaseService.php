<?php
// src/Service/FirebaseService.php
namespace App\Service;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;

class FirebaseService
{
    private Auth $auth;

    public function __construct()
    {
        $factory = (new Factory)->withServiceAccount(__DIR__.'/../../config/firebase_credentials.json');
        $this->auth = $factory->createAuth();
    }

    public function createUser(string $email, string $password)
    {
        return $this->auth->createUser([
            'email' => $email,
            'password' => $password
        ]);
    }
}
