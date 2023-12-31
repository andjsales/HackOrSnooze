// Defined DOM elements
// hidePageComponents()
// Start function, beginning the app
// "Remember logged-in user"

"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:
const $body = $("body");
const $homeButton = $("#nav-all");
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $createAccount = $("#create-account");
const $createAuthor = $("#create-author");
const $createTitle = $("#create-title");
const $createURL = $("#create-url");
const $submitButton = $("#submit-story");
const $createStoryForm = $(".create-story-form");
const $navSubmit = $(".nav-submit");
const $navFavorites = $("#nav-favorites");
const $navStories = $(".nav-stories");
const $favoritesList = $(".favorites-list");
const $favoriteButton = $(".favorite-button");
const $deleteButton = $(".delete-button");
const $userStoriesList = $(".user-story-list");

// To make it easier for individual components to show just themselves, this is a useful function that hides pretty much everything on the page. After calling this, individual components can re-show just what they want.
function hidePageComponents() {
  const components = [
    $createStoryForm,
    $allStoriesList,
    $createAccount,
    $loginForm,
    $signupForm,
    $favoritesList,
    $userStoriesList
  ];
  components.forEach(c => c.hide());
}

// Overall function to kick off the app.
async function start() {
  console.debug("start");
  hidePageComponents();
  await checkForRememberedUser();
  await getStoriesOnStart();
  var tab = window.location.href.split('#')[1];
  if (tab == "favorites") {
    putFavoritesOnPage();
  } else if (tab == "stories") {
    showUserStories();
  } else {
    putStoriesOnPage();
  }
  if (currentUser) updateUIOnUserLogin();
}



// Once the DOM is entirely loaded, begin the app
console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);