"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
let isFavoritesView = false;

// Get and show stories when site first loads.
async function getStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
}


function getHostName(urlString) {
  return new URL(urlString).host;
}

// A render method to render HTML for an individual Story instance
// - story: an instance of Story
// Returns the markup for the story.
function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const hostName = getHostName(story.url);
  return $(`
      <li id="${story.storyId}">
      <div class="story-content">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(a${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </div>
        <button class="favorite-button">🖤</button>
        <button class="delete-button">❌</button>
      </li>
    `);
}

function putStoriesOnPage() {
  // console.debug("putStoriesOnPage");
  $allStoriesList.empty();
  // loop through all of the stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    if (currentUser.favorites.some(favorite => favorite.storyId === story.storyId)) {
      $story.find('.favorite-button').text('❤️');
    }
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}


function putFavoritesOnPage() {
  hidePageComponents();
  $favoritesList.empty();
  for (let favorite of currentUser.favorites) {
    const $favoriteStory = generateStoryMarkup(favorite);
    const $favoriteButton = $favoriteStory.find(".favorite-button");
    $favoriteButton.text("❤️"); // Display a filled heart for favorited stories
    $favoritesList.append($favoriteStory);
  }
  $favoritesList.show();
}

function toggleFavorite(story) {
  const storyIndex = currentUser.favorites.findIndex(favoriteStory => favoriteStory.storyId === story.storyId);
  if (storyIndex !== -1) {
    currentUser.favorites.splice(storyIndex, 1);
  } else {
    currentUser.favorites.push(story);
  }
  currentUser.saveFavoritesToStorage(); // Save changes to local storage
  return currentUser.favorites;
}

$allStoriesList.on("click", ".favorite-button", async function () {
  const $favoriteButton = $(this);
  const $favoriteStory = $favoriteButton.closest("li");
  const storyId = $favoriteStory.attr("id"); // Get the story ID
  const story = storyList.stories.find(story => story.storyId === storyId);
  toggleFavorite(story);
  $favoriteButton.text($favoriteButton.text() === "❤️" ? "🖤" : "❤️");
  // currentUser.toggleFavorite(story); // Bind the function to the currentUser instance
});

$favoritesList.on("click", ".favorite-button", async function () {
  const $favoriteButton = $(this);
  const $favoriteStory = $favoriteButton.closest("li");
  const storyId = $favoriteStory.attr("id"); // Get the story ID
  const story = storyList.stories.find(story => story.storyId === storyId);
  toggleFavorite(story);
  $favoriteButton.text($favoriteButton.text() === "❤️" ? "🖤" : "❤️");
});

async function createStory(e) {
  e.preventDefault(); // Prevent the form from submitting normally
  const title = $createTitle.val();
  const author = $createAuthor.val();
  const url = $createURL.val();
  const newStory = await storyList.addStory(currentUser, { title, author, url });

  const $newStory = generateStoryMarkup(newStory);
  $allStoriesList.prepend($newStory);
  currentUser.ownStories.push(newStory);
  $userStoriesList.append($newStory);
  $createTitle.val("");
  $createAuthor.val("");
  $createURL.val("");
  hidePageComponents();
  $allStoriesList.show();
  console.log("Story created successfully!");
  console.log(currentUser.ownStories);
}

$createStoryForm.on("submit", createStory);

function showUserStories() {
  console.log(currentUser.ownStories);
  hidePageComponents();
  $userStoriesList.empty();
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    console.log($story);
    $userStoriesList.append($story);
  }
  $userStoriesList.show();
}

// function refreshPage() {
//   if (!$allStoriesList) {

//   }
// }

// // Switch to favorites view when the favorites button is clicked
// $navFavorites.on("click", function () {
//   switchToFavorites();
// });

// // Switch to main view when the home button is clicked
// $homeButton.on("click", function () {
//   switchToMainView();
// });

// function switchToFavorites() {
//   const favoriteStories = storyList.stories.filter(story =>
//     currentUser.favorites.some(favorite => favorite.storyId === story.storyId));
//   putFavoritesOnPage(favoriteStories); // Display the favorite stories on the page
//   isFavoritesView = true;
// }

// function switchToMainView() {
//   navAllStories();
//   isFavoritesView = false;
// }

// $(document).ready(function () {
//   // Get and show stories when site first loads
//   getStoriesOnStart();
//   // Show the appropriate view based on the saved state
//   if (isFavoritesView) {
//     switchToFavorites();
//   } else {
//     switchToMainView();
//   }
// });