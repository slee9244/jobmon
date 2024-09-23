import footerLogo from "../assets/footerLogo.svg";
import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
import instagramIcon from "../assets/instagram.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-500 py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Logo and Social Media Icons */}
          <div className="flex flex-col items-start md:w-1/3 mb-8 md:mb-0">
            {/* Logo */}
            <img
              src={footerLogo}
              alt="jobmon footerLogo"
              className="w-40 h-auto" // Adjust width and let height be automatic
            />
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              {[
                {
                  href: "https://facebook.com",
                  src: facebookIcon,
                  alt: "facebook icon",
                },
                {
                  href: "https://twitter.com",
                  src: twitterIcon,
                  alt: "twitter icon",
                },
                {
                  href: "https://instagram.com",
                  src: instagramIcon,
                  alt: "instagram icon",
                },
              ].map((icon, index) => (
                <a
                  key={index}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform transform hover:scale-110"
                >
                  <img src={icon.src} alt={icon.alt} className="w-8" />
                </a>
              ))}
            </div>
          </div>

          {/* Links and Contact Information */}
          <div className="flex flex-col md:flex-row justify-between w-full md:w-2/3">
            <div className="flex flex-col mb-8 md:mb-0 md:mr-12">
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Privacy Policy",
                  "Sitemap",
                  "Contact Us",
                  "FAQ",
                ].map((text, index) => (
                  <li key={index}>
                    <p className="text-gray-400">{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hidden on small screens, visible on medium and larger screens */}
            <div className="hidden md:flex flex-col">
              <ul className="space-y-2">
                {[
                  "Job Application Tracker",
                  "SJ Lee",
                  "Email: support@example.com",
                  "Address: 1234 Job St, Job City, JOB 12345",
                ].map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          &copy; {new Date().getFullYear()} Job Application Tracker. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
