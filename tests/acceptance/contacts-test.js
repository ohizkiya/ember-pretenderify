import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Contacts', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("I can view the contacts", function() {
  serverData.contacts = [
    {id: 1, name: 'Link'},
    {id: 2, name: 'Zelda'}
  ];

  visit('/');

  andThen(function() {
    equal(currentRouteName(), 'contacts');
    equal( find('p').length, 2 );
    equal( find('p:first').text(), 'Link' );
  });
});

test("I can create a new contact", function() {
  serverData.contacts = [
    {id: 1, name: 'Link'},
    {id: 2, name: 'Zelda'}
  ];

  visit('/');
  fillIn('input', 'Ganon');
  click('button:contains(Create)');

  andThen(function() {
    equal(currentRouteName(), 'contacts');
    equal( find('p').length, 3 );
    equal( find('p:last').text(), 'Ganon' );
  });
});


