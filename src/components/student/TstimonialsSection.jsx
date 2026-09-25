
import { assets, dummyTestimonial } from "../../assets/assets";

const TstimonialsSection = () => {
  return (
    <div className="pb-20 px-8 md:px-16 lg:px-24 xl:px-32">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Testimonials
        </h2>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
          Hear from our learners as they share their journeys of
          transformation, success and how our platform has made a
          difference in their lives.
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden
            shadow-sm hover:shadow-lg transition-all duration-300
            hover:-translate-y-1"
          >
            {/* User Information */}
            <div className="flex items-center gap-4 px-6 py-5 bg-gray-50">
              <img
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-sm"
                src={testimonial.image}
                alt={testimonial.name}
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="p-6">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5 w-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt=""
                  />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-600 mt-5 leading-relaxed min-h-[100px]">
                {testimonial.feedback}
              </p>
            </div>
                <a  href="#" className="text-blue-500 underline px-5 " >Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TstimonialsSection

