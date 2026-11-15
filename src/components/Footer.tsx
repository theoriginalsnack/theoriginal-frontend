import { Link } from 'react-router';
export default function Footer() {
  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Grades', href: '/#grades' },
    { label: 'Gifting', href: '/gifting' },
    { label: 'Contact', href: '/contact' },
  ];

  const productLinks = [
    { label: 'W180 Jumbo King', href: '/products' },
    { label: 'W240 Standard Jumbo', href: '/products' },
    { label: 'W320 Classic Benchmark', href: '/products' },
    { label: 'Palasa Skin Cashews', href: '/products' },
    { label: 'JH Split Cashews', href: '/products' },
    { label: 'Curated Combos', href: '/products' },
  ];

  // Brand glyphs from Bootstrap Icons (MIT), 16×16 viewBox.
  const socials = [
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      brand: 'instagram',
      d: 'M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334',
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/919100267404',
      brand: 'whatsapp',
      d: 'M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      brand: 'linkedin',
      d: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z',
    },
    {
      label: 'X (Twitter)',
      href: 'https://x.com',
      brand: 'x',
      d: 'M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z',
    },
  ];

  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        {/* Top Grid */}
        <div className="footer-grid">
          {/* Brand & Origin column */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand">
              <div className="footer-brand-mark">TO</div>
              <div className="footer-brand-text-wrap">
                <span className="footer-brand-title">The Original</span>
                <span className="footer-brand-sub">From the Cashew Capital, Palasa</span>
              </div>
            </div>
            <p className="footer-tagline">
              Hand picked from heirloom orchards in Palasa, Andhra Pradesh.
              Clean whole kernels roasted in small batches and vacuum sealed at origin.
            </p>
            <div className="footer-origin-stamp">
              13/1/76, THE ORIGINAL · Little Angels School Straight, Tilak Nagar, Kasibugga, Palasa 532222
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-nav-list">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Harvest & Calibers */}
          <div className="footer-col">
            <h4 className="footer-heading">Harvest grades</h4>
            <ul className="footer-nav-list">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Socials */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">Direct contact</h4>
            <div className="footer-contact-details">
              <a href="tel:+919100267404" className="footer-contact-item">
                <span className="footer-contact-label">Mobile</span>
                <span className="footer-contact-value">+91 9100267404</span>
              </a>

              <a href="mailto:theoriginalcashews@gmail.com" className="footer-contact-item">
                <span className="footer-contact-label">Email</span>
                <span className="footer-contact-value">theoriginalcashews@gmail.com</span>
              </a>

              <a
                href="https://maps.google.com/?q=Tilak+Nagar,+Kasibugga,+Palasa+532222"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <span className="footer-contact-label">Visit</span>
                <span className="footer-contact-value">Kasibugga, Palasa 532222</span>
              </a>
            </div>

            <div className="footer-socials">
              <h5 className="footer-subheading">Follow our harvests</h5>
              <div className="footer-social-links">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`footer-social-icon footer-social-${s.brand}`}
                    aria-label={`${s.label} (opens in a new tab)`}
                    title={s.label}
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d={s.d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Big Background Display Brand Watermark */}
        <div className="footer-watermark-wrap" aria-hidden="true">
          <span className="footer-watermark">THE ORIGINAL</span>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} The Original Cashew Co. All rights reserved.
          </p>

          <div className="footer-legal">
            <Link to="/shipping-policy">Shipping Policy</Link>
            <span>·</span>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
            <span>·</span>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>

          <div className="footer-legal">
            <a href="#home">Back to top</a>
            <span>·</span>
            <span>Palasa, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
