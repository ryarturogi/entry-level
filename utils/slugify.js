const slugify = (str, separator = '-', replacement = '') => {
  let slug = str.toLowerCase().trim();
  // Replace non-alphanumeric characters with the specified replacement character
  slug = slug.replace(/[^a-z0-9]/g, replacement);
  // Replace multiple consecutive occurrences of whitespace and separator characters with a single separator
  slug = slug.replace(new RegExp(`[\\s${separator}]+`, 'g'), separator);
  // Remove leading and trailing separators
  slug = slug.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
  return slug;
};

export default slugify;
