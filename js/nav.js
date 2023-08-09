"use strict";

// Handling navbar clicks and updating navbar
// Show main list of all stories when click site name
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

// Show login/signup on click on "login"
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

// When a user first logins in, update the navbar to reflect that.
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".nav-middle").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

let isStoryFormVisible = false;

function toggleStoryForm() {
  if (isStoryFormVisible) {
    $createStoryForm.hide();
  } else {
    $createStoryForm.show();
  }
  isStoryFormVisible = !isStoryFormVisible;
}

$navSubmit.on("click", function () {
  toggleStoryForm();
});


// Allow users to see all stories they favorited
$navFavorites.on("click", function () {
  hidePageComponents();
  // const favoriteStories = storyList.stories.filter(story =>
  //   currentUser.favorites.some(favorite => favorite.storyId === story.storyId));
  putFavoritesOnPage(); // Display the favorite stories on the page
});

$navStories.on("click", function () {
  hidePageComponents();
  showUserStories();
});

