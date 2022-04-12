<?php
// src/Controller/HomeController.php;
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ProductsController extends AbstractController
{
    /**
     * @Route("/products", name="products")
     */
    public function home(): Response
    {

        return $this->render('products/products.html.twig');
    }
}
