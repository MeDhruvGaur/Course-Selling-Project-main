import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Play,
} from "lucide-react";
import { Input, Spin } from "antd";
import { useState } from "react";
import { getAllCoursesApi } from "../services/api";
import { CourseCard } from "../components";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await getAllCoursesApi();
      return data.data as Course[];
    },
  });

  const filteredCourses =
    courses?.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  const stats = [
    {
      value: "50,000+",
      label: "Students Enrolled",
      icon: <Users className="w-5 h-5 text-lms-blue-600" />,
    },
    {
      value: "500+",
      label: "Expert Courses",
      icon: <BookOpen className="w-5 h-5 text-lms-gold-500" />,
    },
    {
      value: "4.8★",
      label: "Average Rating",
      icon: <Award className="w-5 h-5 text-amber-500" />,
    },
    {
      value: "95%",
      label: "Completion Rate",
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lms-blue-950 via-lms-blue-900 to-lms-blue-800 py-20 md:py-28 px-6">
        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-lms-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] rounded-full bg-lms-gold-500/5 blur-[100px] pointer-events-none" />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 right-[15%] w-16 h-16 rounded-2xl bg-lms-gold-500/10 border border-lms-gold-500/20"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-[10%] w-12 h-12 rounded-full bg-lms-blue-600/20 border border-lms-blue-600/30"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Text */}
            <motion.div
              className="space-y-7 text-center lg:text-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-lms-gold-400 text-sm font-medium">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>New courses added every week</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Unlock Your{" "}
                <span className="bg-gradient-to-r from-lms-gold-500 via-lms-gold-400 to-yellow-300 bg-clip-text text-transparent">
                  Potential
                </span>
                <br />
                Learn Without Limits
              </h1>

              <p className="text-slate-300 text-lg max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
                Access premium courses taught by industry experts. Build
                real-world skills and advance your career from anywhere.
              </p>

              {/* Hero Search */}
              <div className="flex items-center gap-3 max-w-lg mx-auto lg:mx-0">
                <Input
                  size="large"
                  placeholder="What do you want to learn?"
                  prefix={
                    <Search className="w-5 h-5 text-slate-400 mr-1" />
                  }
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 h-13! rounded-xl! bg-white/10! backdrop-blur-md! border-white/15! hover:border-lms-gold-500/50! focus:border-lms-gold-500! text-white! placeholder-slate-400! text-base!"
                />
                <button className="h-13 px-6 rounded-xl bg-lms-gold-500 hover:bg-lms-gold-400 text-lms-blue-950 font-bold text-sm transition-all shadow-lg shadow-lms-gold-500/20 shrink-0 flex items-center gap-2">
                  Explore <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-4 justify-center lg:justify-start pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-lms-blue-600 to-indigo-500 border-2 border-lms-blue-950 flex items-center justify-center text-white text-[10px] font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-400">
                  <span className="text-white font-semibold">50,000+</span>{" "}
                  students already learning
                </p>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-lms-gold-500/20 to-lms-blue-600/20 rounded-3xl blur-2xl transform rotate-3 scale-95" />

                {/* Feature card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 space-y-5">
                  {/* Top */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lms-gold-500 to-yellow-600 flex items-center justify-center shadow-lg">
                        <GraduationCap className="w-6 h-6 text-lms-blue-950" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">Learning Path</h3>
                        <p className="text-xs text-slate-400">
                          Full Stack Developer
                        </p>
                      </div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-semibold">
                      Active
                    </span>
                  </div>

                  {/* Progress items */}
                  {[
                    {
                      title: "HTML & CSS Mastery",
                      progress: 100,
                      color: "bg-emerald-400",
                    },
                    {
                      title: "JavaScript Fundamentals",
                      progress: 78,
                      color: "bg-lms-gold-500",
                    },
                    {
                      title: "React Development",
                      progress: 45,
                      color: "bg-lms-blue-600",
                    },
                    {
                      title: "Node.js & Express",
                      progress: 12,
                      color: "bg-indigo-500",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-200 font-medium">
                          {item.title}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {item.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          className={`${item.color} h-full rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + idx * 0.15 }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Bottom stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">24</p>
                      <p className="text-[11px] text-slate-400">Courses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-lms-gold-500">
                        156h
                      </p>
                      <p className="text-[11px] text-slate-400">Learning</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-emerald-400">12</p>
                      <p className="text-[11px] text-slate-400">Certificates</p>
                    </div>
                  </div>
                </div>

                {/* Floating card */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-10 h-10 rounded-full bg-lms-gold-500 flex items-center justify-center">
                    <Play className="w-4 h-4 text-lms-blue-950 ml-0.5" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">1,200+</p>
                    <p className="text-slate-400 text-[11px]">Video Lessons</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="bg-white py-8 px-6 shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-xl"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COURSES GRID ========== */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-lms-blue-700 uppercase tracking-widest text-xs font-bold">
            Featured Courses
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Explore Our Top Courses
          </h3>
          <p className="text-slate-500 max-w-2xl mx-auto font-light">
            Choose from hundreds of courses created by industry professionals
            and start your learning journey today.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-400" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">
              Unable to load courses
            </h4>
            <p className="text-slate-500 text-sm">
              Please make sure the backend server is running and try again.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-lms-blue-800/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-lms-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">
              No courses found
            </h4>
            <p className="text-slate-500 text-sm">
              {searchTerm
                ? `No results for "${searchTerm}". Try a different search.`
                : "No courses available yet. Check back soon!"}
            </p>
          </div>
        )}

        {/* Course Grid */}
        {!isLoading && filteredCourses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course._id} course={course} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="bg-gradient-to-br from-lms-blue-950 via-lms-blue-900 to-lms-blue-800 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Start{" "}
              <span className="text-lms-gold-500">Learning?</span>
            </h2>
            <p className="text-slate-300 text-lg mt-4 font-light max-w-2xl mx-auto">
              Join thousands of students already building their future with
              LearnPro. Get lifetime access to premium courses at affordable
              prices.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Link to="/">
                <button className="h-12 px-8 rounded-xl bg-lms-gold-500 hover:bg-lms-gold-400 text-lms-blue-950 font-bold text-base transition-all shadow-lg shadow-lms-gold-500/20 flex items-center gap-2">
                  Browse Courses <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/login">
                <button className="h-12 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all">
                  Sign In
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
