import Container from "./Container";

import logo from "../assets/images/logo-white2.png";
import discordIcon from "../assets/images/discord.svg";

const Footer = () => {
  return (
    <div className="bg-primary">
      <Container>
        <footer className="footer bg-primary text-[1rem] text-dimGray px-10 sm:px-2 py-24">
          <aside>
            <img src={logo} className="w-[10rem]" />
            <p>&copy;Copyright 2024 Vsub</p>
          </aside>
          <nav className="flex flex-col gap-4">
            <a className="link link-hover">Legal</a>
            <a className="link link-hover">Terms of Use</a>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Disclaimer</a>
          </nav>
          <nav className="flex flex-col gap-4">
            <a className="link link-hover">Product</a>
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">Affiliate</a>
            <a className="link link-hover">Features Request</a>
          </nav>
          <nav className="flex flex-col gap-4">
            <a className="link link-hover">Company</a>
            <a className="link link-hover">Chat Support</a>
            <a className="link link-hover">contact@vsub.io</a>
            <a className="link link-hover flex flex-row items-center gap-2">
              <span>Community</span>
              <img src={discordIcon} />
            </a>
          </nav>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
