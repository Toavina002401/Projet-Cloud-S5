<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\JsonResponse;

class ResponseHelper
{
    public function jsonResponse(string $status, $data = null, ?string $error = null, ?array $meta = null): JsonResponse
    {
        return new JsonResponse([
            'status' => $status,
            'data' => $data,
            'meta' => $meta,
            'error' => $error,
        ]);
    }

    public function arrayResponse(string $status, $data = null, ?string $error = null, ?array $meta = null): array
    {
        return [
            'status' => $status,
            'data' => $data,
            'meta' => $meta,
            'error' => $error,
        ];
    }
}
