export const metadata = {
  title: "Peter Beck – Recruiting Professional & Talent Acquisition Expert",
  description:
    "Moderne, professionelle Profilseite von Peter Beck – Recruiting Professional & Talent Acquisition Expert.",
};

export default function PeterPage() {
  return (
    <main className="peter-wrapper">
      <div className="container">
        {/* Header */}
        <header className="header card fade-in">
          <div className="profile-image" aria-label="Profilbild mit Initialen PB">
            PB
          </div>
          <h1>Peter Beck</h1>
          <p className="title">Recruiting Professional & Talent Acquisition Expert</p>
          <p className="quote">
            „Die richtigen Menschen an den richtigen Platz zu bringen, ist keine
            Kunst – es ist eine Leidenschaft, die ich jeden Tag neu lebe.“
          </p>

          <div className="contact-buttons">
            <a href="mailto:peter.beck@example.com" className="btn btn-primary">
              <span className="icon">✉️</span> E-Mail
            </a>
            <a
              href="https://linkedin.com/in/peterbeck"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <span className="icon">in</span> LinkedIn
            </a>
            <a href="tel:+49123456789" className="btn btn-outline">
              <span className="icon">☎️</span> Anrufen
            </a>
          </div>
        </header>

        {/* Expertise */}
        <section className="card fade-in delay-1">
          <h2 className="section-title">Meine Expertise</h2>
          <div className="section-content">
            <p>
              Mit über 10 Jahren Erfahrung im Recruiting und Talent Acquisition
              habe ich mich auf die Identifikation und Gewinnung
              hochqualifizierter Fachkräfte spezialisiert. Mein Fokus liegt auf
              nachhaltigen Personalstrategien, die langfristigen Erfolg für
              Unternehmen und Kandidaten gleichermaßen schaffen.
            </p>
          </div>
          <div className="grid">
            <div className="skill-item">
              <div className="skill-title">Executive Search</div>
              <div className="skill-description">
                Gezielte Suche nach Führungskräften und Spezialisten für
                Schlüsselpositionen in Ihrem Unternehmen.
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-title">Employer Branding</div>
              <div className="skill-description">
                Entwicklung einer starken Arbeitgebermarke, die Top-Talente
                anzieht und bindet.
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-title">Digitales Recruiting</div>
              <div className="skill-description">
                Nutzung innovativer digitaler Tools und Plattformen für
                effizientes Recruiting.
              </div>
            </div>
          </div>
        </section>

        {/* Erfolge */}
        <section className="card fade-in delay-2">
          <h2 className="section-title">Meine Erfolge</h2>
          <div className="section-content">
            <p>
              In meiner Karriere konnte ich zahlreiche erfolgreiche
              Vermittlungen realisieren und Unternehmen dabei unterstützen, ihre
              strategischen Personalziele zu erreichen.
            </p>
          </div>
          <div className="grid">
            <div className="skill-item kpi">
              <div className="skill-title">200+</div>
              <div className="skill-description">
                Erfolgreich vermittelte Fach- und Führungskräfte
              </div>
            </div>
            <div className="skill-item kpi">
              <div className="skill-title">95%</div>
              <div className="skill-description">
                Erfolgsquote bei der Besetzung von Schlüsselpositionen
              </div>
            </div>
            <div className="skill-item kpi">
              <div className="skill-title">50+</div>
              <div className="skill-description">Zufriedene Unternehmen</div>
            </div>
          </div>
        </section>

        {/* Ansatz */}
        <section className="card fade-in delay-3">
          <h2 className="section-title">Mein Ansatz</h2>
          <div className="section-content">
            <p>
              Mein Ansatz basiert auf drei Säulen: Verständnis, Präzision und
              Nachhaltigkeit. Ich nehme mir Zeit, Ihr Unternehmen, Ihre Kultur
              und Ihre Anforderungen kennenzulernen, um die perfekte Passung zu
              finden.
            </p>
          </div>
          <div className="grid">
            <div className="skill-item">
              <div className="skill-title">Individuelle Beratung</div>
              <div className="skill-description">
                Maßgeschneiderte Lösungen für Ihre spezifischen Ziele.
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-title">Transparente Kommunikation</div>
              <div className="skill-description">
                Klare, ehrliche Updates während des gesamten Prozesses.
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-title">Lösungsorientiert</div>
              <div className="skill-description">
                Kreative Ansätze für komplexe Recruiting-Herausforderungen.
              </div>
            </div>
          </div>
        </section>

        {/* Warum mit mir */}
        <section className="card fade-in delay-4">
          <h2 className="section-title">Warum mit mir arbeiten?</h2>
          <div className="section-content">
            <p>
              In einer Zeit des Fachkräftemangels und des zunehmenden
              Wettbewerbs um die besten Köpfe brauchen Sie einen Partner, der
              Ihr Unternehmen versteht und die richtigen Talente findet und
              gewinnt.
            </p>
          </div>
          <div className="grid">
            <div className="skill-item">
              <div className="skill-title">Schnelle Besetzungen</div>
              <div className="skill-description">
                Effiziente Prozesse, die Time-to-Hire messbar reduzieren.
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-title">Kultur-Fit</div>
              <div className="skill-description">
                Kandidaten, die nicht nur fachlich, sondern auch menschlich
                überzeugen.
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-title">Langfristige Partnerschaft</div>
              <div className="skill-description">
                Nachhaltige Zusammenarbeit mit Blick auf Wachstum und Bindung.
              </div>
            </div>
          </div>
        </section>

        <footer>
          © {new Date().getFullYear()} Peter Beck. Alle Rechte vorbehalten.
        </footer>
      </div>

      {/* Styles */}
      <style jsx>{`
        :root {
          --primary: #4f46e5; /* indigo-600 */
          --secondary: #7c3aed; /* violet-600 */
          --accent: #8b5cf6; /* violet-500 */
          --dark: #0f172a; /* slate-900 */
          --light: #f8fafc; /* slate-50 */
          --glass: rgba(255, 255, 255, 0.08);
          --glass-border: rgba(255, 255, 255, 0.18);
        }

        .peter-wrapper {
          min-height: 100dvh;
          background: radial-gradient(1200px 600px at 10% 10%, rgba(79, 70, 229, 0.35), transparent),
            radial-gradient(1000px 500px at 90% 30%, rgba(124, 58, 237, 0.35), transparent),
            linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          color: var(--light);
          padding: 2rem 1rem;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .card {
          background: var(--glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          padding: 2rem;
          margin-bottom: 2rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
        }

        .header {
          text-align: center;
          padding-top: 0.5rem;
        }
        .profile-image {
          width: 140px;
          height: 140px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          border: 4px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 10px 30px rgba(79, 70, 229, 0.45);
          letter-spacing: 1px;
        }

        h1 {
          font-size: 2.4rem;
          letter-spacing: 0.2px;
          margin: 0 0 0.4rem;
          background: linear-gradient(90deg, #fff, #c7d2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .title {
          font-size: 1.1rem;
          color: #c7d2fe;
          margin-bottom: 1.25rem;
          font-weight: 500;
        }
        .quote {
          font-style: italic;
          color: #a5b4fc;
          max-width: 760px;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          line-height: 1.8;
          position: relative;
          padding: 0 1.25rem;
        }
        .quote::before,
        .quote::after {
          content: '"';
          font-size: 2.4rem;
          color: var(--accent);
          opacity: 0.28;
          position: absolute;
        }
        .quote::before {
          top: -0.7rem;
          left: 0;
        }
        .quote::after {
          bottom: -1.4rem;
          right: 0;
        }

        .contact-buttons {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin: 1.25rem 0 0.25rem;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.1rem;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
          border: 1px solid transparent;
          cursor: pointer;
          font-size: 0.95rem;
          letter-spacing: 0.2px;
        }
        .btn .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.25rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: white;
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
        }
        .btn-outline {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(139, 92, 246, 0.5);
          color: #e9d5ff;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(99, 102, 241, 0.35);
        }

        .section-title {
          font-size: 1.6rem;
          margin-bottom: 1rem;
          color: #ffffff;
          position: relative;
          display: inline-block;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 64px;
          height: 3px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          border-radius: 3px;
        }
        .section-content {
          margin-bottom: 1rem;
          color: #e2e8f0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.1rem;
          margin-top: 1.2rem;
        }
        .skill-item {
          background: rgba(79, 70, 229, 0.08);
          padding: 1.1rem 1rem;
          border-radius: 12px;
          border: 1px solid rgba(139, 92, 246, 0.25);
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .skill-item:hover {
          transform: translateY(-3px);
          background: rgba(79, 70, 229, 0.14);
          border-color: rgba(139, 92, 246, 0.45);
        }
        .skill-item.kpi .skill-title {
          font-size: 1.5rem;
        }
        .skill-title {
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: #ffffff;
          font-size: 1.05rem;
          letter-spacing: 0.2px;
        }
        .skill-description {
          color: #cbd5e1;
          font-size: 0.95rem;
        }

        footer {
          text-align: center;
          padding: 1.5rem 0 0.5rem;
          color: #94a3b8;
          font-size: 0.9rem;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }

        /* Responsive */
        @media (max-width: 1024px) {
          .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .card { padding: 1.25rem; }
          h1 { font-size: 2rem; }
          .title { font-size: 1rem; }
          .grid { grid-template-columns: 1fr; }
          .contact-buttons { flex-direction: column; }
          .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </main>
  );
}
