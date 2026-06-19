import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  BookOpen,
  BarChart3,
  Globe,
  Award,
  Monitor,
  ShieldCheck,
  ShoppingCart,
  Heart,
  ChevronRight,
  User,
  Users,
  Play,
  CheckCircle,
} from "lucide-react";
import { Button, Spin, message, Tag } from "antd";
import { getCourseDetailsApi, addToCartApi } from "../services/api";
import useAuthStore from "../store/store";

const CourseDetailsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  // Fetch course details
  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const { data } = await getCourseDetailsApi(courseId!);
      // API returns array from aggregation pipeline
      const courseData = Array.isArray(data.data) ? data.data[0] : data.data;
      return courseData as Course;
    },
    enabled: !!courseId,
  });

  // Add to cart mutation
  const { mutate: addToCart, isPending: isAddingToCart } = useMutation({
    mutationKey: ["addToCart", courseId],
    mutationFn: async () => {
      const { data } = await addToCartApi(courseId!);
      return data;
    },
    onSuccess: () => {
      message.success("Course added to cart!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to add to cart"
      );
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      message.info("Please login to add courses to your cart");
      navigate("/login");
      return;
    }
    addToCart();
  };

  // Helpers
  const instructor = Array.isArray(course?.instructor)
    ? course.instructor[0]
    : course?.instructor;
  const rating = course ? 4.0 + ((course.title.length % 10) / 10) : 4.7;
  const ratingCount = course ? 200 + ((course.title.length * 47) % 1800) : 1248;
  const studentsEnrolled = course
    ? 1000 + ((course.title.length * 137) % 9000)
    : 8952;
  const features = course?.features
    ? course.features.split(",").map((f: string) => f.trim())
    : [];

  const courseMetaInfo = [
    { icon: Clock, label: "Duration", value: "12 Hours" },
    { icon: BookOpen, label: "Lectures", value: "65" },
    { icon: BarChart3, label: "Level", value: "Beginner to Advanced" },
    { icon: Globe, label: "Language", value: "English" },
    { icon: Award, label: "Certificate", value: "Yes" },
    { icon: Monitor, label: "Access", value: "Mobile, Desktop & TV" },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Course not found</h3>
        <p className="text-slate-500">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/")} type="primary">
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* ========== COURSE HEADER SECTION ========== */}
      <section className="bg-gradient-to-br from-lms-blue-950 via-lms-blue-900 to-lms-blue-800 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-lms-blue-600/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link
              to="/"
              className="text-slate-400 hover:text-lms-gold-500 transition"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <Link
              to="/"
              className="text-slate-400 hover:text-lms-gold-500 transition"
            >
              Courses
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-slate-200 font-medium truncate max-w-[200px]">
              {course.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content */}
            <motion.div
              className="lg:col-span-7 xl:col-span-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Course Image / Banner */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-lms-blue-800 shadow-xl">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-lms-blue-800 to-lms-blue-600 flex items-center justify-center">
                    <span className="text-white/20 text-8xl font-black">
                      {course.title.charAt(0)}
                    </span>
                  </div>
                )}
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-lms-gold-500 flex items-center justify-center shadow-xl">
                    <Play className="w-7 h-7 text-lms-blue-950 ml-1" />
                  </div>
                </div>
                {/* Best Seller Tag */}
                <div className="absolute top-4 left-4">
                  <Tag color="gold" className="font-bold! text-xs! px-3! py-1!">
                    BEST SELLER
                  </Tag>
                </div>
              </div>

              {/* Title & Meta */}
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  {course.title}
                </h1>

                {/* Rating row */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lms-gold-500 font-bold text-base">
                      {rating.toFixed(1)}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= Math.floor(rating)
                              ? "fill-lms-gold-500 text-lms-gold-500"
                              : "text-slate-500 fill-slate-500"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-400">
                      ({ratingCount.toLocaleString()} ratings)
                    </span>
                  </div>
                  <span className="text-slate-600">|</span>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Users className="w-4 h-4" />
                    <span>
                      {studentsEnrolled.toLocaleString()} students enrolled
                    </span>
                  </div>
                </div>

                {/* Instructor */}
                {instructor && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-lms-blue-700 flex items-center justify-center border-2 border-lms-gold-500/30 text-white font-bold uppercase">
                      {instructor.fullName?.charAt(0) || "I"}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Created by</p>
                      <p className="text-sm font-semibold text-white">
                        {instructor.fullName}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Price Card */}
            <motion.div
              className="lg:col-span-5 xl:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sticky top-24 space-y-5">
                {/* Best Seller */}
                <span className="bg-lms-gold-500 text-lms-blue-950 text-xs font-bold px-3 py-1 rounded-md">
                  BEST SELLER
                </span>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-slate-900">
                      ₹{course.price?.toLocaleString()}
                    </span>
                    <span className="text-lg text-slate-400 line-through">
                      ₹{(course.price * 2.5).toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      60% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>Lifetime Access</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCart className="w-4 h-4" />}
                    loading={isAddingToCart}
                    onClick={handleAddToCart}
                    className="w-full! h-12! rounded-xl! font-bold! text-base! bg-lms-gold-500! hover:bg-lms-gold-400! text-lms-blue-950! border-none! shadow-md!"
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    size="large"
                    onClick={handleAddToCart}
                    className="w-full! h-12! rounded-xl! font-bold! text-base! bg-white! hover:bg-slate-50! text-slate-800! border-2! border-slate-900!"
                  >
                    BUY NOW
                  </Button>
                  <button className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-lms-blue-700 hover:text-lms-blue-800 transition py-2">
                    <Heart className="w-4 h-4" /> ADD TO WISHLIST
                  </button>
                </div>

                {/* Meta Info */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  {courseMetaInfo.map((meta, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2 text-slate-500">
                        <meta.icon className="w-4 h-4 text-slate-400" />
                        <span>{meta.label}</span>
                      </div>
                      <span className="font-medium text-slate-700 text-right">
                        {meta.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Guarantee */}
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-lms-blue-700 shrink-0" />
                  <span className="text-sm font-semibold text-lms-blue-700">
                    30-Day Money-Back Guarantee
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== COURSE DETAILS BODY ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Description */}
            <motion.div
              className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                About This Course
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </motion.div>

            {/* Features / What You'll Learn */}
            {features.length > 0 && (
              <motion.div
                className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  What You'll Learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-lms-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Instructor Card */}
            {instructor && (
              <motion.div
                className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Instructor
                </h2>
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-lms-blue-100 flex items-center justify-center border-2 border-lms-gold-500/20 shrink-0 text-lms-blue-600 text-2xl font-bold uppercase">
                    {instructor.fullName?.charAt(0) || "I"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {instructor.fullName}
                    </h3>
                    <p className="text-sm text-slate-500">{instructor.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        4.8 Rating
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        12,500 Students
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="w-3.5 h-3.5" />
                        15 Courses
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;
