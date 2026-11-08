const serviceName = "THALASSA";
let isSubscribed = false;
let submitCount = 0;


function makeSubscribeMessage(email, subscribed) {
    if (subscribed == true) {
        return email + "로 신청이 완료되었습니다.";  
    }
    
    return "이메일을 입력한 뒤 신청해주세요.";
}

const subscribeform = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

function handleSubscribe(event) {
    event.preventDefault();

    const subscriberEmail = emailInput.value.trim();

    if (subscriberEmail ==="") {
        subscribeMessage.textContent =
          "이메일을 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }

    isSubscribed = true;
    submitCount += 1;
    
    subscribeMessage.textContent = 
      makeSubscribeMessage(subscriberEmail, isSubscribed);

    subscribeMessage.classList.add("is-success");

    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;
}

subscribeform.addEventListener("submit", handleSubscribe);

// const nicknameInput = document.querySelector("#nickname");
// const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const startButton = document.querySelector("#startButton");


// function handlenicknameInput(){
//     const maxLength = nicknameInput.maxLength;
//     const currentLength = Math.min(nicknameInput.value.length, maxLength);

//     nicknameCount.textContent = currentLength + " / " + maxLength;
// }

// nicknameInput.addEventListener("input", handlenicknameInput);

function handleAgreeChange() {
   const agreed = agreeCheck.checked;

   startButton.disabled = !agreed;
   agreeMessage.textContent = agreed
    ? "테스트 피드백을 작성할 수 있습니다."
    : "동의 후 게임 테스트 피드백을 작성할 수 있습니다.";

   if(agreed) {
    agreeMessage.classList.add("is-ready");
   } else {
    agreeMessage.classList.remove("is-ready");

   }
}

agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
    tabs.forEach(function (tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");

    });
    panels.forEach(function(panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab){
    const targetSelector = clickedTab.dataset.target;
    const targetPanel = document.querySelector("#" + targetSelector);

    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected", "true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event) {
    resetTabsAndPanels();
    activateTab(event.currentTarget);

    // NYRA, SILEX: 아르카디아 / NULL_7, VARKAN: 에테르
    const character = event.currentTarget.textContent.trim();
    document.body.classList.toggle("dark", character === "NULL_7" || character === "VARKAN");
}

tabs.forEach(function (tab) {
    tab.addEventListener("click", handleTabClick);
});

//
document.body.classList.add("dark");

const trainingFlow = document.querySelector("#training-flow");
const flowSteps = trainingFlow.querySelectorAll(".step");
const progressItems = trainingFlow.querySelectorAll(".progress_item");
const titleInput = document.querySelector("#presentation-title");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
const durationRange = document.querySelector("#duration-range");
const qnaOption = document.querySelector("#qna-option");
const qnaOptions = document.querySelector("#qna-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryTitle = document.querySelector("#summary-title");
const summaryDuration = document.querySelector("#summary-duration");
const summaryQna = document.querySelector("#summary-qna")
const durationValues = ["3", "5", "10"];

const formData = {
    title:"", duration:"5", qna: false, qnaCount:"2"
};

function showStep(index) {
    flowSteps.forEach((step, i) => { step.hidden = i !== index; });
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const recordingDialog = document.querySelector("#recording-dialog");
const recordingCancel = document.querySelector("#recording-cancel");
const recordingConfirm = document.querySelector("#recording-confirm");

function revokeRecordingAgreement() {
    agreeCheck.checked=false;
    trainingFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startButton.addEventListener("click", () => {
    if(!agreeCheck.checked) return;
    recordingDialog.showModal();
});
recordingCancel.addEventListener("click", () => {
    recordingDialog.close();
    revokeRecordingAgreement();
});
recordingDialog.addEventListener("cancel", revokeRecordingAgreement);
recordingConfirm.addEventListener("click", () => {
    if(!agreeCheck.checked) return;
    recordingDialog.close();
    trainingFlow.hidden = false;
    showStep(0);
    trainingFlow.scrollIntoView({behavior : "smooth"});
    titleInput.focus();
});

function validateTitle() {
    const value = titleInput.value.trim();
    if(!value) {
        titleError.textContent = "발표 제목을 입력해 주세요.";
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    formData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if(!validateTitle()) return;
    showStep(1);
});

qnaOption.addEventListener("change", () => {
    qnaOptions.hidden =! qnaOption.checked;
});

optionPrev.addEventListener("click", () => showStep(0));
optionNext.addEventListener("click", () => {
    formData.duration = durationValues[durationRange.value];
    formData.qna = qnaOption.checked;
    const count = document.querySelector('input[name="qna-count"]:checked');
    formData.qnaCount = count.value;
    summaryTitle.textContent = formData.title;
    summaryDuration.textContent = formData.duration + "시간";
    summaryQna.textContent = formData.qna ? formData.qnaCount + "회 포함" : "미포함";
    showStep(2);


});

summaryPrev.addEventListener("click", () => showStep(1));
finishButton.addEventListener("click", () => showStep(3));
restartButton.addEventListener("click", () => {
    formData.title = "";
    formData.duration = "5";
    formData.qna=false;
    formData.qnaCount = "2";
    titleInput.classList.remove("has-error");
    durationRange.value = "1";
    durationValues.value = "1시간";
    qnaOption.checked = false;
    qnaOptions.hidden = true;
    document.querySelector('input[name="qna-count"][value="2"]'). checked = true;
    summaryTitle.textContent = "";
    summaryDuration.textContent = "";
    summaryQna.textContent = "";
    showStep(0);
});

// 캐릭터 선점 기능
const reservePanel = document.querySelector("#reservePanel");
const reserveSteps = document.querySelectorAll("#reservePanel .reserve-step");
const reserveProgress = document.querySelectorAll(".reserve-progress-item");
const openReserve = document.querySelector("#openReserve");
const reserveNext = document.querySelector("#reserveNext");
const reserveBack = document.querySelector("#reserveBack");
const reserveNickname = document.querySelector("#reserveNickname");
const reserveNicknameCount = document.querySelector("#reserveNicknameCount");
const checkNickname = document.querySelector("#checkNickname");
const nicknameMessage = document.querySelector("#nicknameMessage");
const reserveMessage = document.querySelector("#reserveMessage");
const reservationCards = document.querySelector("#reservationCards");
const reservationCount = document.querySelector("#reservationCount");
const reservationEmpty = document.querySelector("#reservationEmpty");
const reserveCreateAnother = document.querySelector("#reserveCreateAnother");
const cancelReserve = document.querySelector("#cancelReserve");

const reservedNames = ["관리자", "운영자", "THALASSA"];
const storageName = "thalassa-character-reservations-v1";
let reservePage = 0;
let nicknameChecked = false;
let currentIndex = -1;
let savedReservations = [];

// 선점목록
try {
    savedReservations = JSON.parse(localStorage.getItem(storageName)) || [];
    if (!savedReservations || typeof savedReservations.length !== "number") savedReservations = [];
} catch (error) {
    savedReservations = [];
}

function saveReservations() {
    localStorage.setItem(storageName, JSON.stringify(savedReservations));
}

//
function removeReservation(index) {
    if (index < 0) return;
    if (!confirm(savedReservations[index].nickname + " 캐릭터의 선점을 취소할까요?")) return;
    savedReservations.splice(index, 1);
    saveReservations();
    showReservationCards();
    resetReservation();
    reservePanel.hidden = true;
}

function selectedRegion() {
    return document.querySelector('input[name="region-choice"]:checked');
}

function selectedGuardian() {
    return document.querySelector('input[name="guardian-choice"]:checked');
}

function showReserveStep(index) {
    reservePage = index;
    reserveSteps.forEach(function(step, i) {
        step.hidden = i !== index;
    });
    reserveProgress.forEach(function(item, i) {
        item.classList.toggle("is-active", i === Math.min(index, 2));
        item.classList.toggle("is-done", i < Math.min(index, 2));
    });
    reserveBack.hidden = index === 0 || index === 3;
    reserveNext.hidden = index === 3;
    reserveNext.textContent = index === 2 ? "선점 완료" : "다음 단계";
    reserveMessage.textContent = "";
}

function resetReservation() {
    document.querySelectorAll('input[name="region-choice"], input[name="guardian-choice"]').forEach(function(input) {
        input.checked = false;
    });
    reserveNickname.value = "";
    reserveNicknameCount.textContent = "0 / 10";
    nicknameMessage.textContent = "중복 확인이 필요합니다.";
    nicknameMessage.classList.remove("is-valid");
    nicknameChecked = false;
    currentIndex = -1;
    showReserveStep(0);
}

function showCompletedReservation(item) {
    document.querySelector("#completeRegion").textContent = item.region;
    document.querySelector("#completeGuardian").textContent = item.guardian;
    document.querySelector("#completeNickname").textContent = item.nickname;
    reservePanel.hidden = false;
    showReserveStep(3);
    reservePanel.scrollIntoView({behavior: "smooth", block: "start"});
}

// 저장한 캐릭터를 카드로 보여주기
function showReservationCards() {
    reservationCards.innerHTML = "";
    reservationCount.textContent = savedReservations.length;
    reservationEmpty.hidden = savedReservations.length > 0;

    savedReservations.forEach(function(item, index) {
        const card = document.createElement("article");
        card.className = "reservation-card";

        const top = document.createElement("div");
        top.className = "reservation-card-top";
        const status = document.createElement("span");
        status.className = "reservation-card-status";
        status.textContent = "선점 완료";
        const date = document.createElement("span");
        date.className = "reservation-card-date";
        date.textContent = item.date;
        top.append(status, date);

        const name = document.createElement("h3");
        name.textContent = item.nickname;
        const detail = document.createElement("p");
        detail.className = "reservation-card-details";
        detail.textContent = item.region + " · " + item.guardian;

        const actions = document.createElement("div");
        actions.className = "reservation-card-actions";
        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.textContent = "내역 보기";
        viewButton.addEventListener("click", function() {
            currentIndex = index;
            showCompletedReservation(item);
        });

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.className = "reservation-card-cancel";
        cancelButton.textContent = "선점 취소";
        cancelButton.addEventListener("click", function() {
            removeReservation(index);
        });

        actions.append(viewButton, cancelButton);
        card.append(top, name, detail, actions);
        reservationCards.append(card);
    });
}

openReserve.addEventListener("click", function() {
    resetReservation();
    reservePanel.hidden = false;
    reservePanel.scrollIntoView({behavior: "smooth", block: "start"});
});

reserveNickname.addEventListener("input", function() {
    reserveNicknameCount.textContent = reserveNickname.value.length + " / 10";
    nicknameChecked = false;
    nicknameMessage.textContent = "중복 확인이 필요합니다.";
    nicknameMessage.classList.remove("is-valid");
});

checkNickname.addEventListener("click", function() {
    const name = reserveNickname.value.trim();
    const used = savedReservations.some(function(item) {
        return item.nickname === name;
    });
    if (name === "") {
        nicknameMessage.textContent = "캐릭터명을 입력해주세요.";
        nicknameChecked = false;
    } else if (reservedNames.includes(name) || used) {
        nicknameMessage.textContent = "이미 사용 중인 캐릭터명입니다.";
        nicknameChecked = false;
    } else {
        nicknameMessage.textContent = "사용 가능한 캐릭터명입니다.";
        nicknameMessage.classList.add("is-valid");
        nicknameChecked = true;
    }
});

reserveNext.addEventListener("click", function() {
    if (reservePage === 0) {
        if (!selectedRegion() || !selectedGuardian()) {
            reserveMessage.textContent = "지역과 수호 캐릭터를 모두 선택해주세요.";
            return;
        }
        showReserveStep(1);
    } else if (reservePage === 1) {
        if (!reserveNickname.value.trim() || !nicknameChecked) {
            reserveMessage.textContent = "캐릭터명 입력과 중복 확인을 완료해주세요.";
            return;
        }
        document.querySelector("#resultRegion").textContent = selectedRegion().value;
        document.querySelector("#resultGuardian").textContent = selectedGuardian().value;
        document.querySelector("#resultNickname").textContent = reserveNickname.value.trim();
        showReserveStep(2);
    } else if (reservePage === 2) {
        const item = {
            region: selectedRegion().value,
            guardian: selectedGuardian().value,
            nickname: reserveNickname.value.trim(),
            date: new Date().toLocaleDateString("ko-KR")
        };
        savedReservations.unshift(item);
        currentIndex = 0;
        try {
            saveReservations();
        } catch (error) {
            savedReservations.shift();
            reserveMessage.textContent = "저장하지 못했습니다. 다시 시도해주세요.";
            return;
        }
        showReservationCards();
        showCompletedReservation(item);
    }
});

reserveBack.addEventListener("click", function() {
    if (reservePage > 0) showReserveStep(reservePage - 1);
});

reserveCreateAnother.addEventListener("click", function() {
    resetReservation();
});

cancelReserve.addEventListener("click", function() {
    removeReservation(currentIndex);
});

showReservationCards();
