<?php
// src/Controller/HomeController.php;
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class CartController extends AbstractController
{
    /**
     * @Route("/cart", name="cart")
     */
    public function cart(): Response
    {

        return $this->render('cart/cart.html.twig');
    }
}
