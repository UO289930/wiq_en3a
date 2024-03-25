Feature: Logging in a new user

Scenario: Logging in a new user
  Given An unregistered user
  When I fill the data in the form and press login
  Then The app loads and the start game appers

