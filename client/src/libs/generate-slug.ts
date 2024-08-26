export function generateSlug(title: string) {
  if(title !== ''){
    const slug = (title
    .normalize("NFD")                       // Normalize the string to separate base characters and diacritics
    .replace(/[\u0300-\u036f]/g, "")        // Remove diacritics
    .toLowerCase()                          // Convert the title to lowercase
    .replace(/\s+/g, "-")                   // Replace spaces with dashes
    .replace(/[^\w\-]+/g, "")               // Remove non-word characters except dashes
    .replace(/\-\-+/g, "-")                 // Replace multiple consecutive dashes with a single dash
    .replace(/^\-+/, "")                    // Remove dashes from the beginning
    .replace(/\-+$/, ""))+ `-${(Math.random() + 1).toString(36).substring(7)}`;                   // Remove dashes from the end
  
  return slug ;
  } else {
    return '';
  }
  
}
