function StoreHero({ store }) {
  if (!store) {
    return null;
  }

  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Administrator portal</p>
        <h1>{store.name}</h1>
        <p className="hero__tag">{store.tagline}</p>
        <p>{store.description}</p>
        <ul className="hero__meta">
          <li>{store.address}</li>
          <li>{store.phone_number}</li>
          <li>{store.hours}</li>
        </ul>
      </div>
      <div className="vinyl" aria-hidden="true">
        <span className="vinyl__label">GV</span>
      </div>
    </section>
  );
}

export default StoreHero;
