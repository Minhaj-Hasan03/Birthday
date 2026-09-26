import { useState } from "react";
import axios from 'axios'

function BirthdayMessage() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit =async (e) => {
     e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/birthday-message/save`,
        {
          message: message.trim(),
        }
      );

      if (response.data.success) {
        console.log("Message saved successfully");

        setSent(true);
      }
    } catch (error) {
      console.error(
        "Error saving message:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <section
      className="
        birthday-message
        relative
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#edf1e8]
        px-8
        py-20
      "
    >
      {/* 
        FORM SECTION
        This will disappear after clicking Send
      */}
      <div
        className={`
          birthday-message-content
          flex
          w-full
          max-w-[1400px]
          items-center
          justify-center
          gap-8
          transition-none
          max-[1000px]:flex-col
        `}
      >
        {/* LEFT IMAGE */}
        <div
          className="
            birthday-message-left
            h-[65vh]
            w-[28%]
            overflow-hidden
            max-[1000px]:h-[35vh]
            max-[1000px]:w-full
          "
        >
          <img
            src="/images/rara1.jpg"
            alt="Birthday memory"
            className="
              h-full
              w-full
              object-cover
            "
          />
        </div>

        {/* MIDDLE MESSAGE AREA */}
        <div
          className="
            birthday-message-middle
            flex
            w-[44%]
            flex-col
            items-center
            justify-center
            max-[1000px]:w-full
          "
        >
          <form
            onSubmit={handleSubmit}
            className="
              flex
              w-full
              max-w-[650px]
              flex-col
              items-center
            "
          >
            <h2
              className="
                mb-8
                text-center
                text-[3rem]
                font-medium
                leading-[1.1]
                tracking-[-0.05rem]
                text-[#101010]
                max-[1000px]:text-[2rem]
              "
            >
              Write something for me
            </h2>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your birthday message here..."
              className="
                h-[250px]
                w-full
                resize-none
                border
                border-[#101010]
                bg-transparent
                p-6
                text-[1.2rem]
                text-[#101010]
                outline-none
                placeholder:text-[#101010]/50
                max-[1000px]:h-[200px]
              "
            />

            {/* SEND BUTTON UNDER TEXTAREA */}
            <button
              type="submit"
              className="
                mt-6
                border
                border-[#101010]
                bg-[#101010]
                px-10
                py-4
                text-lg
                text-[#edf1e8]
                transition-all
                duration-300
                hover:bg-transparent
                hover:text-[#101010]
              "
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="
            birthday-message-right
            h-[65vh]
            w-[28%]
            overflow-hidden
            max-[1000px]:h-[35vh]
            max-[1000px]:w-full
          "
        >
          <img
            src="/images/rara10.jpg"
            alt="Birthday memory"
            className="
              h-full
              w-full
              object-cover
            "
          />
        </div>
      </div>

      {/* 
        SUCCESS MESSAGE
        Initially hidden.
      */}
      <div
        className="
          birthday-message-success
          pointer-events-none
          absolute
          inset-0
          flex
          items-center
          justify-center
          px-8
          text-center
        "
      >
        <h2
          className="
    translate-y-10
    scale-90
    text-[5rem]
    font-medium
    leading-none
    tracking-[-0.08rem]
    text-[#101010]
    opacity-0
    max-[1000px]:text-[3rem]
  "
        >
          Happy Birthday Again!
        </h2>
      </div>
    </section>
  );
}

export default BirthdayMessage;
