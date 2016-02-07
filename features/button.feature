Feature: Button
    So that I can automate web applications with buttons,
    I want to have a button element available

    Scenario: Exists
        When I am viewing the sample login page
        Then a button with an id of "SignIn" should exist
        But a button with an id of "NotAThing" should not exist
