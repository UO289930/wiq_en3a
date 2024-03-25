Feature: Logging out of the app

Scenario: The user is not registered in the site
  Given An just logged in user
  When I click the logout button
  Then The login page appears on screen