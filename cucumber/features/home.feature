@products
Feature: Products page

    As a user I can see products on home page

Scenario: User should see list of products 
    Given User should be logged in
    Then List of products should be displayed
    

Scenario: User should be able to add product to cart
    Given User should be logged in
    When User clicks Add to cart
    Then Product is added to cart