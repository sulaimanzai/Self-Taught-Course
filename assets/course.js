/* ===== SHARED COURSE SCRIPTS ===== */
function gradeQuiz(quizId) {
    const quiz = document.getElementById(quizId);
    const questions = quiz.querySelectorAll('.quiz-q');
    let correct = 0;
    let total = questions.length;

    questions.forEach((q) => {
        const correctIdx = parseInt(q.dataset.correct);
        const labels = q.querySelectorAll('label');
        const selected = q.querySelector('input:checked');

        labels.forEach(l => { l.classList.remove('correct', 'wrong'); });

        if (selected) {
            const selectedIdx = parseInt(selected.closest('label').dataset.opt);
            if (selectedIdx === correctIdx) {
                selected.closest('label').classList.add('correct');
                correct++;
            } else {
                selected.closest('label').classList.add('wrong');
                labels[correctIdx].classList.add('correct');
            }
        } else {
            labels[correctIdx].classList.add('correct');
        }
        q.querySelector('.explain').style.display = 'block';
    });

    const result = quiz.querySelector('.quiz-result');
    result.style.display = 'block';
    const pct = Math.round((correct / total) * 100);
    if (pct >= 80) {
        result.style.background = '#10b98120';
        result.style.color = '#10b981';
        result.textContent = correct + '/' + total + ' (' + pct + '%) - Great job!';
    } else if (pct >= 50) {
        result.style.background = '#f59e0b20';
        result.style.color = '#f59e0b';
        result.textContent = correct + '/' + total + ' (' + pct + '%) - Good effort! Review the explanations.';
    } else {
        result.style.background = '#ef444420';
        result.style.color = '#ef4444';
        result.textContent = correct + '/' + total + ' (' + pct + '%) - Re-read this module and try again!';
    }
}

// Mobile hamburger toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('open');
        });
    }
});
