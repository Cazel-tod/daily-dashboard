<?php

namespace App\Controller;

use App\Service\SystemStatusService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class StatusController
{
    public function __construct(private readonly SystemStatusService $systemStatusService)
    {
    }

    #[Route('/api/status', name: 'api_status', methods: ['GET'])]
    public function __invoke(): JsonResponse
    {
        return new JsonResponse($this->systemStatusService->getStatus());
    }
}
