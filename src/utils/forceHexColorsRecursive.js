const forceHexColorsRecursive = (el) => {
  if (!el) return;

  const elements = el.querySelectorAll("*");
  elements.forEach((child) => {
    const styles = getComputedStyle(child);

    // FIX 1: Background Color Logic
    const bgColor = styles.backgroundColor;
    if (bgColor && /oklch/i.test(bgColor)) {
      if (child.tagName === "MARK") {
        // Specifically preserve your highlight colors
        child.style.backgroundColor = child.classList.contains("bg-purple-200") 
          ? "#E1DEFD" 
          : "#FCE4EC";
      } else {
        child.style.backgroundColor = "#ffffff";
      }
    }

    // FIX 2: Text and Border Logic
    const textColor = styles.color;
    if (textColor && /oklch/i.test(textColor)) {
      child.style.color = child.tagName === "MARK" ? "inherit" : "#1e293b";
    }

    if (/oklch/i.test(styles.boxShadow)) {
      child.style.boxShadow = "none";
    }
    
    // Clean up borders
    if (/oklch/i.test(styles.borderTopColor)) child.style.borderColor = "#e2e8f0";
  });
};

export default forceHexColorsRecursive