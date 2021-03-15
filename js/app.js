
const tweetForm = document.querySelector('#tweet-form');
const submitButton = document.querySelector('#submit-button');


let tweets = JSON.parse(localStorage.getItem('tweets')) || [];


function save(){
    localStorage.setItem('tweets', JSON.stringify(tweets));

    displayTweets();
}

function addTweet(username,body){
    tweets.unshift({
        'id' : Date.now(),
        'avatar' : Math.floor((Math.random() * 5) + 1),
        'username' : username.trim(),
        'body' : body.trim(),
    });

    save();

    tweetForm.reset();
}

function toggleLike(tweet){
    const index = tweets.indexOf(tweet);
    tweets[index].liked = !tweets[index].liked;

    save();
}

function retweet(tweet){
    const index = tweets.indexOf(tweet);

    if(tweets[index].retweeted){
        alert('This Tweet has alredy been Retweeted');
        return;
    }

    tweets[index].retweeted = true;
    
    addTweet(tweet.username,tweet.body);
}

function displaySingleTweet(t,tweetsBox){

    const avatarImg = document.createElement('img');
    avatarImg.src = "./images/avatars/"+t.avatar+".svg";
    avatarImg.style.width = "50px";

    const tweetAvatar = document.createElement('div');
    tweetAvatar.classList.add('tweet-avatar');
    tweetAvatar.appendChild(avatarImg);

    const tweetUsername = document.createElement('h5');
    tweetUsername.textContent = t.username;

    const tweetContent = document.createElement('p');
    tweetContent.textContent = t.body;


    const hr = document.createElement('hr');
    hr.style = "margin-top: .75rem; margin-bottom:0.75rem;";

    const likeButton = document.createElement('a');
    likeButton.innerHTML = '<i class="fa fa-heart"></i>';
    likeButton.title = "like";
    likeButton.classList.add('like-button');
    likeButton.href = "#";
    likeButton.onclick = (e) => {
        e.preventDefault();
        toggleLike(t);
    };

    
    const retweetButton = document.createElement('a');
    retweetButton.innerHTML = '<i class="fa fa-retweet"></i>';
    retweetButton.title = "retweet";
    retweetButton.classList.add('retweet-button');
    retweetButton.href = "#";
    retweetButton.onclick = (e) => {
        e.preventDefault();
        retweet(t);
    };

    const tweetButtons = document.createElement('div');
    tweetButtons.classList.add('tweet-buttons');
    tweetButtons.appendChild(likeButton);
    tweetButtons.appendChild(retweetButton);

    const tweetBody = document.createElement('div');
    tweetBody.classList.add('tweet-body');
    tweetBody.appendChild(tweetUsername);
    tweetBody.appendChild(tweetContent);
    tweetBody.appendChild(hr);
    tweetBody.appendChild(tweetButtons);


    const tweet = document.createElement('div');
    tweet.classList.add('tweet');
    tweet.appendChild(tweetAvatar);
    tweet.appendChild(tweetBody);

    if(t.liked){
        likeButton.classList.add('liked');
        tweet.style.backgroundColor = '#fbeeee';
    }

    if(t.retweeted){
        retweetButton.classList.add('retweeted');
    }

    tweetsBox.appendChild(tweet);

}


function displayTweets(){
    
    const tweetsBox = document.querySelector('#tweets');

    tweetsBox.innerHTML = '';

    tweets.forEach((tweet) => {
        displaySingleTweet(tweet,tweetsBox);
    });

}

submitButton.addEventListener('click',(e) => {
    e.preventDefault();

    const username = tweetForm.elements['username'].value;
    const body = tweetForm.elements['body'].value;

    if(username.trim() === '' || username.trim().length == 0){
        alert('Please Enter Your username to Tweet !');
        return;
    }

    if(body.trim() === '' || body.trim().length == 0){
        alert('Please Fill The Tweet Body to Tweet');
        return;
    }

    if(body.trim().length < 5){
        alert('The Tweet Body must be at least 5 characters');
        return;
    }

    addTweet(username,body);

});


displayTweets();