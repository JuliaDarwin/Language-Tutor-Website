"use client";


export default function PricingPlans() {
  const plans = [
    {
      name: "Basic",
      price: "$150",
      features: ["1 Lesson/Week", "Basic Support"],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$300",
      features: ["2 Lessons/week", "Priority Support"],
      highlighted: true,
    },
    {
      name: "Intensive",
      price: "$450",
      features: ["3 Lessons/week", "24/7 Support"],
      highlighted: false,
    },
  ];

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-20 justify-center mt-8 w-[70%] sm:w-[90%] 2xl:w-[80%] 2xl:text-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl shadow-lg p-8 bg-white flex flex-col justify-between transition transform hover:-translate-y-2 ${
              plan.highlighted
                ? "border-2 border-[var(--lightblue)] scale-105"
                : "border border-gray-200"
            }`}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {plan.name}
              </h3>
              <p className="text-4xl font-extrabold mb-6 text-gray-900">
                {plan.price}
                <span className="text-lg font-medium text-gray-500">
                  /month
                </span>
              </p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`w-full py-3 rounded-xl font-semibold transition ${
                plan.highlighted
                  ? "bg-[var(--blue)] text-white hover:bg-[var(--lightblue)] hover:text-black"
                  : "bg-[var(--lightblue)]/20 text-black hover:bg-[var(--blue)]/80 hover:text-white"
              }`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    
  );
}
