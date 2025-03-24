document.addEventListener("DOMContentLoaded", () => {
    let counter = document.getElementById("counter");
    let count = 0;
    let isPaused = false;
    let interval = setInterval(incrementCounter, 1000);

    function incrementCounter() {
        if (!isPaused) {
            count++;
            counter.textContent = count;
        }
    }

    document.getElementById("plus").addEventListener("click", () => {
        count++;
        counter.textContent = count;
    });

    document.getElementById("minus").addEventListener("click", () => {
        count--;
        counter.textContent = count;
    });

    document.getElementById("heart").addEventListener("click", () => {
        let likesList = document.querySelector(".likes");
        let existingLike = document.getElementById(`like-${count}`);
        if (existingLike) {
            let likeCount = parseInt(existingLike.dataset.count) + 1;
            existingLike.dataset.count = likeCount;
            existingLike.textContent = `${count} has been liked ${likeCount} times`;
        } else {
            let newLike = document.createElement("li");
            newLike.id = `like-${count}`;
            newLike.dataset.count = 1;
            newLike.textContent = `${count} has been liked 1 time`;
            likesList.appendChild(newLike);
        }
    });

    document.getElementById("pause").addEventListener("click", (e) => {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(interval);
            e.target.textContent = "resume";
            disableButtons(true);
        } else {
            interval = setInterval(incrementCounter, 1000);
            e.target.textContent = "pause";
            disableButtons(false);
        }
    });

    function disableButtons(state) {
        document.getElementById("plus").disabled = state;
        document.getElementById("minus").disabled = state;
        document.getElementById("heart").disabled = state;
        document.getElementById("submit").disabled = state;
    }

    document.getElementById("comment-form").addEventListener("submit", (e) => {
        e.preventDefault();
        let commentInput = document.getElementById("comment-input").value;
        if (commentInput.trim() !== "") {
            let commentList = document.getElementById("list");
            let newComment = document.createElement("p");
            newComment.textContent = commentInput;
            commentList.appendChild(newComment);
            document.getElementById("comment-input").value = "";
        }
    });
});
