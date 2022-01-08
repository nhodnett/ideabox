var ideas = [];

var saveButton = document.querySelector('.save-button');
var ideaTitle = document.querySelector('#title');
var ideaBody = document.querySelector('#body');
var ideaCardGrid = document.querySelector('.idea-card-grid');
var topParent = document.querySelector('.top-section');
var ideaSection = document.querySelector('.idea-section');

saveButton.addEventListener('click', saveIdeaCard);
saveButton.addEventListener('mouseover', disableSaveButton);
saveButton.addEventListener('mouseout', enableSaveButton);
ideaSection.addEventListener('click', deleteIdeaCard);
ideaSection.addEventListener('click', changeImage);

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
  var starStatus;
  var activeStarStatus;
  console.log("BEFORE", activeStarStatus);
  ideaCardGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].star === false) {
    console.log("AFTER", activeStarStatus);
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
  debugger
  if (event.target.className === 'star' || event.target.className === 'star-active') {
    for (var i = 0; i < ideas.length; i++) {
      if (ideas[i].id == event.target.id) {
        ideas[i].updateIdea();
      }
      // .classList.add('hidden');
      // .classList.remove('hidden');
    }
    regenerateIdeaCards();
  }
}
