export function getFormattedDate(deliveryDay) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  let deliveryDate = new Date();
  let daysToAdd = deliveryDay; // We want delivery 7 workdays from today

  // Loop until we've added 7 workdays
  while (daysToAdd > 0) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);

    // Check if it's a weekday (not Saturday or Sunday)
    if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
      daysToAdd--; // If it's a weekday, decrement the daysToAdd counter
    }
  }

  return deliveryDate.toLocaleDateString("en-US", options);
}
