// 문제 객체(생성자 함수)
function Question(text, choice, answer) {
    this.text = text; // 질문 텍스트
    this.choice = choice; // 선택할 답들(배열)
    this.answer = answer; // 정답 정보
 }
 
 // 퀴즈 정보 객체
 function Quiz(questions) {
    this.score = 0; // 점수
    this.questions = questions; // 문제
    this.questionIndex = 0; // 문제 번호
 }
 
 // 정답 확인 메서드
 Quiz.prototype.correctAnswer = function(answer) {
    return answer == this.questions[this.questionIndex].answer;
 }
 
 var questions = [
    new Question('"일야구도하기"의 저자는 누구인가요?', ['윤동주','박완서','박지원','김동인'], '박지원'),
    new Question('일야구도하기는 박지원의 대표작 ____에 수록된 수필 작품이다.', ['열상일기', '열하일기', '열하일지', '열상일지'], '열하일기'),
    new Question('현대적 관점에서의 해석은 뭘까?', ['현대 사회의 물질주의를 비판한다', '디지털 시대가 가져온 정보의 홍수 속에 휘둘리지 않고, 자신만의 길을 걸으며 삶의 진정한 가치를 찾아가야 한다', '현대인의 삶의 의미를 찾는다', '현대 사회의 빠른 변화에 적응못한다'], '디지털 시대가 가져온 정보의 홍수 속에 휘둘리지 않고, 자신만의 길을 걸으며 삶의 진정한 가치를 찾아가야 한다'),
    new Question('일야구도하기의 주제', ['자연의 아름다움을 표현한 작품', '사회 부조리를 비판한 작품', '내적 평정심의 중요성을 강조한 작품', '인간의 욕망을 다룬 작품'], '내적 평정심의 중요성을 강조한 작품')
 ];
 
 // 퀴즈 객체 생성
 var quiz = new Quiz(questions);
 
 // 문제 출력 함수
 function updateQuiz() {
    var question = document.getElementById('question');
    var idx = quiz.questionIndex + 1;
    var choice = document.querySelectorAll('.btn');
 
    // 문제 출력
    question.innerHTML = '문제' + idx + ') ' + quiz.questions[quiz.questionIndex].text;
 
    // 선택 출력
    for (var i = 0; i < 4; i++) {
       choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
    }
 
    progress();
 }
 
 function progress() {
    var progress = document.getElementById('progress');
    progress.innerHTML = '문제 ' + (quiz.questionIndex + 1) + '/ ' + quiz.questions.length;
 }
 
 var btn = document.querySelectorAll('.btn');
 
 // 입력 및 정답 확인 함수
 function checkAnswer(i) {
    btn[i].addEventListener('click', function() {
       var answer = btn[i].innerText;
 
       if (quiz.correctAnswer(answer)) {
          alert('정답입니다!');
          quiz.score++;
       } else {
          alert('틀렸습니다!');
       }
 
       if (quiz.questionIndex < quiz.questions.length - 1) {
          quiz.questionIndex++;
          updateQuiz();
       } else {
          result();
       }
    });
 }
 
 function result() {
    var quizDiv = document.getElementById('quiz');
    var per = parseInt((quiz.score * 100) / quiz.questions.length);
    var txt = '<h1>서평 발표 속 퀴즈</h1>' + '<h2 id="score">당신의 점수: ' + quiz.score + '/' + quiz.questions.length + '<br><br>' + per + '점' + '</h2>';
 
    quizDiv.innerHTML = txt;
 
    // 점수별 결과 텍스트
    if (per < 60) {
       txt += '<h2>더 분발하세요</h2>';
       quizDiv.innerHTML = txt;
    } else if (per >= 60 && per < 80) {
       txt += '<h2>무난한 점수네요</h2>'
       quizDiv.innerHTML = txt;
    } else if (per >= 80) {
       txt += '<h2>훌륭합니다</h2>'
       quizDiv.innerHTML = txt;
    }
 }
 
 for (var i = 0; i < btn.length; i++) {
    checkAnswer(i);
 }
 
 updateQuiz();
 