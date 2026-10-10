export type Faq = {
  question: string;
  answer: string[];
};

export const faqs: Faq[] = [
  {
    question: "Do I need to be present during the service?",
    answer: [
      "No, you don’t need to be present during the service. Simply hand the car key to our technician at the vehicle before the service begins. For security and privacy reasons, our technicians are not permitted to enter your home, workplace, or any other private location.",
      "Once the service is completed, our technician will contact you and hand over your car and keys.",
    ],
  },
  {
    question: "Can I book more than one car in the same visit?",
    answer: [
      "Yes. Add as many cars, SUVs or scooters as you like to one booking and choose a different package for each. One van services them back-to-back at the same address, with a 30 minute break between vehicles.",
      "The time slots you see are calculated for the whole visit, so every slot shown is long enough for all of them. If the visit is longer than one working day, split it into two bookings.",
    ],
  },
  {
    question: "Do I have to pay the full amount online?",
    answer: [
      "For bookings above 1,500 EGP you can pay a 30%, 50% or 70% down payment online and settle the rest on the visit day by Instapay, card on our team’s POS machine, or cash. Smaller bookings are paid in full online.",
      "You can pay online by Visa or Mastercard, or by InstaPay transfer: copy our account details, transfer, and upload the receipt. Our team checks the transfer and confirms your booking.",
    ],
  },
  {
    question: "What products do you use?",
    answer: [
      "We use Fra Ber 100% Italian chemicals, shampoos, tire shine and foams.",
      "For polish we use Menzerna 100% German and for wax coats we use Sonax.",
    ],
  },
  {
    question: "Do I need to provide water or electricity?",
    answer: ["No, GLIO vans are 100% equipped with water & electricity."],
  },
  {
    question: "Can I reschedule my booking?",
    answer: [
      "Cancellations, rescheduling, or any changes to your booking must be requested at least 48 hours before your scheduled service. Requests made less than 48 hours in advance cannot be accepted, and any payment or deposit made will be non-refundable.",
      "To request a cancellation, rescheduling, or booking change, please contact our Customer Service team. They will confirm whether your request can be accommodated and provide you with the available options.",
    ],
  },
  {
    question: "Do you offer monthly packages?",
    answer: [
      "We don’t currently offer monthly packages or subscriptions. However, you’re welcome to book our service in advance as many times as you like throughout the month, with each booking treated as a separate one-time service. There’s no subscription or long-term commitment required.",
    ],
  },
];
