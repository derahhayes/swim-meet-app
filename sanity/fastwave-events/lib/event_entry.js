const handleEventEntry = async (swimmer, event) => {
    const requiredCategory = getRequiredCategoryForEvent(event); // Define this mapping
  
    if (swimmer.performanceCategory !== requiredCategory) {
      alert(`This swimmer does not meet the required category for ${event}`);
      return;
    }
    // Proceed with event registration
  };
  