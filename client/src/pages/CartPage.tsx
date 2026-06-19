import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight, BookOpen } from "lucide-react";
import { Button, Spin, message, Divider } from "antd";
import { getCartApi, removeFromCartApi } from "../services/api";

const CartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await getCartApi();
      return data.data as Cart;
    },
  });

  const { mutate: removeCourse, isPending: isRemoving } = useMutation({
    mutationKey: ["removeFromCart"],
    mutationFn: async (courseId: string) => {
      const { data } = await removeFromCartApi(courseId);
      return data;
    },
    onSuccess: () => {
      message.success("Course removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to remove course");
    },
  });

  const cartItems = cart?.courses ?? [];
  const isEmpty = cartItems.length === 0;

  // Calculate totals
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + (item.course?.price * 2.5 || 0),
    0
  );
  const total = cartItems.reduce(
    (sum, item) => sum + (item.course?.price || 0),
    0
  );
  const savings = originalTotal - total;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Failed to load cart</h3>
        <p className="text-slate-500">
          Please make sure you are logged in and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">
          Shopping Cart
        </h1>

        {isEmpty ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6">
              <ShoppingCart className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Your cart is empty
            </h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              Looks like you haven't added any courses to your cart yet. Keep
              shopping to find a course!
            </p>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/")}
              className="h-12! px-8! rounded-xl! font-bold! text-base! bg-lms-blue-600! hover:bg-lms-blue-700!"
            >
              Keep Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm font-semibold text-slate-500 mb-2">
                {cartItems.length} Course{cartItems.length > 1 ? "s" : ""} in Cart
              </p>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-6 transition-all hover:shadow-md group"
                >
                  {/* Course Image */}
                  <Link
                    to={`/course/${item.course?._id}`}
                    className="sm:w-48 aspect-video rounded-xl overflow-hidden bg-slate-100 shrink-0"
                  >
                    {item.course?.image ? (
                      <img
                        src={item.course.image}
                        alt={item.course?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-lms-blue-800 flex items-center justify-center">
                        <span className="text-white/30 text-4xl font-black">
                          {item.course?.title?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Course Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/course/${item.course?._id}`}
                        className="text-lg font-bold text-slate-900 hover:text-lms-blue-600 transition-colors line-clamp-2 mb-2"
                      >
                        {item.course?.title}
                      </Link>
                      <p className="text-sm text-slate-500 line-clamp-1 mb-4">
                        {item.course?.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <button
                        onClick={() => removeCourse(item.course?._id)}
                        disabled={isRemoving}
                        className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                      <div className="text-right">
                        <p className="text-xl font-extrabold text-lms-blue-900">
                          ₹{item.course?.price?.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-400 line-through">
                          ₹{(item.course?.price * 2.5).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Panel */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Total:</h3>

                <div className="space-y-4 text-slate-600">
                  <div className="flex justify-between">
                    <span>Original Price:</span>
                    <span>₹{originalTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discounts:</span>
                    <span>-₹{savings.toLocaleString()}</span>
                  </div>
                  <Divider className="my-2!" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-800">Total:</span>
                    <span className="text-3xl font-extrabold text-lms-blue-900">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  className="w-full! h-12! rounded-xl! font-bold! text-base! bg-lms-gold-500! hover:bg-lms-gold-400! text-lms-blue-950! border-none! mt-8! shadow-md!"
                  onClick={() => message.info("Checkout functionality coming soon!")}
                >
                  Checkout <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
