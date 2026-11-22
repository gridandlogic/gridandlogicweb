import { ceo } from "@/app/data/team";

export function CeoBio() {
  return (
    <section className="section wrap ceo-bio reveal" id="abdul-ahad-khan" aria-labelledby="ceo-name">
      <div className="content-grid">
        <div>
          <div className="eyebrow">The person behind Grid &amp; Logic</div>
          <h2 id="ceo-name">{ceo.name}</h2>
          <p className="ceo-role">{ceo.role}</p>
        </div>
        <div>
          <p>{ceo.bio}</p>
          <nav className="profile-links" aria-label="Abdul Ahad Khan profiles">
            {ceo.profiles.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
