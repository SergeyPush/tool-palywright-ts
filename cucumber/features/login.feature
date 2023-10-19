@login
Feature: Login Feature

  As a user 
  I want to login application

  Scenario: Login with valid credentials
    Given User opens login page
    When User submits username "standard_user" and password "secret_sauce"
    Then User should be on the Home page
    

  Scenario: Login with locked credentials
    Given User opens login page
    When User submits username "locked_out_user" and password "secret_sauce"
    Then User should see error message


  Scenario: Login with empty credentials
    Given User opens login page
    When User submits username "" and password ""
    Then User should see required error message

  