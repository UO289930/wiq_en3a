Feature: Logging out of the app

Scenario: Logging out of the app
  Given An just logged in user
  When I click the logout button
  Then The login page appears on screen