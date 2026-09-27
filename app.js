(() => {
  const opening = document.getElementById('opening');
  const begin = document.getElementById('begin');
  const keep = document.getElementById('keepQuestion');
  const keptNote = document.getElementById('keptNote');

  begin.addEventListener('click', () => {
    opening.classList.add('is-opening');
    document.body.classList.remove('intro-open');
    window.setTimeout(() => {
      opening.setAttribute('aria-hidden', 'true');
      document.getElementById('beginning').focus?.({preventScroll:true});
    }, 1300);
  });

  keep.addEventListener('click', () => {
    const isOpen = keptNote.classList.toggle('show');
    keep.classList.toggle('closed', isOpen);
    keep.setAttribute('aria-expanded', String(isOpen));
    keep.querySelector('span').textContent = isOpen ? 'A question, folded safely.' : 'Keep this question with you.';
  });

  const proposalResponse = document.getElementById('proposalResponse');
  const proposalChoices = document.querySelectorAll('.proposal-choice');
  const messages = {
    yes: 'Then let this be the first quiet page of our someday. I will choose us patiently — through the distance, the ordinary days, the hard ones, and every new morning. Thank you for letting your heart meet mine here. I love you, Julian.',
    no: 'Thank you for answering honestly. Love should never be a test, a debt, or a beautiful way of asking you to abandon yourself. I will respect your heart, your timing, and your truth — and I will always be grateful that you came into my life.'
  };

  proposalChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const answer = choice.dataset.answer;
      proposalChoices.forEach((button) => button.setAttribute('aria-pressed', String(button === choice)));
      proposalResponse.textContent = messages[answer];
      proposalResponse.classList.add('show');
      document.body.classList.toggle('celebrate', answer === 'yes');
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
})();
