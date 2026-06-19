import { Link } from "react-router-dom";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";

const LmsFooter = () => {
  return (
    <footer className="bg-lms-blue-950 border-t border-white/5 text-slate-300 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-lms-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-lms-gold-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-lms-gold-500 to-yellow-600 flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5 text-lms-blue-950" />
              </div>
              <div>
                <span className="text-white font-extrabold text-xl">Learn</span>
                <span className="text-lms-gold-500 font-extrabold text-xl">
                  Pro
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Empowering learners worldwide with premium courses taught by
              industry experts. Start your journey today.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaTwitter, href: "#" },
                { icon: FaGithub, href: "#" },
                { icon: FaLinkedin, href: "#" },
                { icon: FaYoutube, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-lms-gold-500 hover:text-lms-blue-950 flex items-center justify-center transition-all duration-300 text-slate-400"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "All Courses", to: "/" },
                { label: "My Cart", to: "/cart" },
                { label: "Login", to: "/login" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-lms-gold-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                "Web Development",
                "Data Science",
                "Digital Marketing",
                "Business",
                "Design",
              ].map((cat, idx) => (
                <li key={idx}>
                  <span className="text-slate-400 hover:text-lms-gold-500 transition-colors cursor-pointer">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-lms-gold-500 shrink-0 mt-0.5" />
                <span>123 Learning Street, Education City, IN 110001</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Mail className="w-4 h-4 text-lms-gold-500 shrink-0" />
                <span>support@learnpro.com</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Phone className="w-4 h-4 text-lms-gold-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LearnPro. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with{" "}
            <span className="text-lms-gold-500 text-sm">♥</span> for
            lifelong learners
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LmsFooter;
