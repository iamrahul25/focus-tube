import { FormEvent, useState } from 'react';
import { categories, rankVideos, videos, type VideoCategory } from './data';

type Filter = 'all' | VideoCategory;

function Eyebrow({ children }: { children: string }) {
  return <div className="eyebrow"><span className="eyebrow-line" />{children}</div>;
}

function Header({ onHome }: { onHome: () => void }) {
  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="FocusTube home" onClick={(event) => { event.preventDefault(); onHome(); }}>
        <span className="brand-mark"><span /><span /><span /></span>
        <span>focus<span className="brand-highlight">tube</span></span>
      </a>
      <div className="topbar-actions">
        <span className="focus-pill"><span className="status-dot" /><span>Focus mode on</span></span>
        <button className="icon-button" type="button" aria-label="Open settings" title="Settings">⚙</button>
        <div className="avatar" aria-label="Your profile">FT</div>
      </div>
    </header>
  );
}

function Welcome({ onSubmit }: { onSubmit: (intent: string) => void }) {
  const [input, setInput] = useState('');
  const suggestions = ['Become a thoughtful software engineer', 'Build strength and cycle farther', 'Take better photographs'];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(input);
  }

  return (
    <section className="welcome-view">
      <div className="welcome-copy">
        <Eyebrow>A better feed starts with a direction</Eyebrow>
        <h1>Watch toward<br /><em>who you want to become.</em></h1>
        <p className="welcome-lede">FocusTube turns your intentions into a quieter, more useful video feed. No rabbit holes. Just the next helpful thing.</p>
        <form className="intent-form" onSubmit={submit}>
          <label htmlFor="intent-input">What are you working toward?</label>
          <div className="input-wrap">
            <textarea id="intent-input" rows={2} placeholder="e.g. Become a React Native developer who builds useful things" value={input} onChange={(event) => setInput(event.target.value)} required />
            <button className="submit-button" type="submit" aria-label="Build my feed" title="Build my feed"><span>→</span></button>
          </div>
          <div className="suggestion-row" aria-label="Suggested goals">
            {suggestions.map((suggestion) => <button key={suggestion} type="button" className="suggestion" onClick={() => setInput(suggestion)}>{suggestion.replace(/^(Become a thoughtful |Build strength and |Take better )/, '')}</button>)}
          </div>
        </form>
      </div>
      <div className="welcome-visual" aria-hidden="true">
        <div className="orbit orbit-large" /><div className="orbit orbit-small" />
        <div className="visual-card visual-card-main">
          <div className="visual-card-top"><span className="mini-play">▶</span><span>YOUR NEXT CHAPTER</span></div>
          <div className="visual-sparkline"><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="visual-card-bottom"><strong>Small steps, daily.</strong><span>01 / 04</span></div>
        </div>
        <div className="visual-note note-one"><span>✦</span> Curated for your future self</div><div className="visual-note note-two">less noise <span>↗</span></div><div className="visual-label">INTENTION<br /><strong>→</strong> ACTION</div>
      </div>
    </section>
  );
}

function VideoCard({ video }: { video: (typeof videos)[number] }) {
  return <article className="video-card"><div className="video-frame"><iframe src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="video-meta"><div><h3 className="video-title">{video.title}</h3><p className="video-description">{video.description}</p></div><span className="video-tag">{video.tag}</span></div></article>;
}

function Feed({ intent, onChangeIntent }: { intent: string; onChangeIntent: () => void }) {
  const [filter, setFilter] = useState<Filter>('all');
  const filteredVideos = filter === 'all' ? videos : videos.filter((video) => video.category === filter);
  const visibleVideos = rankVideos(filteredVideos, intent);

  return <section className="feed-view">
    <div className="feed-heading"><div><Eyebrow>Your intentional feed</Eyebrow><h2>Keep becoming.</h2><p>Thoughtful videos selected for <strong>{intent}</strong></p></div><button className="change-intent" type="button" onClick={onChangeIntent}>Change direction <span>↗</span></button></div>
    <div className="feed-toolbar"><div className="filter-tabs" role="tablist" aria-label="Feed categories">{categories.map((category) => <button key={category} className={`filter-tab ${filter === category ? 'active' : ''}`} type="button" onClick={() => setFilter(category)}>{category === 'all' ? 'For you' : category[0].toUpperCase() + category.slice(1)}</button>)}</div><span className="feed-count"><span className="status-dot" /> {visibleVideos.length} focused videos</span></div>
    <div className="video-grid">{visibleVideos.map((video) => <VideoCard key={video.id} video={video} />)}</div>
    <div className="feed-footer"><span className="footer-star">✦</span> Your attention is valuable. Spend it on purpose.</div>
  </section>;
}

export default function App() {
  const [intent, setIntent] = useState('');
  const [showFeed, setShowFeed] = useState(false);

  function buildFeed(nextIntent: string) {
    const cleanIntent = nextIntent.trim();
    if (!cleanIntent) return;
    setIntent(cleanIntent);
    setShowFeed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goHome() {
    setShowFeed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <div className="app-shell"><Header onHome={goHome} /><main>{showFeed ? <Feed intent={intent} onChangeIntent={goHome} /> : <Welcome onSubmit={buildFeed} />}</main></div>;
}
