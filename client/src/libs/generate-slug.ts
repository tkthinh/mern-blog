export function generateSlug(title: string) {
  const slug = title
    .normalize("NFD")                       // Normalize the string to separate base characters and diacritics
    .replace(/[\u0300-\u036f]/g, "")        // Remove diacritics
    .toLowerCase()                          // Convert the title to lowercase
    .replace(/\s+/g, "-")                   // Replace spaces with dashes
    .replace(/[^\w\-]+/g, "")               // Remove non-word characters except dashes
    .replace(/\-\-+/g, "-")                 // Replace multiple consecutive dashes with a single dash
    .replace(/^\-+/, "")                    // Remove dashes from the beginning
    .replace(/\-+$/, "");                   // Remove dashes from the end
  
  return slug;
}
