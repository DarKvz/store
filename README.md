# Lojinha

A simple e-commerce web application developed with HTML, CSS, JavaScript, and Tailwind CSS.

## Description

This project demonstrates a small online store that displays a grid of products with integrated modals for login, cart, checkout, and product details. The system allows users to select sizes, add items to the cart, and follow a basic quick purchase flow.

## Features

- **Product Grid:**  
  Responsive display with images rendered via `<img>` tags, styled using Tailwind CSS and custom CSS.
  
- **Interactive Modals:**  
  - **Login Modal:** For basic authentication.  
  - **Cart and Checkout Modals:** To review and finalize orders.  
  - **Product Detail Modal:** Shows an enlarged product image using `object-fit: contain` to prevent cropping.

- **Cart Management:**  
  Functions to add, remove, and update items, with size selection.

- **Quick Purchase:**  
  The `buyNow()` function prompts the user to select a size and instantly adds the product to the cart.

## Technologies Used

- **HTML5, CSS3, and JavaScript:** Core technologies for structure and interactivity.
- **Tailwind CSS:** For styling and responsive design.
- **Modular Organization:** Separate files (`index.html`, `style.css`, and `script.js`) for improved maintainability and scalability.

## Project Structure

```plaintext
lojinha/
├── index.html
├── style.css
├── script.js
└── img/
    ├── blusa.jpg
    ├── moletom.jpg
    ├── vestido.jpg
    ├── calca-jeans.jpg
    ├── camisa-polo.jpg
    ├── jaqueta-jeans.jpg
    ├── calca-moletom.jpg
    └── saia-plissada.jpg
