const slugify = (str, { separator = '-', replacementCharacter = '' } = {}) => {
  // Convert the string to lowercase and remove leading/trailing whitespace
  let slug = str.toLowerCase().trim();

  // Replace non-alphanumeric characters with the specified replacement character
  slug = slug.replace(/[^a-z0-9]+/g, replacementCharacter);

  // Replace multiple consecutive occurrences of whitespace and separator characters with a single separator
  const pattern = new RegExp(`[${separator}\\s]+`, 'g');
  slug = slug.replace(pattern, separator);

  // Remove leading and trailing separators
  slug = slug.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

  return slug;
};

export default slugify;
