const videos = [
  { id: 'RBSGKlAvoiM', category: 'learn', tag: 'Learn', title: 'Data structures, easy to advanced', description: 'Build a practice that compounds over time.' },
  { id: 'aircAruvnKk', category: 'learn', tag: 'Learn', title: 'But what is a neural network?', description: 'Make complex ideas easier to understand.' },
  { id: 'rfscVS0vtbw', category: 'make', tag: 'Make', title: 'Learn Python from scratch', description: 'Start building useful things with code.' },
  { id: 'Ke90Tje7VS0', category: 'learn', tag: 'Learn', title: 'React for beginners', description: 'A practical start to building interfaces.' },
  { id: 'bMknfKXIFA8', category: 'make', tag: 'Make', title: 'Build a React project', description: 'Turn an idea into a project people can use.' },
  { id: 'PkZNo7MFNFg', category: 'learn', tag: 'Learn', title: 'JavaScript full course', description: 'Learn the language behind the web.' },
  { id: 'zJSY8tbf_ys', category: 'make', tag: 'Make', title: 'Web development full course', description: 'A broad map for becoming a web developer.' },
  { id: 'M7lc1UVf-VE', category: 'mindset', tag: 'Mindset', title: 'Build your first embedded video', description: 'Understand the building blocks behind video on the web.' }
];

const views = { welcome: document.querySelector('[data-view="welcome"]'), feed: document.querySelector('[data-view="feed"]') };
const form = document.querySelector('[data-intent-form]');
const input = document.querySelector('#intent-input');
const grid = document.querySelector('[data-video-grid]');
const intentLabel = document.querySelector('[data-intent-label]');
let currentFilter = 'all';

function renderVideos(filter = currentFilter) {
  const visibleVideos = filter === 'all' ? videos : videos.filter((video) => video.category === filter);
  grid.innerHTML = visibleVideos.map((video) => `
    <article class="video-card">
      <div class="video-frame">
        <iframe src="https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1" title="${video.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <div class="video-meta">
        <div><h3 class="video-title">${video.title}</h3><p class="video-description">${video.description}</p></div>
        <span class="video-tag">${video.tag}</span>
      </div>
    </article>
  `).join('');
  document.querySelector('.feed-count').innerHTML = `<span class="status-dot"></span> ${visibleVideos.length} focused videos`;
}

function showFeed(intent) {
  const cleanIntent = intent.trim();
  if (!cleanIntent) return;
  intentLabel.textContent = cleanIntent;
  views.welcome.classList.add('hidden');
  views.feed.classList.remove('hidden');
  document.querySelector('[data-focus-status]').textContent = 'Feed tuned for you';
  renderVideos();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

form.addEventListener('submit', (event) => { event.preventDefault(); showFeed(input.value); });
document.querySelectorAll('[data-suggestion]').forEach((button) => {
  button.addEventListener('click', () => { input.value = button.dataset.suggestion; input.focus(); });
});
document.querySelector('[data-change-intent]').addEventListener('click', () => { views.feed.classList.add('hidden'); views.welcome.classList.remove('hidden'); input.focus(); });
document.querySelector('[data-home-link]').addEventListener('click', (event) => { event.preventDefault(); views.feed.classList.add('hidden'); views.welcome.classList.remove('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' }); });
document.querySelectorAll('[data-filter]').forEach((tab) => {
  tab.addEventListener('click', () => {
    currentFilter = tab.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === tab));
    renderVideos(currentFilter);
  });
});
