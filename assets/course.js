/* ===== SHARED COURSE SCRIPTS ===== */

// Quiz grading
function gradeQuiz(quizId) {
    const quiz = document.getElementById(quizId);
    if (!quiz) return;
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
        const explain = q.querySelector('.explain');
        if (explain) explain.style.display = 'block';
    });

    const result = quiz.querySelector('.quiz-result');
    if (!result) return;
    result.style.display = 'block';
    const pct = Math.round((correct / total) * 100);
    if (pct >= 80) {
        result.style.background = '#10b98120';
        result.style.color = '#10b981';
        result.textContent = correct + '/' + total + ' (' + pct + '%) — Excellent work!';
    } else if (pct >= 50) {
        result.style.background = '#f59e0b20';
        result.style.color = '#f59e0b';
        result.textContent = correct + '/' + total + ' (' + pct + '%) — Good effort, review the explanations above.';
    } else {
        result.style.background = '#ef444420';
        result.style.color = '#ef4444';
        result.textContent = correct + '/' + total + ' (' + pct + '%) — Re-read this module and try again.';
    }
}

document.addEventListener('DOMContentLoaded', function() {

    // Mobile hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('open');
        });
        // Close nav when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== hamburger) {
                nav.classList.remove('open');
            }
        });
    }

    // Smooth scroll-reveal for main content sections
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('main > h2, main > .card, main > .diagram, main > pre, main > .quiz, main > table, main > .nav-btns').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
        observer.observe(el);
    });

    // Active nav link highlighting based on scroll
    const sections = document.querySelectorAll('main > h2');
    const navLinks = document.querySelectorAll('nav a.mod-link');

    // Make first elements visible immediately (above fold)
    var firstElements = document.querySelectorAll('main > h1, main > .subtitle, main > .diff-badge');
    firstElements.forEach(function(el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});
