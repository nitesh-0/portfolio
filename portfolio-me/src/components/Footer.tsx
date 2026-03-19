import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <span className="footer__logo-bracket">&lt;</span>
            <span className="footer__logo-name">NS</span>
            <span className="footer__logo-bracket">/&gt;</span>
          </span>
          <p className="footer__tagline">Building the future, one line of code at a time.</p>
        </div>

        <div className="footer__socials">
          <a href="https://github.com/nitesh-0" target="_blank" rel="noopener noreferrer" className="footer__social">
            <SiGithub />
          </a>
          <a href="https://linkedin.com/in/nitesh-sah-87b823304/" target="_blank" rel="noopener noreferrer" className="footer__social">
            <FaLinkedin />
          </a>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Nitesh Kumar Sah. Made with <HiHeart className="footer__heart" /> and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
