import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { clubs } from "../data/clubs";

function ClubDetails() {
  const { id } = useParams();
  const club = clubs.find(c => c.id === parseInt(id));
  const [isFavorite, setIsFavorite] = useState(false);
  const socialLinks = useMemo(() => (club ? Object.entries(club.socialMedia || {}) : []), [club]);
  const details = club?.details || [];
  const events = club?.events || [];

  useEffect(() => {
    if (!club) return;
    const savedFavorites = JSON.parse(window.localStorage.getItem("favoriteClubs") || "[]");
    setIsFavorite(savedFavorites.includes(club.id));
  }, [club]);

  if (!club) return <h1>Club not found</h1>;

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(window.localStorage.getItem("favoriteClubs") || "[]");
    const updatedFavorites = savedFavorites.includes(club.id)
      ? savedFavorites.filter((favoriteId) => favoriteId !== club.id)
      : [...savedFavorites, club.id];

    window.localStorage.setItem("favoriteClubs", JSON.stringify(updatedFavorites));
    setIsFavorite(updatedFavorites.includes(club.id));
  };

  return (
    <div className="club-detail-page">
      <Link to="/" className="club-detail-back">
        ← BACK TO HOME
      </Link>
      <div className="club-detail-layout">
        <div className="club-detail-card">
          <div className="club-detail-media">
            <div className="club-detail-media-label">{club.name}</div>
            <img src={club.image} alt={club.name} className="club-detail-image" />
          </div>

          <div className="club-detail-body">
            <div className="club-detail-header">
              <div>
                <h1 className="club-detail-title">{club.name}</h1>
                <p className="club-detail-description">{club.description}</p>
              </div>
            </div>

            <section className="club-detail-section">
              <h2>DETAILED INFORMATION</h2>
              <div className="club-detail-grid">
                {details.map((detail, index) => (
                  <article key={index} className="club-detail-info-card">
                    <span className="club-detail-info-index">0{index + 1}</span>
                    <p>{detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="club-detail-section">
              <h2>TOP EVENTS</h2>
              <div className="club-detail-events">
                {events.map((event) => (
                  <article key={event.name} className="club-detail-event-card">
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside className="club-detail-sidebar">
          <div className="club-detail-side-card">
            <Link to="/" className="club-detail-chip">ALL CLUBS</Link>
            <button
              type="button"
              onClick={toggleFavorite}
              className={`club-detail-favorite ${isFavorite ? "is-active" : ""}`}
            >
              {isFavorite ? "★ FAVORITE" : "☆ MARK FAVORITE"}
            </button>
          </div>

          <div className="club-detail-side-card">
            <h2>CONNECT WITH US</h2>
            <div className="club-detail-socials">
              {socialLinks.map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="club-detail-social-link"
                >
                  {platform.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ClubDetails;
