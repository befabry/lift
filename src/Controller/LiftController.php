<?php

/*
 * This file is part of PHP CS Fixer.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *     Dariusz Rumiński <dariusz.ruminski@gmail.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace App\Controller;

use App\Entity\RepLog;
use App\Entity\User;
use App\Repository\RepLogRepository;
use App\Repository\UserRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Translation\TranslatorInterface;

class LiftController extends BaseController
{
    /**
     * @Route("/lift", name="lift")
     */
    public function indexAction(Request $request, RepLogRepository $replogRepo, UserRepository $userRepo, TranslatorInterface $translator)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $repLogAppProps = [
            'withHearth' => true,
            'itemOptions' => [],
        ];
        foreach (RepLog::getThingsYouCanLiftChoices() as $label => $id) {
            $repLogAppProps['itemOptions'][] = [
                'id' => $id,
                'text' => $translator->trans($label),
            ];
        }

        // dump($repLogAppProps);die;

        return $this->render('lift/index.html.twig', [
            'leaderboard' => $this->getLeaders($replogRepo, $userRepo),
            'repLogAppProps' => $repLogAppProps,
        ]);
    }

    /**
     * Returns an array of leader information.
     *
     * @return array
     */
    private function getLeaders(RepLogRepository $replogRepo, UserRepository $userRepo)
    {
        $leaderboardDetails = $replogRepo->getLeaderboardDetails();

        $leaderboard = [];
        foreach ($leaderboardDetails as $details) {
            if (!$user = $userRepo->find($details['user_id'])) {
                // interesting, this user is missing...
                continue;
            }

            $leaderboard[] = [
                'username' => $user->getUsername(),
                'weight' => $details['weightSum'],
                'in_cats' => number_format($details['weightSum'] / RepLog::WEIGHT_FAT_CAT),
            ];
        }

        return $leaderboard;
    }
}
