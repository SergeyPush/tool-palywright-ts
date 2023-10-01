Feature: Login Feature

  As a user 
  I want to login application

  Scenario: Login with valid credentials
    Given User opens login page
    When User submits valid credentials 
    Then User should see the Home page
    

  Scenario: Login with locked credentials
    Given User opens login page
    When User submits invalid credentials
    Then User should see error message


  Scenario: Login with empty credentials
    Given User opens login page
    When User submits empty credentials
    Then User should see required error message