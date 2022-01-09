var ideas = [];
var filterIdeas = true;
var inputData;
var inputString;
var searchIndex = [];

var saveButton = document.querySelector('.save-button');
var ideaTitle = document.querySelector('#title');
var ideaBody = document.querySelector('#body');
var ideaCardGrid = document.querySelector('.idea-card-grid');
var topParent = document.querySelector('.top-section');
var ideaSection = document.querySelector('.idea-section');
var borderBox = document.querySelector('.border-box');
var searchBox = document.querySelector('#search');

saveButton.addEventListener('click', saveIdeaCard);
saveButton.addEventListener('mouseover', disableSaveButton);
saveButton.addEventListener('mouseout', enableSaveButton);
ideaSection.addEventListener('click', deleteIdeaCard);
ideaSection.addEventListener('click', changeImage);
borderBox.addEventListener('click', showStarredIdeas);
borderBox.addEventListener('click', toggleFilterButton);
borderBox.addEventListener('click', showAllIdeas);
searchBox.addEventListener('input', outputSearch);

function saveIdeaCard() {
  if (ideaTitle.value != false && ideaBody.value != false) {
  var idea = new Idea(ideaTitle.value, ideaBody.value);
  ideas.push(idea);
  regenerateIdeaCards();
  ideaTitle.value = "";
  ideaBody.value = "";
  }
}

function disableSaveButton(event) {
  if (event.target.className === 'save-button') {
    if (ideaTitle.value == false || ideaBody.value == false) {
      document.querySelector('.save-button').style.opacity = '0.5';
      document.querySelector('.save-button').style.cursor = 'none';
    }
  }
}

function disableSaveButton(event) {
  if (event.target.className === 'save-button') {
    if (ideaTitle.value == false || ideaBody.value == false) {
      document.querySelector('.save-button').style.opacity = '0.5';
      document.querySelector('.save-button').style.cursor = 'none';
    }
  }
}

function enableSaveButton(event) {
  if (event.target.className === 'save-button') {
      document.querySelector('.save-button').style.opacity = '1';
      document.querySelector('.save-button').style.cursor = '';
  }
}

function deleteIdeaCard(event) {
  if (event.target.className === 'delete-icon') {
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id == event.target.id) {
        ideas.splice(i, 1);
      }
    }
  }
  regenerateIdeaCards();
}

function regenerateIdeaCards() {
  ideaCardGrid.innerHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].star === false) {
    ideaCardGrid.innerHTML += `
    <div class="idea-card">
      <div class="user-idea-header">
        <img class="star" id=${ideas[i].id} src="./assets/star.svg" alt="star"/>
        <img id=${ideas[i].id} class="delete-icon" src="./assets/delete.svg" alt="delete-icon"/>
        <img class="delete-active hidden" src="./assets/delete-active.svg" alt="delete-icon-active"/>
      </div>
      <div class="user-idea">
        <h3>${ideas[i].title}</h3>
        <p>${ideas[i].body}</p>
      </div>
      <div class="user-idea-footer">
        <img src="./assets/comment.svg" alt="comment-icon"/>
        <section class="comment-button">Comment</section>
        <label class="comment hidden"></label>
      </div>
    </div>
    `
  } else if (ideas[i].star === true) {
    ideaCardGrid.innerHTML += `
    <div class="idea-card">
      <div class="user-idea-header">
        <img class="star-active" id=${ideas[i].id} src="./assets/star-active.svg" alt="star-active"/>
        <img id=${ideas[i].id} class="delete-icon" src="./assets/delete.svg" alt="delete-icon"/>
        <img class="delete-active hidden" src="./assets/delete-active.svg" alt="delete-icon-active"/>
      </div>
      <div class="user-idea">
        <h3>${ideas[i].title}</h3>
        <p>${ideas[i].body}</p>
      </div>
      <div class="user-idea-footer">
        <img src="./assets/comment.svg" alt="comment-icon"/>
        <section class="comment-button">Comment</section>
        <label class="comment hidden"></label>
      </div>
    </div>
    `
    }
  }
}

function changeImage(event) {
  event.preventDefault();
  if (event.target.className === 'star' || event.target.className === 'star-active') {
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id == event.target.id) {
        ideas[i].updateIdea();
      }
    }
    regenerateIdeaCards();
  }
}

function showStarredIdeas(event) {
  event.preventDefault();
  ideaCardGrid.innerHTML = '';
  if (event.target.className === 'show-starred-ideas') {
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].star === true) {
        ideaCardGrid.innerHTML += `
        <div class="idea-card">
          <div class="user-idea-header">
            <img class="star-active" id=${ideas[i].id} src="./assets/star-active.svg" alt="star-active"/>
            <img id=${ideas[i].id} class="delete-icon" src="./assets/delete.svg" alt="delete-icon"/>
            <img class="delete-active hidden" src="./assets/delete-active.svg" alt="delete-icon-active"/>
          </div>
          <div class="user-idea">
            <h3>${ideas[i].title}</h3>
            <p>${ideas[i].body}</p>
          </div>
          <div class="user-idea-footer">
            <img src="./assets/comment.svg" alt="comment-icon"/>
            <section class="comment-button">Comment</section>
            <label class="comment hidden"></label>
          </div>
        </div>
        `
      }
    }
  }
}

function showAllIdeas() {
  if (event.target.className === 'show-all-ideas') {
    regenerateIdeaCards();
  }
}

function toggleFilterButton() {
  event.preventDefault();
  borderBox.innerHTML = '';
  if (filterIdeas === true) {
    borderBox.innerHTML += `
      <h4 class="starred-ideas">Filter Starred Ideas</h4>
      <button class="show-all-ideas">Show All Ideas</button>
      `
    filterIdeas = false;
  } else {
    borderBox.innerHTML += `
      <h4 class="starred-ideas">Filter Starred Ideas</h4>
      <button class="show-starred-ideas">Show Starred Ideas</button>
      `
    filterIdeas = true;
  }
}

function searchInputData() {
  var inputString = searchBox.value;
  // var inputNoPunctuation = inputString.replace(/[.,\/#!*;:{}$%\^&\=\-_`~()]/g,'');
  // var inputData = inputNoPunctuation.split(' ');
  var inputData = inputString.split(' ');
  var lengthCheck = 0;
  for (var i = 0; i < ideas.length; i++) {
    for (var j = 0; j < inputData.length; j++) {
      if (ideas[i].body.includes(inputData[j]) || ideas[i].title.includes(inputData[j])) {
        lengthCheck++;
      }
    }
    if (lengthCheck === inputData.length) {
      searchIndex.push(ideas[i]);
      lengthCheck = 0;
    }
  }
}

function outputSearch() {
  if (searchBox.value = '') {
    regenerateIdeaCards();
  } else {
    searchInputData();
    ideaCardGrid.innerHTML = '';
    for (var i = 0; i < searchIndex.length; i++) {
      if (searchIndex[i].star === false) {
      ideaCardGrid.innerHTML += `
      <div class="idea-card">
        <div class="user-idea-header">
          <img class="star" id=${searchIndex[i].id} src="./assets/star.svg" alt="star"/>
          <img id=${searchIndex[i].id} class="delete-icon" src="./assets/delete.svg" alt="delete-icon"/>
          <img class="delete-active hidden" src="./assets/delete-active.svg" alt="delete-icon-active"/>
        </div>
        <div class="user-idea">
          <h3>${searchIndex[i].title}</h3>
          <p>${searchIndex[i].body}</p>
        </div>
        <div class="user-idea-footer">
          <img src="./assets/comment.svg" alt="comment-icon"/>
          <section class="comment-button">Comment</section>
          <label class="comment hidden"></label>
        </div>
      </div>
      `
    } else if (searchIndex[i].star === true) {
      ideaCardGrid.innerHTML += `
      <div class="idea-card">
        <div class="user-idea-header">
          <img class="star-active" id=${searchIndex[i].id} src="./assets/star-active.svg" alt="star-active"/>
          <img id=${searchIndex[i].id} class="delete-icon" src="./assets/delete.svg" alt="delete-icon"/>
          <img class="delete-active hidden" src="./assets/delete-active.svg" alt="delete-icon-active"/>
        </div>
        <div class="user-idea">
          <h3>${searchIndex[i].title}</h3>
          <p>${searchIndex[i].body}</p>
        </div>
        <div class="user-idea-footer">
          <img src="./assets/comment.svg" alt="comment-icon"/>
          <section class="comment-button">Comment</section>
          <label class="comment hidden"></label>
        </div>
      </div>
      `
      }
    }
    searchIndex = [];
  }
}
