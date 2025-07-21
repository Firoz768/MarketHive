import { RefObject } from "react";
// It's common to use 'useCallback' for functions returned by hooks
import { useCallback } from "react"; 

export const useDropdownPosition = (
  ref: RefObject<HTMLElement | null> // More general HTMLElement for ref type
) => {
  // Use useCallback to memoize getDropdownPosition, preventing unnecessary re-renders
  // if this hook is used within a component that re-renders frequently.
  const getDropdownPosition = useCallback(() => {
    // Check if ref.current exists before proceeding
    if (!ref.current) {
      console.warn("useDropdownPosition: ref.current is null. Cannot calculate position.");
      return { top: 0, left: 0 }; // Return a default safe position
    }

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // This should ideally be dynamic or passed as a prop

    // Calculate initial left position relative to the viewport
    let left = rect.left; 
    // Calculate initial top position relative to the viewport
    const top = rect.bottom; 

    // --- Horizontal Positioning Logic ---

    // 1. Check if dropdown overflows the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      // If it overflows, try to align to the right of the reference element
      left = rect.right - dropdownWidth;

      // 2. If aligning to the right causes it to overflow the left edge
      if (left < 0) {
        // Fallback: position it from the left with some padding
        left = 16; // 16px padding from the left edge
      }
    } else if (left < 0) {
      // 3. If the initial left position is negative (e.g., ref element is off-screen to the left)
      left = 16; // Position it from the left with some padding
    }

    // Add scroll position to make it relative to the document, not just viewport
    // Only add scrollX and scrollY if you want the dropdown to stay fixed relative
    // to the document scroll position, meaning it moves with the page content
    // as the user scrolls. If you want it to be viewport-fixed, remove these.
    const finalLeft = left + window.scrollX;
    const finalTop = top + window.scrollY;

    return { top: finalTop, left: finalLeft };
  }, [ref]); // Dependency array: Recalculate if 'ref' changes

  return { getDropdownPosition };
};