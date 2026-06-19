import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, User, ShoppingCart, Check } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCartApi, getCartApi } from "../services/api";
import { message } from "antd";
import useAuthStore from "../store/store";

interface CourseCardProps {
  course: Course;
  index?: number;
}

const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  // Get cart data to check if course is already in cart
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await getCartApi();
      return data.data as Cart;
    },
    enabled: isAuthenticated,
  });

  const isInCart = cart?.courses?.some(
    (item: any) => item.course?._id === course._id || item.course === course._id
  ) ?? false;

  const { mutate: addToCart, isPending: isAddingToCart } = useMutation({
    mutationKey: ["addToCart", course._id],
    mutationFn: async () => {
      const { data } = await addToCartApi(course._id);
      return data;
    },
    onSuccess: () => {
      message.success(`"${course.title}" added to cart!`);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Failed to add to cart"
      );
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card navigation
    if (!isAuthenticated) {
      message.info("Please login to add courses to your cart");
      navigate("/login");
      return;
    }
    if (isInCart) {
      navigate("/cart");
      return;
    }
    addToCart();
  };

  // Get instructor name — could be an array (from aggregation) or object
  const instructor = Array.isArray(course.instructor)
    ? course.instructor[0]
    : course.instructor;
  const instructorName = instructor?.fullName ?? "Unknown Instructor";

  // Generate a pseudo rating from the course title hash for visual variety
  const rating = 4.0 + ((course.title.length % 10) / 10);
  const reviewCount = 200 + ((course.title.length * 47) % 1800);

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-lms-blue-600/20 transition-all duration-300 cursor-pointer group flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/course/${course._id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-slate-100">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-lms-blue-800 to-lms-blue-600 flex items-center justify-center">
            <span className="text-white/30 text-5xl font-black">
              {course.title.charAt(0)}
            </span>
          </div>
        )}
        {/* Best seller badge */}
        {index < 3 && (
          <div className="absolute top-3 left-3">
            <span className="bg-lms-gold-500 text-lms-blue-950 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
              Best Seller
            </span>
          </div>
        )}

        {/* Quick Add to Cart — hover overlay button */}
        <motion.button
          className={`absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg transition-all duration-200 ${
            isInCart
              ? "bg-emerald-500 text-white"
              : "bg-lms-gold-500 text-lms-blue-950 hover:bg-lms-gold-400"
          }`}
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.08 + 0.2 }}
          whileTap={{ scale: 0.95 }}
          title={isInCart ? "Go to Cart" : "Add to Cart"}
        >
          {isAddingToCart ? (
            <span className="flex items-center gap-1">
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding...
            </span>
          ) : isInCart ? (
            <>
              <Check className="w-3 h-3" />
              In Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-3 h-3" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-lms-blue-700 transition-colors mb-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
          <User className="w-3 h-3" />
          {instructorName}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-sm font-bold text-amber-600">
            {rating.toFixed(1)}
          </span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${
                  s <= Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200 fill-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">
            ({reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price + Cart button */}
        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xl font-extrabold text-slate-900">
              ₹{course.price?.toLocaleString()}
            </span>
            <span className="text-sm text-slate-400 line-through">
              ₹{(course.price * 2.5).toLocaleString()}
            </span>
            <span className="text-xs font-bold text-green-600 ml-auto bg-green-50 px-2 py-0.5 rounded-full">
              60% OFF
            </span>
          </div>
        </div>

        {/* Add to Cart — always-visible footer button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`mt-3 w-full flex items-center justify-center gap-2 text-sm font-bold py-2.5 rounded-xl transition-all duration-200 ${
            isInCart
              ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-100"
              : "bg-lms-blue-950 text-white hover:bg-lms-blue-800 border-2 border-lms-blue-950"
          }`}
        >
          {isAddingToCart ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding to Cart...
            </>
          ) : isInCart ? (
            <>
              <Check className="w-4 h-4" />
              Go to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
