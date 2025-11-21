export const CATEGORY_COLORS: { [key: string]: string } = {
  'Food & Groceries': '#fd5901',
  'Transportation': '#f78104',
  'Housing & Utilities': '#faab36',
  'Entertainment': '#249ea0',
  'Shopping': '#008083',
  'Other': '#9B9B9B',
  'Healthcare': '#96CEB4',
  'Education': '#FECA57'
};

export const getCategoryColor = (category: string): string => {
  // Normalize the category name for matching
  const normalizedCategory = category.trim();

  // Direct match
  if (CATEGORY_COLORS[normalizedCategory]) {
    return CATEGORY_COLORS[normalizedCategory];
  }

  // Case-insensitive partial match
  const lowerCategory = normalizedCategory.toLowerCase();

  if (lowerCategory.includes('food') || lowerCategory.includes('groceries')) {
    return CATEGORY_COLORS['Food & Groceries'];
  }
  if (lowerCategory.includes('transport') || lowerCategory.includes('gas')) {
    return CATEGORY_COLORS['Transportation'];
  }
  if (lowerCategory.includes('housing') || lowerCategory.includes('utilities')) {
    return CATEGORY_COLORS['Housing & Utilities'];
  }
  if (lowerCategory.includes('entertainment')) {
    return CATEGORY_COLORS['Entertainment'];
  }
  if (lowerCategory.includes('shopping')) {
    return CATEGORY_COLORS['Shopping'];
  }
  if (lowerCategory.includes('health')) {
    return CATEGORY_COLORS['Healthcare'];
  }
  if (lowerCategory.includes('education')) {
    return CATEGORY_COLORS['Education'];
  }

  // Default color
  return CATEGORY_COLORS['Other'];
};